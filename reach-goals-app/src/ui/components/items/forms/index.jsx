import FormStandard from './elements/form-standard.jsx'
import FormTag from './elements/form-tag.jsx'

import './style.scss'

/** @typedef {import('./types.js').FormProps} Props */

/**
 * @param {Props} props
 */
const Form = ({ typeForm, functionFormMap: formMapFunc, model: modelForm, pendingState: formPendingState }) => {
    const isFormTag = typeForm === 'tag'
    const isFormStandard = typeForm === 'goal' || typeForm === 'assignment'

    return (
        <>
            {isFormTag && (
                <FormTag
                    type={typeForm}
                    functionFormMap={formMapFunc}
                    model={modelForm}
                    pendingState={formPendingState}
                />
            )}
            {isFormStandard && (
                <FormStandard
                    type={typeForm}
                    functionFormMap={formMapFunc}
                    model={modelForm}
                    pendingState={formPendingState}
                />
            )}
        </>
    )
}

export default Form