import FormStandard from './components/form-standard'
import FormTag from './components/form-tag'

import './style.scss'

/** @typedef {import('./types.js').FormProps} Props */

/**
 * @param {Props} props
 */
const Form = ({ typeForm, functionFormMap, model, pendingState }) => {
    const isFormTag = typeForm === 'tag'
    const isFormStandard = typeForm === 'goal' || typeForm === 'assignment'

    return (
        <>
            {isFormTag && (
                <FormTag
                    type={typeForm}
                    functionFormMap={functionFormMap}
                    model={model}
                    pendingState={pendingState}
                />
            )}
            {isFormStandard && (
                <FormStandard
                    type={typeForm}
                    functionFormMap={functionFormMap}
                    model={model}
                    pendingState={pendingState}
                />
            )}
        </>
    )
}

export default Form