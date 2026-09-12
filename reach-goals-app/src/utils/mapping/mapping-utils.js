import { typeModel, typeReduceModel, typeFilterModel } from '../reference.js'
import { checkboxMap } from './mapping-utils-provider.js'

/**
 * @typedef {Object} GlobalTypes
 * @property {import('../types.js').VisibilityConfigProps} visibility
 * @property {import('../types.js').ThemeType} theme
 */

export const visibilityMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator,
    }
    return attributes
}

export const switchLayoutMap = ({ area, layout }) => {
    return {
        area,
        layout,
    }
}

export const buildCheckboxMap = ({
    checkboxID,
    scope,
    checkboxIDMain,
} = checkboxMap) => {
    return {
        scope,
        checkboxID,
        checkboxIDMain,
    }
}

export const buildQueryParamsMap = ({ baseUrl, id, action } = {}) => {
    if (typeof action !== 'string' || !action.trim()) {
        throw new Error('The "action" parameter must be a non-empty string.')
    }

    if (typeof baseUrl !== 'string' || !baseUrl.trim()) {
        throw new Error('The "baseUrl" parameter must be a non-empty string.')
    }

    if (id !== undefined && id !== null && id !== '') {
        baseUrl += `/${String(id).trim()}`
    }

    const queryParams = new URLSearchParams({ action })

    return `${baseUrl}?${queryParams.toString()}`
}

/* 
    props => property of component
    type => type of model. Can use 'goal', 'tag' or 'assignment'
    source => type of list according 'reduceModelMap'. 'support' to FETCH_SUPPORT_LIST or 'core' to FETCH_LIST
*/
export const filterBuildModelMap = (props, type, source) => {
    if (!typeModel.includes(type))
        return console.error(
            '"type" parameter is invalid. Send a string supported type ["goal", "tag", "assignment"]'
        )
    if (!typeReduceModel.includes(source))
        return console.error(
            '"source" parameter is invalid. Send a string supported source ["core", "support"]'
        )

    if (typeof props === 'object') {
        const [key, value] = Object.entries(props).find(
            ([k, v]) =>
                typeFilterModel.includes(k) &&
                (typeof v === 'number' || v === 'all')
        ) ?? ['Without key', 'Without value']

        if (key === 'Without key' && value === 'Without value') {
            //This warn is used to show a function does not according with structure filter
            console.warn(`Current filter don't use an ID.`)
        }

        return (
            key && {
                type: type,
                source: source,
                [key]: value,
            }
        )
    }
}

export const titleMap = {
    header: '',
    toast: '',
}

export const displayModesMap = {
    type: ['card', 'card-mini'],
    actions: ['edit', 'delete', 'details', 'remove'],
}

export const persistedUserConfigKeysMap = {
    orderning: 'model-orderning',
    visibility: 'ui-visibility',
    theme: 'ui-theme',
}

/** @type {GlobalTypes} */
export const persistedUserConfigMap = {
    visibility: {
        cards: 'card',
        charts: 'chart-pie',
        status: ['progress', 'conclude', 'cancel'],
        layoutHome: 'goal',
        layoutCalendar: 'all-activities',
        layoutObjectives: 'all-activities',
        layoutPopupModel: null,
        columns: null,
        tagsCard: true,
        navigateBar: 'compact',
    },
    theme: 'light',
}
