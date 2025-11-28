import { ResponsivePie } from '@nivo/pie'

const ChartPie = (props) => {
    return <ResponsivePie
        data={props.data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        colors={d => d.data.color}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={8}
        activeOuterRadiusOffset={10}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor='#333333'
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        arcLabelsSkipAngle={10}
        legends={[
            {
                anchor: 'left',
                direction: 'column',
                translateY: 56,
                itemWidth: 200,
                itemHeight: 22,
                symbolShape: 'circle'
            }
        ]}
    />
}

export default ChartPie