import { useEffect } from 'react'
import { useTitle } from '../../../../provider/TitleProvider.jsx'

import MonthDaysPicker from '../../items/elements/MonthDaysPicker/MonthDaysPicker.jsx'

const Calendar = () => {
    const { update } = useTitle()

    useEffect(() => {
        update({ header: 'Manage your goals and assingments' })
    }, [])

    return (
        <div className="container-calendar">
            <MonthDaysPicker />
        </div> 
    )
}

export default Calendar