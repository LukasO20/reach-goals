/**
 * @param {import('./types').FindEmptyFieldsProps} props
 * @returns {import('./types').FindEmptyFieldReturns}
 */
export const findEmptyFields = ({ form }) => {
    const fieldsData = Object.fromEntries(
        Object.entries(form).filter(([key, value]) => {
            const validFields = ['name', 'email']
            return !value && validFields.includes(key)
        })
    )

    const someEmptyFields = !!Object.keys(fieldsData).length

    return {
        fields: Object.keys(fieldsData),
        isEmptyFields: someEmptyFields,
    }
}
