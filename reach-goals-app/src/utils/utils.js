import moment from 'moment'

const formatDate = (model) => {
    if (!model) { return }
    const { start, end } = model

    const formatInputISO = (input) => {
        if (moment(input, moment.ISO_8601, true).isValid()) {
            return input ? moment(input).format('DD/MM/YYYY') : null
        }
    }

    const formatInput = (input) => {
        if (input && !moment(input, moment.ISO_8601, true).isValid()) {

            const cleanedInput = input.replace(/\D/g, '')
            if (isNaN(Number(cleanedInput))) { return '' }

            const limitedInput = cleanedInput.slice(0, 8)
            let formattedInput = ''

            if (limitedInput.length <= 2) {
                formattedInput = limitedInput
            }
            else if (limitedInput.length <= 4) {
                formattedInput = `${limitedInput.slice(0, 2)}/${limitedInput.slice(2)}`
            }
            else {
                formattedInput = `${limitedInput.slice(0, 2)}/${limitedInput.slice(2, 4)}/${limitedInput.slice(4)}`
            }

            const validDate = moment(formattedInput, 'DD/MM/YYYY')
            if (!validDate.isValid()) {
                console.error('THIS IS IS INVALID DATE (put an indicator input date error to users see)')
            }

            return formattedInput
        }
    }

    const formatStart = start ? formatInput(start) || formatInputISO(start) : undefined
    const formatEnd = end ? formatInput(end) || formatInputISO(end) : undefined

    return {
        start: formatStart,
        end: formatEnd
    }
}

const hasRequiredProps = (props, requiredKeys = []) => {
  return requiredKeys.every(key => Boolean(props[key]))
}

export { formatDate, hasRequiredProps }