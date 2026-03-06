import ButtonAction from '../ButtonAction/ButtonAction'

import './PopupModelOptions.scss'

const PopupModelOptions = ({ type }) => {
    //TODO: use utilityProvider about consume common services (updateModelStatus ans removeModels)

    return (
        <div className='container-popup model-options'>
            {type !== 'tag' && (
                <>
                    <ButtonAction classBtn='button-action progress plan-round' icon='progress' title='in progress' />
                    <ButtonAction classBtn='button-action conclude plan-round' icon='check' title='conclude' />
                    <ButtonAction classBtn='button-action cancel plan-round' icon='cancel' title='cancel' />
                </>
            )}
            <ButtonAction classBtn='button-action delete plan-round' icon='remove' title='delete' />
        </div>
    )
}

export default PopupModelOptions