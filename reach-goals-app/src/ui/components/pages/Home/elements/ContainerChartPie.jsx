import { useEffect, useState } from 'react'
import ChartPie from '../../../items/elements/ChartPie/ChartPie.jsx'

import PropTypes from 'prop-types'

const standardPieData = {
    data: {
        goal: {
            label: '',
            length: null
        },
        assignment: {
            label: '',
            length: null
        }
    }
}

const exportDataPie = (datapie) => {
    const { goal, assignment } = datapie.data
    const data = [goal, assignment]

    return data.map(model => ({
        id: model.label,
        label: model.label,
        value: model.length,
        color: model.label === 'goal' ? '#172b4dff' : '#16B0F7' 
    }))
}

const ContainerChartPie = ({ data }) => {
    const [dataPie, setDataPie] = useState(standardPieData)
    const chartData = exportDataPie(dataPie)

    useEffect(() => {
        const { goal = [], assignment = [] } = data || {}

        if (goal.length && assignment.length) {
            setDataPie(prevData => (
                {
                    ...prevData,
                    data: {
                        goal: {
                            label: 'goal',
                            length: goal.length
                        },
                        assignment: {
                            label: 'assignment',
                            length: assignment.length
                        }
                    }
                }
            ))
        }
    }, [data])

    return (
        <div className='chart-pie home'>
            <div className='head'></div>
            <div className='body'>
                <ChartPie data={chartData} />
            </div>
        </div>
    )
}

ContainerChartPie.propTypes = {
    data: PropTypes.exact({
        goal: PropTypes.array.isRequired,
        assignment: PropTypes.array.isRequired
    }).isRequired,
}

export default ContainerChartPie