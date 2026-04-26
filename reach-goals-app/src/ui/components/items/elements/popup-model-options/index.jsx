import ModelOptions from './components/model-options.jsx'
import ChartOptions from './components/chart-options.jsx'

import './style.scss'

/** @typedef {import('./types.js').PopupModelOptionsProps} Props */

/**
 * @param {Props} props
 */
const PopupModelOptions = ({ type, typeModelOptions }) => {

    const isValidType = !!type

    return (
        <div className='container-popup model-options'>
            {isValidType && type === 'pop-model' ? (<ModelOptions type={typeModelOptions} />) : (<ChartOptions />)}
        </div>
    )
}

export default PopupModelOptions