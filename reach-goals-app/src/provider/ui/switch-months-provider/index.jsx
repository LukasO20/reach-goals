import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import moment from 'moment'

/** @import * as React from 'react' */

/** @typedef {import('./types.js').SwitchMonthsContext} SwitchMonthsContext */

/** @type {React.Context<SwitchMonthsContext>} */
const SwitchMonthsContext = createContext()

export const SwitchMonthsProvider = ({ children }) => {
    const [activeDate, setActiveDate] = useState(new Date())

    const year = activeDate.getFullYear()
    const month = activeDate.getMonth()

    /** @type {import('./types.js').GetDaysInMonthProps} */
    const getDaysInMonth = useCallback(({ year, month }) => {
        const days = []

        const activeDate = new Date(year, month, 1)

        // Current month
        while (activeDate.getMonth() === month) {
            days.push(new Date(activeDate))
            activeDate.setDate(activeDate.getDate() + 1)
        }

        // Previous month filler
        const firstWeekDay = days[0].getDay()

        const prevDate = new Date(days[0])

        for (let i = firstWeekDay; i > 0; i--) {
            prevDate.setDate(prevDate.getDate() - 1)
            days.unshift(new Date(prevDate))
        }

        // Next month filler
        const lastWeekDay = days[days.length - 1].getDay()

        const nextDate = new Date(days[days.length - 1])

        for (let i = lastWeekDay; i < 6; i++) {
            nextDate.setDate(nextDate.getDate() + 1)
            days.push(new Date(nextDate))
        }

        return days
    }, [])

    const days = useMemo(() => {
        return getDaysInMonth({ year, month })
    }, [year, month, getDaysInMonth])

    const nextMonth = useCallback(() => {
        setActiveDate((prev) => {
            return new Date(
                prev.getFullYear(),
                prev.getMonth() + 1,
            )
        })
    }, [])

    const previousMonth = useCallback(() => {
        setActiveDate((prev) => {
            return new Date(
                prev.getFullYear(),
                prev.getMonth() - 1,
            )
        })
    }, [])

    const value = useMemo(() => ({
        days, 
        monthLabel: moment(activeDate).format('MMMM YYYY'), 
        activeDate,
        nextMonth, 
        previousMonth
    }), [days, activeDate, nextMonth, previousMonth])

    return (
        <SwitchMonthsContext.Provider value={value}>
            {children}
        </SwitchMonthsContext.Provider>
    )
}

export const useSwitchMonths = () => useContext(SwitchMonthsContext)