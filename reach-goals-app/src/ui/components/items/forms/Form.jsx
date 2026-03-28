import FormStandard from './elements/FormStandard.jsx'
import FormTag from './elements/FormTag.jsx'

import './Form.scss'

export const FormMap = {
    functionFormMap: { },
    model: { },
    pendingState: false
}

/**
 * @param {Object} FormTagMap
 * @param {Object} FormTagMap.functionFormMap
 * @param {Object} FormTagMap.model
 * @param {boolean} FormTagMap.pendingState
 */

const Form = ({ typeForm,
    functionFormMap: formMapFunc,
    model: modelForm,
    pendingState: formPendingState } = FormMap) => {

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