export const filerFetchModelMap = {
    goal: {
        page: { goalSomeID: 'all' },
        modal: null
    },
    assignment: {
        page: { assignmentSomeID: 'all' },
        modal: null
    },
    tag: {
        page: { tagSomeID: 'all' },
        modal: null
    }
}

export const manageModelMap = {
    typeModel: undefined,
    mainModelID: undefined,
    selectedModel: {
        tag: [],
        assignment: [],
        goal: []
    },
    dataModel: {
        goal: {
            core: [],
            support: []
        },
        assignment: {
            core: [],
            support: []
        },
        tag: {
            core: [],
            support: []
        },
    },
    filter: filerFetchModelMap,
    activeModel: undefined
}

export const filterServiceFnMap = {
    goalSomeID: 'getGoal',
    goalAssignmentRelation: 'getGoalOnAssignment',
    goalTagRelation: 'getGoalOnTag',
    notAssignmentRelation: 'getGoalWithoutAssignment',
    assignmentSomeID: 'getAssignment',
    assignmentGoalRelation: 'getAssignmentOnGoal',
    assignmentTagRelation: 'getAssignmentOnTag',
    notGoalRelation: 'getAssignmentWithoutGoal',
    tagSomeID: 'getTag',
    tagRelationGoal: 'getTagOnGoal',
    tagRelationAssignment: 'getTagOnAssignment',
    tagNotRelationGoal: 'getTagNotGoal',
    tagNotRelationAssignment: 'getTagNotAssignment'
}

export const initialStateMap = {
    loading: false,
    error: null,
    data: {
        core: [],
        support: []
    },
    selected: {},
    removed: {},
    saved: {}
}

export const switchLayoutMap = {
    page: {
        pageName: 'home',
        layoutName: 'column'
    },
    modal: {
        modalName: null,
        layoutName: null
    }
}

export const checkboxMap = {
    page: {
        selected: []
    },
    modal: {
        selected: []
    },
    scope: '',
    checkboxID: null,
    checkboxIDMain: null,
    checkboxRegistry: {
        page: [],
        modal: []
    }
}

/** 
 * @param {'goal' | 'assignment' | 'tag'} type 
 * @param {import('../reference').FETCH_MODELS} typeFetch
 * @param {'page' | 'modal'} source
 * @param {number | 'all'} value
 * */
export const buildFilterModelMap = (type, typeFetch, source, value) => {
    return {
        [type]: {
            [source]: {
                [typeFetch]: value
            }
        },
    }
}

export const updateFilterModelMap = ({ filter = {}, model = '', scope = '' }) => {
    return { filter, model, scope }
}

export const updateDataModelMap = ({ data = [], type = '', scope = '' }) => {
    return { data, type, scope }
}

export const resetManageModelMap = (keys = []) => {
    return { keys }
}

export const updateActiveModelMap = ({ keyObject = '', value, type = '', action = '' }) => {
    return { keyObject, value, type, action }
}

export const removeFromSelectedModelMap = ({ id, type = '' }) => {
    return { id, type }
}

export const addToSelectedModelMap = ({ id, name = '', type = '', color = '', custom }) => {
    return { id, name, type, color, custom }
}