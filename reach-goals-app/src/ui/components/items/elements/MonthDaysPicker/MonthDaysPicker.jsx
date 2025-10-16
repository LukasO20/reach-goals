import { useState } from 'react'
import { weekNames } from '../../../../../utils/reference.js'

import './MonthDaysPicker.scss'

const MonthDaysPicker = (props) => {
    const [year] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth())

    const getDaysInMonth = (year, month) => {
        const date = new Date(year, month, 1)
        const days = []
        while (date.getMonth() === month) {
            days.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }
        return days
    }

    const days = getDaysInMonth(year, month)
    const models = props.model || { goal: [], assignment: [] }

    const modelsCalendar = Object.entries(models)
        .map(([key, value]) =>
            value.core.map(item => ({ ...item, type: key }))
        )
        .flat()

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
                    days.map(day => (
                        <div key={day.toISOString()} day={day.getDate()} className={`day ${new Date().toDateString() === day.toDateString() ? 'today' : ''}`}>
                            <span className='title'>
                                {day.getDate()}
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MonthDaysPicker