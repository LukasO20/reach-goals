import { useManageModel } from '../../../../provider/model/manage-model-provider'
import { useVisibility } from '../../../../provider/ui/visibility-provider'
import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider'
import { useSwitchMonths } from '../../../../provider/ui/switch-months-provider'

import { weekNames } from '../../../../utils/reference.js'
import { switchLayoutMap, visibilityMap } from '../../../../utils/mapping/mappingUtils.js'

import CardMini from '../card-mini'
import MonthsDaysTitle from './components/month-days-title.jsx'

import moment from 'moment'

import './style.scss'

/** @typedef {import('./types.js').MonthDaysPickerProps} Props */

/**
 * @param {Props} props
 */
const MonthDaysPicker = ({ data }) => {
    const { setModel } = useManageModel()
    const { toggleVisibility } = useVisibility()
    const { data: { visibility }, setSwitchLayout } = useSwitchLayout()
    const { days, activeDate } = useSwitchMonths()

    const activityClick = (model, e) => {
        e.stopPropagation()
        const dataSwitchLayout = switchLayoutMap({ area: 'modal', layout: { modalName: 'modal-right', layoutName: 'details' } })

        setModel(prev => ({ ...prev, mainModelID: model.id, activeModel: model, typeModel: model.type }))
        setSwitchLayout(dataSwitchLayout)
        toggleVisibility(visibilityMap(['modal-right', model.type]))
    }

    const models = data || { goal: [], assignment: [] }
    const modelsCalendar = Object.entries(models || {}).flatMap(([key, value]) =>
        Array.isArray(value) ?
            value.map(model => ({ ...model, type: key })) : []
    )

    const clickEvents = {
        card: activityClick,
    }

    const typeLayout = visibility.layoutCalendar
    const isShowAssignment = typeLayout === 'assignment' || typeLayout === 'all-activities'
    const isShowGoal = typeLayout === 'goal' || typeLayout === 'all-activities'

    return (
        <div className={`calendar ${typeLayout}`}>
            <div className='head'>
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
                        const isToday = (activeDate.toDateString() && new Date().toDateString()) === day.toDateString()
                        const isApproximateDay = activeDate.getMonth() !== day.getMonth()
                        const todayDate = day.getDate()
                        const modelsOnDay = modelsCalendar.filter(model => {
                            const formatModelDate = moment(model.start).format('DD/MM/YYYY')
                            const formatDayDate = moment(day).format('DD/MM/YYYY')
                            return (formatModelDate === formatDayDate)
                        })

                        const assignmentsOnDay = modelsOnDay.filter(m => m.type === 'assignment')
                        const goalsOnDay = modelsOnDay.filter(m => m.type === 'goal')

                        const calendarPropsReference = {
                            display: {
                                type: ['card-mini'],
                                actions: []
                            },
                            status: visibility.status,
                            clickFunction: clickEvents
                        }

                        return (
                            <div key={day.toISOString()} className={`day ${isToday ? 'today' : isApproximateDay ? 'approximate' : ''}`}>
                                <MonthsDaysTitle title={todayDate} startDate={day.toISOString()} />
                                {
                                    assignmentsOnDay.length > 0 && isShowAssignment && (
                                        <CardMini
                                            model={assignmentsOnDay}
                                            type='assignment'
                                            {...calendarPropsReference}
                                        />
                                    )}
                                {
                                    goalsOnDay.length > 0 && isShowGoal && (
                                        <CardMini
                                            model={goalsOnDay}
                                            type='goal'
                                            {...calendarPropsReference}
                                        />
                                    )}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MonthDaysPicker