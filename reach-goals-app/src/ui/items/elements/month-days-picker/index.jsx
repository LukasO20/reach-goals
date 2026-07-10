import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider'
import { useSwitchMonths } from '../../../../provider/ui/switch-months-provider'

import { weekNames } from '../../../../utils/reference.js'

import { cx } from '../../../../utils/utils.js'

import MonthsDaysTitle from './components/month-days-title.jsx'
import Assignment from '../../models/assignment'
import Goal from '../../models/goal'

import moment from 'moment'

import './style.scss'

/** @typedef {import('./types.js').MonthDaysPickerProps} Props */

/**
 * @param {Props} props
 */
const MonthDaysPicker = ({ data }) => {
    const { data: { visibility } } = useSwitchLayout()
    const { days, activeDate } = useSwitchMonths()

    const models = data || { goal: [], assignment: [] }
    const modelsCalendar = Object.entries(models || {}).flatMap(([key, value]) =>
        Array.isArray(value) ?
            value.map(model => ({ ...model, type: key })) : []
    )

    const typeLayout = visibility.layoutCalendar
    const isShowAssignment = typeLayout === 'assignment' || typeLayout === 'all-activities'
    const isShowGoal = typeLayout === 'goal' || typeLayout === 'all-activities'

    return (
        <div className={`calendar-container ${typeLayout}`}>
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
                            detailsModel: true,
                            status: visibility.status,
                        }

                        const monthsDaysTitlePropsReference = {
                            title: todayDate,
                            startDate: day.toISOString(),
                            data: { goal: goalsOnDay, assignment: assignmentsOnDay }
                        }

                        const dayClass = cx(
                            `day
                            ${isToday ? 'today' : isApproximateDay ? 'approximate' : ''}`
                        )

                        return (
                            <div
                                key={day.toISOString()}
                                className={dayClass}
                            >
                                <MonthsDaysTitle {...monthsDaysTitlePropsReference} />
                                {
                                    isShowAssignment && <Assignment source={assignmentsOnDay} {...calendarPropsReference} />
                                }
                                {
                                    isShowGoal && <Goal source={goalsOnDay} {...calendarPropsReference} />
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