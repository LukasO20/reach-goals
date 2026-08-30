import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'
import { useSwitchMonths } from '../../../provider/ui/switch-months-provider'

import MonthDays from './components/month-days.jsx'

import { weekNames } from '../../../utils/reference.js'
import { cx } from '../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').MonthDaysPickerProps} Props */

/**
 * @param {Props} props
 */
const MonthDaysPicker = ({ data }) => {
    const {
        data: { visibility },
    } = useSwitchLayout()
    const { days, activeDate } = useSwitchMonths()

    const models = data || { goal: [], assignment: [] }
    const modelsCalendar = Object.entries(models || {}).flatMap(
        ([key, value]) =>
            Array.isArray(value)
                ? value.map((model) => ({ ...model, type: key }))
                : []
    )

    const typeLayout = visibility.layoutCalendar

    return (
        <div className={`calendar-container ${typeLayout}`}>
            <div className='head'>
                {weekNames.map((week) => {
                    return (
                        <div key={week} className='day-name'>
                            {week}
                        </div>
                    )
                })}
            </div>
            <div className='body'>
                {
                    //Fill with empty day to align first day of month
                    Array(days[0].getDay())
                        .fill(null)
                        .map((_, i) => (
                            <div key={`empty-${i}`} className='day empty'></div>
                        ))
                }
                {
                    //Render actual days
                    days.map((day) => {
                        const isToday =
                            (activeDate.toDateString() &&
                                new Date().toDateString()) ===
                            day.toDateString()
                        const isApproximateDay =
                            activeDate.getMonth() !== day.getMonth()
                        const todayDate = day.getDate()

                        return (
                            <MonthDays
                                key={day.toISOString()}
                                day={day}
                                isToday={isToday}
                                isApproximateDay={isApproximateDay}
                                todayDate={todayDate}
                                modelsCalendar={modelsCalendar}
                                visibility={visibility}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MonthDaysPicker
