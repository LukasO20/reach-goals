import { useSwitchLayout } from '../../../../../../provider/ui/switch-layout-provider.jsx'

import { cx } from '../../../../../../utils/utils.js'

import ButtonAction from '../../button-action/index.jsx'

const ChartOptions = () => {
    const { data: { visibility },  setUserConfigLayout } = useSwitchLayout()

    /** @param {import('../../../../../../utils/types.js').VisibilityConfigProps} */
    const handleButtonActionClick = ({ charts }) => {
        setUserConfigLayout({ type: 'visibility', data: { charts } })
    }

    const isSwitchChartPie = visibility.charts === 'chart-pie'
    const isSwitchChartBar = visibility.charts === 'chart-bar'

    const buttonSwitchChartPieClass = cx(`switch-chart pie max-width plan-round ${isSwitchChartPie && 'active'}`)
    const buttonSwitchChartBarClass = cx(`switch-chart bar max-width plan-round ${isSwitchChartBar && 'active'}`)

    return (
        <>
            <ButtonAction classBtn={buttonSwitchChartPieClass}
                title='pie' onClick={() => handleButtonActionClick({ charts: 'chart-pie' })} />
            <ButtonAction classBtn={buttonSwitchChartBarClass}
                title='bar' onClick={() => handleButtonActionClick({ charts: 'chart-bar' })} />
        </>
    )
}

export default ChartOptions