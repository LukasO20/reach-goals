import { useEffect, useRef, useState } from 'react'

import MonthsDaysTitle from './month-days-title.jsx'
import Assignment from '../../../models/assignment'
import Goal from '../../../models/goal'
import Dots from '../../dots'

import moment from 'moment'
import { cx } from '../../../../utils/utils.js'

/** @typedef {import('../types.js').MonthDaysProps} Props */

/**
 * @param {Props} props
 */
const MonthDays = ({
    day,
    isToday,
    isApproximateDay,
    todayDate,
    modelsCalendar,
    visibility,
    ...rest
}) => {
    const containerRef = useRef(null)
    const [hasOverflowingCard, setHasOverflowingCard] = useState(false)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const checkOverflow = () => {
            const allCards = container.querySelectorAll('.card-mini')
            allCards.forEach((card) => card.classList.remove('has-overflow'))

            const containerRect = container.getBoundingClientRect()
            let overflowed = false

            allCards.forEach((card) => {
                if (overflowed) {
                    card.classList.add('has-overflow')
                    return
                }

                const cardRect = card.getBoundingClientRect()
                const isThisCardOverflowing =
                    cardRect.bottom > containerRect.bottom

                if (isThisCardOverflowing) {
                    card.classList.add('has-overflow')
                    overflowed = true
                }
            })

            setHasOverflowingCard(overflowed)
        }

        return checkOverflow()
    }, [containerRef])

    const type = visibility.layoutCalendar

    const modelsOnDay = modelsCalendar.filter((model) => {
        const formatModelDate = moment(model.start).format('DD/MM/YYYY')
        const formatDayDate = moment(day).format('DD/MM/YYYY')
        return formatModelDate === formatDayDate
    })

    const assignmentsOnDay = modelsOnDay.filter((m) => m.type === 'assignment')
    const goalsOnDay = modelsOnDay.filter((m) => m.type === 'goal')

    const calendarPropsReference = {
        display: {
            type: ['card-mini'],
            actions: [],
        },
        detailsModel: true,
        status: visibility.status,
        showRightContent: false,
    }

    const monthsDaysTitlePropsReference = {
        title: todayDate,
        startDate: day.toISOString(),
        data: {
            goal: goalsOnDay,
            assignment: assignmentsOnDay,
        },
        hasOverflowingCard,
    }

    const dayClass = cx(
        `day
        ${isToday && 'today'}
        ${isApproximateDay && 'approximate'}
        ${hasOverflowingCard && 'overflowing'}
        `
    )

    const isShowAssignment = type === 'assignment' || type === 'all-activities'
    const isShowGoal = type === 'goal' || type === 'all-activities'

    return (
        <div className={dayClass} {...rest}>
            <MonthsDaysTitle {...monthsDaysTitlePropsReference} />
            <div className='body' ref={containerRef}>
                {isShowAssignment && (
                    <Assignment
                        source={assignmentsOnDay}
                        {...calendarPropsReference}
                    />
                )}
                {isShowGoal && (
                    <Goal source={goalsOnDay} {...calendarPropsReference} />
                )}
            </div>
        </div>
    )
}

export default MonthDays
