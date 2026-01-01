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
            panel: {}
        },
        assignment: {
            scope: 'page',
            page: {},
            panel: {}
        },
        tag: {
            scope: 'page',
            page: {},
            panel: {}
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