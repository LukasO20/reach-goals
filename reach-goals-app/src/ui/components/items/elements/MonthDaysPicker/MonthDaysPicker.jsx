import { useContext } from 'react'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import { weekNames } from '../../../../../utils/reference.js'
import { formatDate } from '../../../../../utils/utils.js'
import { switchLayoutMap, targetMap } from '../../../../../utils/mapping/mappingUtils.js'

import CardItem from '../CardItem/CardItem.jsx'

import './MonthDaysPicker.scss'

import moment from 'moment'

const MonthDaysPicker = (props) => {
    const { setModel } = useContext(ManageModelContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    const { layoutComponent, switchLayoutComponent } = useSwitchLayout()
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
        for (let i = 1; i <= firstDayOfMonth; i++) {
            const prevDate = new Date(days[0])
            prevDate.setDate(prevDate.getDate() - i)
            days.unshift(prevDate)
        }

        const lastDayOfMonth = days[days.length - 1].getDay()
        for (let i = 1; i < 7 - lastDayOfMonth; i++) {
            const nextDate = new Date(days[days.length - 1])
            nextDate.setDate(nextDate.getDate() + i)
            days.push(nextDate)
        }

        return days
    }

    const activityClick = (model, e) => {
        e.stopPropagation()

        setModel(prev => ({ ...prev, mainModelID: model.id, formModel: model, typeModel: model.type }))
        switchLayoutComponent(switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'right' }))
        toggleVisibility(targetMap(['panel-right', model.type]))
    }

    const days = getDaysInMonth(year, month)
    const models = props.model || { goal: [], assignment: [] }

    const modelsCalendar = Object.entries(models || {}).flatMap(([key, value]) =>
        Array.isArray(value) ?
            value.map(model => (
                {
                    ...model,
                    type: key,
                    start: formatDate(model).start,
                    end: formatDate(model).end,
                }
            )) : []
    )

    const clickEvents = {
        card: activityClick,
    }

    return (
        <div className='calendar'>
            <div className='header'>
                {
                    weekNames.map(week => {
                        return (
                            <div key={week} className='day-name'>{week}</div>
                        )
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

                        return (
                            <div key={day.toISOString()} day={todayDate} className={`day ${isToday ? 'today' : isApproximateDay  ? 'approximate' : ''}`}>
                                <span className='title'>{todayDate}</span>
                                {
                                    <CardItem
                                        model={modelsCalendar.filter(model =>
                                            model.start === moment(day).format('DD/MM/YYYY')
                                        )}
                                        type={modelsCalendar.filter(model =>
                                            model.start === moment(day).format('DD/MM/YYYY')
                                        ).map(model => model.type)}
                                        display={{ type: 'mini-card' }}
                                        clickFunction={clickEvents} />
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MonthDaysPicker