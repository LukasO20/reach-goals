import FormStandard from './components/form-standard.jsx'
import FormTag from './components/form-tag.jsx'

import './style.scss'

/** @typedef {import('./types.js').FormProps} Props */

/**
 * @param {Props} props
 */
const Form = ({ typeForm, functionFormMap, model, modelForm, mainModelID, pendingState }) => {
    const isFormTag = typeForm === 'tag'
    const isFormStandard = typeForm === 'goal' || typeForm === 'assignment'

    return (
        <>
            {isFormTag && (
                <FormTag
                    type={typeForm}
                    functionFormMap={functionFormMap}
                    modelForm={modelForm}
                    model={model}
                    pendingState={pendingState}
                />
            )}
            {isFormStandard && (
                <FormStandard
                    type={typeForm}
                    functionFormMap={functionFormMap}
                    modelForm={modelForm}
                    model={model}
                    pendingState={pendingState}
                    mainModelID={mainModelID}
                />
            )}
        </>
    )
}

export default Form