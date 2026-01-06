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