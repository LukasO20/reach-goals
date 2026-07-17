/**
 * @param {import('./types').RenderDropdownStatusTitleProps} props
 */
export const renderDropdownStatusTitle = ({ status }) => {
    return {
        icon: status,
        status: status ?? 'choose an option'
    }
}

// /**
//  * @param {import('./types').RenderModelEnviromentProps} props
//  */
// export const renderModelEnviroment = ({ 
//     type, 
//     modelForm, 
//     mainModelID, 
//     modelSwitcherProps, 
//     modelCopyProps, 
//     region 
// }) => {
//     const goalEnviroment = !!mainModelID && type

//     if (goalEnviroment && Object.keys(modelForm).length > 0)
//         return <ModelSwitcher type='assignment' propsReference={modelSwitcherProps} />
//     else
//         return <ModelCopy type={model.typeModel} region={region} propsReference={modelCopyProps} />
// }

/**
 * @param {import('./types').RenderModelTagEnviromentProps} props
 * @returns {import('./types').RenderModelTagEnviromentReturns}
 */
export const renderModelTagEnviroment = ({
    type,
    modelForm,
    mainModelID,
    modelSwitcherProps,
    modelCopyProps
}) => {
    const hasDataModelForm = !!mainModelID && Object.keys(modelForm).length > 0
    const props = hasDataModelForm ? modelSwitcherProps : modelCopyProps
    const render = hasDataModelForm ? 'copy' : 'switcher'

    return {
        props: props,
        type: type,
        render: render
    }
}

/**
 * @param {import('./types').FindEmptyFieldsProps} props
 * @returns {import('./types').FindEmptyFieldReturns}
 */
export const findEmptyFields = ({ modelForm }) => {
    const fieldsData = Object.fromEntries(
        Object.entries(modelForm).filter(([key, value]) => {
            const validFields = ['name', 'color']
            return !value && validFields.includes(key)
        })
    )

    const someEmptyFields = !!Object.keys(fieldsData).length

    return {
        fields: Object.keys(fieldsData),
        isEmptyFields: someEmptyFields
    }
}