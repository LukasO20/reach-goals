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

const debounce = (func, delay) => {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), delay)
    }
}

/**
 * @param {Array} data 
 * @param {string} attribute
 * @returns {Array}
 */
const sortedMap = (data = [], attribute) => {
    return [...data].sort((a, b) => {

        if (!!a[attribute] !== !!b[attribute]) {
            return a[attribute] ? -1 : 1
        }

        if (a[attribute] && b[attribute]) {
            if (typeof a[attribute] === 'string') {
                return a[attribute].localeCompare(b[attribute])
            }
            return a[attribute] - b[attribute]
        }

        return 0
    })
}

const cx = (str = '') => {
    return str.replace(/\b(undefined|null|false)\b/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}

/**
 * @param {number} value 
 * @param {number} quantity
 * @returns {string}
 */
const calculatePercent = (value, quantity) => {
    if (quantity === 0) return 0
    return ((value / quantity) * 100).toFixed(2)
}

export { formatDate, hasRequiredProps, debounce, sortedMap, cx, calculatePercent }