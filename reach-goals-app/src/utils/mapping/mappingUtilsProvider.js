export const manageModelMap = {
    typeModel: '',
    mainModelID: null,
    transportModel: {
        tag: [],
        assignment: [],
        goal: []
    },
    activeModel: {
        goal: {
            selected: {},
            core: [],
            support: []
        },
        assignment: {
            selected: {},
            core: [],
            support: []
        },
        tag: {
            selected: {},
            core: [],
            support: []
        },
    },
    filter: {
        goal: {},
        assignment: {},
        tag: {}
    },
    submitModel: {}
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

export const reduceModelMap = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true, error: null }
        case 'FETCH_LIST':
            return { ...state, loading: false, error: null, data: { ...state.data, core: action.payload } }
        case 'FETCH_SUPPORT_LIST':
            return { ...state, loading: false, error: null, data: { ...state.data, support: action.payload } }
        case 'FETCH_ONE':
            return { ...state, loading: false, error: null, selected: action.payload }
        case 'REMOVE_ONE':
            return { ...state, loading: false, error: null, removed: true }
        case 'SAVE_ONE':
            return { ...state, loading: false, error: null, saved: action.payload }
        case 'ERROR':
            return { loading: false, error: action.payload, data: [] }
        default:
            return state
    }
}