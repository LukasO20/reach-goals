export const getModelMap = {
    goal: [],
    assignment: [],
    tag: [],
}

export const filterModelMap = {
    type: null,
    source: 'core',
    goalSomeID: null,
    goalAssignmentRelation: null,
    goalTagRelation: null,
    notAssignmentRelation: null,
    assignmentSomeID: null,
    assignmentGoalRelation: null,
    assignmentTagRelation: null,
    notGoalRelation: null,
    tagSomeID: null,
    tagsRelation: null,
    tagsNotRelation: null,
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
            return { ...state, loading: false, error: null/*, removed: action.payload*/ }
        case 'SAVE_ONE':
            return { ...state, loading: false, error: null, saved: action.payload }
        case 'ERROR':
            return { loading: false, error: action.payload, data: [] }
        default:
            return state
    }
}