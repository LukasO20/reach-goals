export const manageModelMap = {
    typeModel: '',
    mainModelID: null,
    transportModel: {
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
    filter: {
        goal: {
            scope: 'page',
            page: {},
            modal: {}
        },
        assignment: {
            scope: 'page',
            page: {},
            modal: {}
        },
        tag: {
            scope: 'page',
            page: {},
            modal: {}
        }
    },
    formModel: {}
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
        layoutName: 'goal'
    },
    modal: {
        modalName: null,
        layoutName: null
    }
}

export const updateFilterModelMap = (filter = {}, model = '', scope = '') => {
    return { filter, model, scope }
}

export const updateDataModelMap = (data = [], type = '', scope = '') => {
    return { data, type, scope }
}

export const resetManageModelMap = (keys = []) => {
    return { keys }
}

export const updateFormModelMap = (keyObject = '', value, type = '', action = '') => {
    return { keyObject, value, type, action }
}

export const removeFromTransportModelMap = (id, type = '') => {
    return { id, type }
}

export const addToTransportModelMap = (id, name = '', type = '', color = '', custom) => {
    return { id, name, type, color, custom }
}