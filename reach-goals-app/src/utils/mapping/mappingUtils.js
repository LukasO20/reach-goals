import { typeModel, typeReduceModel, typeFilterModel } from '../reference.js'
import { checkboxMap } from './mappingUtilsProvider.js'

export const visibilityMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator
    }
    return attributes
}

export const switchLayoutMap = ({ area, state }) => {
    return {
        area,
        state
    }
}

export const buildCheckboxMap = ({ checkboxID, scope } = checkboxMap) => {
    return {
        scope,
        checkboxID
    }
}

export const buildQueryParamsMap = ({ IDobject, action }) => {
    if (typeof action !== 'string' || !action.trim()) return console.error('"action" must be a non-empty string')
    if (!IDobject || typeof IDobject !== 'object') return console.error('"IDobject" must be an object like { key: value }')

    const hasValidKey = Object.entries(IDobject).some(([k, v]) =>
        k.trim() !== '' && v !== undefined && v !== null && v !== ''
    )
    if (!hasValidKey) return console.error('"IDobject" must have at least one key with a non-empty value')

    return new URLSearchParams({
        action: action,
        ...IDobject
    }).toString()
}

/* 
    props => property of component
    type => type of model. Can use 'goal', 'tag' or 'assignment'
    source => type of list according 'reduceModelMap'. 'support' to FETCH_SUPPORT_LIST or 'core' to FETCH_LIST
*/
export const filterBuildModelMap = (props, type, source) => {
    if (!typeModel.includes(type)) return console.error('"type" parameter is invalid. Send a string supported type ["goal", "tag", "assignment"]')
    if (!typeReduceModel.includes(source)) return console.error('"source" parameter is invalid. Send a string supported source ["core", "support"]')

    if (typeof props === 'object') {
        const [key, value] = Object.entries(props).find(
            ([k, v]) => typeFilterModel.includes(k) && (typeof v === 'number' || v === 'all')) ?? ['Without key', 'Without value']

        if (key === 'Without key' && value === 'Without value') {
            //This warn is used to show a function does not according with structure filter
            console.warn(`Current filter don't use an ID.`)
        }

        return key && {
            type: type,
            source: source,
            [key]: value,
        }
    }
}

export const titleMap = {
    header: '',
    toast: ''
}

export const modelTabsMap = {
    goal: [
        {
            currentfilter: { notAssignmentRelation: 'all' },
            label: 'without assignments',
        },
        {
            currentfilter: { goalAssignmentRelation: 'all' },
            label: 'with assignments',
        },
        {
            currentfilter: { goalTagRelation: 'all' },
            label: 'with tags',
        },
        {
            currentfilter: { goalSomeID: 'all' },
            label: 'every goal',
        },
    ],
    assignment: [
        {
            currentfilter: { notGoalRelation: 'all' },
            label: 'without goals',
        },
        {
            currentfilter: { assignmentGoalRelation: 'all' },
            label: 'with goals',
        },
        {
            currentfilter: { assignmentTagRelation: 'all' },
            label: 'with tags',
        },
        {
            currentfilter: { assignmentSomeID: 'all' },
            label: 'every assignment',
        }
    ],
    tag: [
        {
            currentfilter: { tagRelationGoal: 'all' },
            label: 'with goals',
        },
        {
            currentfilter: { tagRelationAssignment: 'all' },
            label: 'with assignments',
        },
        {
            currentfilter: { tagSomeID: 'all' },
            label: 'every tag',
        }
    ]
}

export const displayModesMap = {
    type: ['card', 'card-mini'],
    actions: ['edit', 'delete', 'details', 'remove']
}