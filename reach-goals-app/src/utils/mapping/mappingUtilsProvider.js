export const getModelMap = {
    goal: [],
    assignment: [],
    tag: [],
}

export const filterModelMap = {
    type: null,
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
    data: [],
    selected: {},
    removed: {}
}