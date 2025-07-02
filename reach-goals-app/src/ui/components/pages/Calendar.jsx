import React, { useContext } from 'react'
import { TitleContext } from '../../../provider/TitleProvider.jsx'

const Calendar = () => {
    const { update } = useContext(TitleContext)

    React.useEffect(() => {
        update('Manage your goals and assingments')
    }, [update])

    return (
        <div className="container-calendar">
            <h1>Hi, I'm calendar mode</h1>
        </div> 
    )
}

export default Calendar