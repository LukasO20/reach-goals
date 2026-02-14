import { useManageModel } from '../../../../../provider/ManageModelProvider.jsx'
import { useVisibility } from '../../../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import { weekNames } from '../../../../../utils/reference.js'
import { switchLayoutMap, visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'

import CardMini from '../CardMini/CardMini.jsx'

import PropTypes from 'prop-types'

import moment from 'moment'
import './MonthDaysPicker.scss'

const MonthDaysPicker = ({ data }) => {
    const { setModel } = useManageModel()
    const { toggleVisibility } = useVisibility()
    const { layout, updateSwitchLayout } = useSwitchLayout()
    const year = new Date().getFullYear()
    const month = new Date().getMonth()

    const getDaysInMonth = (year, month) => {
        const date = new Date(year, month, 1)
        const days = []

        //Current month days
        while (date.getMonth() === month) {
            days.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }

        const firstDayOfMonth = days[0].getDay()
        let prevDate = new Date(days[0])
        for (let i = 1; i <= firstDayOfMonth; i++) {
            prevDate.setDate(prevDate.getDate() - 1)
            days.unshift(new Date(prevDate))
        }

        const lastDayOfMonth = days[days.length - 1].getDay()
        let nextDate = new Date(days[days.length - 1])
        for (let i = 1; i < 7 - lastDayOfMonth; i++) {
            nextDate.setDate(nextDate.getDate() + 1)
            days.push(new Date(nextDate))
        }

        return days
    }

    const activityClick = (model, e) => {
        e.stopPropagation()
        const dataSwitchLayout = switchLayoutMap({ area: 'modal', state: { modalName: 'modal-right', layoutName: 'details' } })

        setModel(prev => ({ ...prev, mainModelID: model.id, formModel: model, typeModel: model.type }))
        updateSwitchLayout(dataSwitchLayout)
        toggleVisibility(visibilityMap(['modal-right', model.type]))
    }

    const days = getDaysInMonth(year, month)
    const models = data || { goal: [], assignment: [] }
    const modelsCalendar = Object.entries(models || {}).flatMap(([key, value]) =>
        Array.isArray(value) ?
            value.map(model => ({ ...model, type: key })) : []
    )

    const clickEvents = {
        card: activityClick,
    }

    const typeLayout = layout.page.layoutName

    return (
        <div className={`calendar ${typeLayout}`}>
            <div className='header'>
                {
                    weekNames.map(week => {
                        return (<div key={week} className='day-name'>{week}</div>)
                    })
                }
            </div>
            <div className='body'>
                {
                    //Fill with empty day to align first day of month
                    Array(days[0].getDay()).fill(null).map((_, i) => (
                        <div key={`empty-${i}`} className='day empty'></div>
                    ))
                }
                {
                    //Render actual days
                    days.map(day => {
                        const isToday = new Date().toDateString() === day.toDateString()
                        const isApproximateDay = new Date().getMonth() !== day.getMonth()
                        const todayDate = day.getDate()
                        const modelsOnDay = modelsCalendar.filter(model => {
                            const formatModelDate = moment(model.start).format('DD/MM/YYYY')
                            const formatDayDate = moment(day).format('DD/MM/YYYY')
                            return (formatModelDate === formatDayDate)
                        })

                        const assignmentsOnDay = modelsOnDay.filter(m => m.type === 'assignment')
                        const goalsOnDay = modelsOnDay.filter(m => m.type === 'goal')

                        const displayModesProps = {
                            type: ['card-mini'],
                            actions: []
                        }

                        return (
                            <div key={day.toISOString()} day={todayDate} className={`day ${isToday ? 'today' : isApproximateDay ? 'approximate' : ''}`}>
                                <span className='title'>{todayDate}</span>
                                {
                                    assignmentsOnDay.length > 0 && (
                                        <CardMini
                                            model={assignmentsOnDay}
                                            type='assignment'
                                            display={displayModesProps}
                                            clickFunction={clickEvents} />
                                    )}
                                {
                                    goalsOnDay.length > 0 && (
                                        <CardMini
                                            model={goalsOnDay}
                                            type='goal'
                                            display={displayModesProps}
                                            clickFunction={clickEvents} />
                                    )}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

MonthDaysPicker.propTypes = {
    data: PropTypes.shape({
        goal: PropTypes.array,
        assignment: PropTypes.array
    }),
}

export default MonthDaysPicker