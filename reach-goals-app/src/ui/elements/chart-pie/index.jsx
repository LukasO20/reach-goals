import { ResponsivePie } from '@nivo/pie'

import { useTheme } from '../../../provider/ui/theme-provider'

/** @typedef {import('./types.js').ChartPieProps} Props */

/**
 * @param {Props} props
 */
const ChartPie = ({ data = [] }) => {
    if (data.some((item) => item.id === '')) return null

    const { theme } = useTheme()

    const colorText = theme === 'light' ? '#242424' : '#FFFFFF'

    return (
        <div className='chart-pie'>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                colors={(d) => d.data.color}
                innerRadius={0.5}
                padAngle={0.6}
                cornerRadius={8}
                activeOuterRadiusOffset={10}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={colorText}
                arcLinkLabelsThickness={3}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['brighter', 5]],
                }}
                arcLabelsSkipAngle={10}
                legends={[
                    {
                        anchor: 'left',
                        direction: 'column',
                        translateY: -165,
                        translateX: -75,
                        itemWidth: 100,
                        itemHeight: 22,
                        symbolShape: 'circle',
                    },
                ]}
                theme={{
                    labels: {
                        text: {
                            fontSize: 12.5,
                            fontWeight: 700,
                        },
                    },
                    legends: {
                        text: {
                            fontSize: 15,
                            fontWeight: 700,
                            fill: colorText,
                        },
                    },
                }}
            />
        </div>
    )
}

export default ChartPie
