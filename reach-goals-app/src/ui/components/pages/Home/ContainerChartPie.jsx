import { useEffect, useState } from 'react'
import ChartPie from '../../items/elements/ChartPie/ChartPie.jsx'

const exportDataPie = (data) => {
    return data?.map(model => ({
        id: model.id,
        label: model.name,
        value: '1'
    }))
}

const ContainerChartPie = (props) => {
    const [dataPie, setDataPie] = useState([])
    const data = props.data

    useEffect(() => {
        const { goal = [], assignment = [] } = data || {}

        if (goal.length && assignment.length) {
            setDataPie([...goal, ...assignment])
        }
    }, [data])

    console.log('PIE DATA ', exportDataPie(dataPie))
    return <div>pie</div>
}

export default ContainerChartPie