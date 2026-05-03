import ModelOptions from './components/model-options.jsx'
import ChartOptions from './components/chart-options.jsx'
import SwitchModelOptions from './components/switch-model-options.jsx'

import './style.scss'

/** @typedef {import('./types.js').PopupModelOptionsProps} Props */

/**
 * @param {Props} props
 */
const PopupModelOptions = ({ type, typeModelOptions, typeSwitchModelOptions, onFilterTabs }) => {

    const isValidType = !!type

    return (
        <div className={`container-popup ${type}`}>
            {isValidType && (
                type === 'pop-model' ? (<ModelOptions type={typeModelOptions} />) :
                    type === 'pop-switch-model' ? (<SwitchModelOptions type={typeSwitchModelOptions} onFilterTabs={onFilterTabs} />) :
                        (<ChartOptions />)
            )}
        </div>
    )
}

export default PopupModelOptions