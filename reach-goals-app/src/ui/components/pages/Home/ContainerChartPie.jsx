import { useEffect, useState } from 'react'
import ChartPie from '../../items/elements/ChartPie/ChartPie.jsx'

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

const ContainerChartPie = (props) => {
    const [dataPie, setDataPie] = useState(standardPieData)
    const data = props.data

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
                <ChartPie data={exportDataPie(dataPie)} />
            </div>
        </div>
    )
}

export default ContainerChartPie