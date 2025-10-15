import { useState } from 'react'

const MonthDaysPicker = (props) => {
    const [year] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth())

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ]

    const weekNames = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]

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

    return (
        days.map(day => {
            const weekdate = weekNames[day.getDay()]
            const daydate = day.getDate()

            return (
                <div>
                </div>
            )
        })
    )
}

export default MonthDaysPicker