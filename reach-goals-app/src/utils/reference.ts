export const typeModel = ['goal', 'tag', 'assignment']

export const typeReduceModel = ['core', 'support']

export const typeFilterModel = ['goalSomeID', 'goalAssignmentRelation', 'goalTagRelation',
    'notAssignmentRelation', 'assignmentSomeID', 'assignmentGoalRelation',
    'assignmentTagRelation', 'notGoalRelation', 'tagSomeID',
    'tagRelationAssignment', 'tagRelationGoal', 'tagNotRelationGoal', 'tagNotRelationAssignment']

export type FETCH_MODELS = 
    'goalSomeID' |
    'goalAssignmentRelation' |
    'goalTagRelation' |
    'notAssignmentRelation' | 
    'assignmentSomeID' | 
    'assignmentGoalRelation' |
    'assignmentTagRelation' | 
    'notGoalRelation' | 
    'tagSomeID' |
    'tagRelationAssignment' | 
    'tagRelationGoal' | 
    'tagNotRelationGoal' | 
    'tagNotRelationAssignment'

export const weekNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]