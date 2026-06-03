import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider/index.jsx'

import ModelOptions from './components/model-options.jsx'
import ChartOptions from './components/chart-options.jsx'
import SwitchModelOptions from './components/switch-model-options.jsx'
import ButtonAction from '../button-action'
import Tooltip from '../tooltip'

import { cx } from '../../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').PopupModelOptionsProps} Props */

/**
 * @param {Props} props
 */
const PopupModelOptions = ({ type, mode, typeModelOptions, typeSwitchModelOptions, onFilterTabs }) => {
    const { setUserConfigLayout } = useSwitchLayout()

    /** @param {import('../../../../provider/ui/switch-layout-provider/types.js').SetUserConfigLayoutParams} target */
    const handleButtonActionClick = (target) => setUserConfigLayout(target)

    const tooltipPositions = { left: '50%', top: 'calc(-100% - 0.5rem)', transform: 'translateX(-50%)' }

    const containetPopupClass = cx(
        `container-popup
        ${type}
        ${mode}
        `
    )
    const buttonAction = (
        <Tooltip title={mode === 'minimize' ? 'Expand' : 'Minimize'} positions={tooltipPositions}>
            <ButtonAction
                classBtn='popup-minimize circle small'
                icon='arrowdown'
                onClick={() => handleButtonActionClick({
                    type: 'visibility',
                    data: { layoutPopupModel: mode === 'minimize' ? null : 'minimize' }
                })}
            />
        </Tooltip>
    )
    const isValidType = !!type && !mode
    const shouldRenderButtonAction = type !== 'pop-model'

    return (
        <div className={containetPopupClass}>
            {mode === 'minimize' && buttonAction}
            {isValidType && (<>
                {type === 'pop-model' ? (<ModelOptions type={typeModelOptions} />) :
                    type === 'pop-switch-model' ? (<SwitchModelOptions type={typeSwitchModelOptions} onFilterTabs={onFilterTabs} />) :
                        (<ChartOptions />)}
                {shouldRenderButtonAction && buttonAction}
            </>)}
        </div>
    )
}

export default PopupModelOptions