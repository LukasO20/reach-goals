import FormStandard from './elements/FormStandard.jsx'
import FormTag from './elements/FormTag.jsx'

import PropTypes from 'prop-types'

import './Form.scss'

const Form = ({ typeForm,
    functionFormMap: formMapFunc,
    model: modelForm,
    booleanFormMap: formMapBoll,
    pendingState: formPendingState }) => {

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
                    booleanFormMap={formMapBoll}
                    pendingState={formPendingState}
                />
            )}
        </>
    )
}

Form.propTypes = {
    typeForm: PropTypes.string,
    functionFormMap: PropTypes.shape({
        mapToggleVisibility: PropTypes.func,
        mapHandleChange: PropTypes.func,
        mapModelRelationAddMap: PropTypes.func,
        mapHandleSubmit: PropTypes.func,
        mapSetError: PropTypes.func
    }),
    model: PropTypes.shape({
        formModel: PropTypes.object
    }),
    booleanFormMap: PropTypes.object,
    pendingState: PropTypes.bool
}

export default Form