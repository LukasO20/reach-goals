export const modelTabsMap = {
    goal: [
        {
            filter: { notAssignmentRelation: '' },
            label: 'without assignments',
        },
        {
            filter: { goalAssignmentRelation: '' },
            label: 'with assignments',
        },
        {
            filter: { goalTagRelation: '' },
            label: 'with tags',
        },
        {
            filter: { goalSomeID: '' },
            label: 'every goal',
        },
    ],
    assignment: [
        {
            filter: { notGoalRelation: '' },
            label: 'without goals',
        },
        {
            filter: { assignmentGoalRelation: '' },
            label: 'with goals',
        },
        {
            filter: { assignmentTagRelation: '' },
            label: 'with tags',
        },
        {
            filter: { assignmentSomeID: '' },
            label: 'every assignment',
        },
    ],
    tag: [
        {
            filter: { tagRelationGoal: '' },
            label: 'with goals',
        },
        {
            filter: { tagRelationAssignment: '' },
            label: 'with assignments',
        },
        {
            filter: { tagSomeID: '' },
            label: 'every tag',
        },
    ],
}
