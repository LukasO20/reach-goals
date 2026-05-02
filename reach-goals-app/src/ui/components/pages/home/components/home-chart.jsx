import { useEffect, useState } from 'react'
import { useSwitchLayout } from '../../../../../provider/ui/switch-layout-provider.jsx'

import ChartPie from '../../../items/elements/chart-pie/index.jsx'
import ChartBar from '../../../items/elements/chart-bar/index.jsx'
import ChartCards from '../../../items/elements/chart-cards/index.jsx'
import PopupModelOptions from '../../../items/elements/popup-model-options/index.jsx'

/** @typedef {import('../types.js').HomeProps} Props */

/**
 * @param {Props} props
 */
const HomeChart = ({ data }) => {
    const { data: { visibility } } = useSwitchLayout()
    const [dataChart, setDataChart] = useState(null)

    const dataChartMap = (dataChart) => {
        const { goal, assignment } = dataChart?.data ?? {}
        return [goal, assignment]
    }

    const exportDataPie = (dataChart) => {
        const data = dataChartMap(dataChart)
        return data
            .filter((model) => !!model)
            .map((model) => ({
                id: model.label,
                label: model.label,
                value: model.length,
                color: model.id === 'goal' ? '#172b4dff' : '#16B0F7'
            }))
    }

    const exportDataBar = (dataChart) => {
        const data = dataChartMap(dataChart)
        return data
            .filter((model) => !!model)
            .map((model) => ({
                id: model.id,
                label: model.label,
                quantity: model.length,
                activities: {
                    [model.id]: model.data
                }
            }))
    }

    useEffect(() => {
        const { goal = [], assignment = [] } = data || {}

        setDataChart(prevData => (
            {
                ...prevData,
                data: {
                    goal: {
                        id: 'goal',
                        label: 'Goal',
                        length: goal.length,
                        data: goal
                    },
                    assignment: {
                        id: 'assignment',
                        label: 'Assignment',
                        length: assignment.length,
                        data: assignment
                    }
                }
            }
        ))
    }, [data])

    const totalActivities = dataChart ? dataChart.data.goal.length + dataChart.data.assignment.length : 0
    const dataPie = exportDataPie(dataChart)
    const dataBar = exportDataBar(dataChart)

    return (
        <div className='chart home'>
            <div className='body'>
                {visibility.charts === 'chart-pie' && (
                    <ChartPie data={dataPie} />
                )}
                {visibility.charts === 'chart-bar' && (
                    <ChartBar data={dataBar} quantity={totalActivities} showLegend={true} />
                )}
                <ChartCards data={data} type='home' />
            </div>
            <PopupModelOptions type='pop-chart' />
        </div>
    )
}

export default HomeChart