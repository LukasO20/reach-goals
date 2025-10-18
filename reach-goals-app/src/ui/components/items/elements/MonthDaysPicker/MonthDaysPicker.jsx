import { useState, useContext } from 'react'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import { weekNames } from '../../../../../utils/reference.js'
import { formatDate } from '../../../../../utils/utils.js'
import { switchLayoutMap, targetMap } from '../../../../../utils/mapping/mappingUtils.js'

import './MonthDaysPicker.scss'

import moment from 'moment'

const MonthDaysPicker = (props) => {
    const [year] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth())
    const { setModel } = useContext(ManageModelContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    const { layoutComponent, switchLayoutComponent } = useSwitchLayout()

    const getDaysInMonth = (year, month) => {
        const date = new Date(year, month, 1)
        const days = []
        while (date.getMonth() === month) {
            days.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }
        return days
    }

    const activityClick = ({ id, type }) => {
        setModel(prev => ({ ...prev, mainModelID: id, typeModel: type }))
        switchLayoutComponent(switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'right' }))
        toggleVisibility(targetMap(['panel-right', type]))
    }

    const days = getDaysInMonth(year, month)
    const models = props.model || { goal: [], assignment: [] }

    const modelsCalendar = Object.entries(models || {}).flatMap(([key, value]) =>
        Array.isArray(value?.core) ?
            value.core.map(model => (
                {
                    ...model,
                    type: key,
                    start: formatDate(model).start,
                    end: formatDate(model).end,
                }
            )) : []
    )

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
                            {
                                modelsCalendar.map(model => {
                                    //Filter models that start on this day
                                    return (
                                        model.start ===  moment(day).format('DD/MM/YYYY') &&
                                        <div key={model.id} className='activity' onClick={() => activityClick(model)}>
                                            <label className='activity-name'>{model.name}</label>                                           
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MonthDaysPicker