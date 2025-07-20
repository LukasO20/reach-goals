import { useEffect, useState } from 'react'
import * as tagAction from '../provider/tag/tagAction.js'
import * as goalAction from '../provider/goal/goalAction.js'
import * as assignmentAction from '../provider/assignment/assignmentAction.js'

const useGetModel = (requestProps, reset = false) => {
    //try to use a state here of 'params' to improve calls and actions of this hook
    const params = {
        type: requestProps.type ?? null,

        tagsRelation: requestProps.tagsRelation ?? null,
        tagsNotRelation: requestProps.tagsNotRelation && {
            notRelationID: requestProps.tagsNotRelation.notRelationID ?? null,
            notRelationModel: requestProps.tagsNotRelation.notRelationModel ?? null
        },
        tagSomeID: requestProps.tagSomeID ?? null,

        goalSomeID: requestProps.goalSomeID ?? null,
        goalAssignmentRelation: requestProps.goalAssignmentRelation ?? null,
        goalTagRelation: requestProps.goalTagRelation ?? null,
        notAssignmentRelation: requestProps.notAssignmentRelation ?? null,

        assignmentSomeID: requestProps.assignmentSomeID ?? null,
        assignmentGoalRelation: requestProps.assignmentGoalRelation ?? null,
        assignmentTagRelation: requestProps.assignmentTagRelation ?? null,
        notGoalRelation: requestProps.notGoalRelation ?? null,
    }

    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            switch (params.type) {
                case 'goal': {
                    if (params.goalSomeID) {
                        const result = await goalAction.getGoal(params.goalSomeID)
                        setData(result)
                    } else if (params.goalAssignmentRelation) {
                        const result = await goalAction.getGoalOnAssignment(params.goalAssignmentRelation)
                        setData(result)
                    } else if (params.goalTagRelation) {
                        const result = await goalAction.getGoalOnTag(params.goalTagRelation)
                        setData(result)
                    } else if (params.notAssignmentRelation) {
                        const result = await goalAction.getGoalWithoutAssignment(params.notAssignmentRelation)
                        setData(result)
                    } else {
                        setData([])
                    }
                    break
                }
                case 'assignment': {
                    if (params.assignmentSomeID) {
                        const result = await assignmentAction.getAssignment(params.assignmentSomeID)
                        setData(result)
                    } else if (params.assignmentGoalRelation) {
                        const result = await assignmentAction.getAssignmentOnGoal(params.assignmentGoalRelation)
                        setData(result)
                    } else if (params.assignmentTagRelation) {
                        const result = await assignmentAction.getAssignmentOnTag(params.assignmentTagRelation)
                        setData(result)
                    } else if (params.notGoalRelation) {
                        const result = await assignmentAction.getAssignmentWithoutGoal()
                        setData(result)
                    } else {
                        setData([])
                    }
                    break
                }
                case 'tag': {
                    if (params.tagSomeID) {
                        const result = await tagAction.getTag(params.tagSomeID)
                        setData(result)
                    } else if (params.tagsRelation) {
                        let result = await tagAction.getTagOnGoal(params.tagsRelation)
                        if (!result.length) {
                            result = await tagAction.getTagOnAssignment(params.tagsRelation)
                        }
                        setData(result)
                    } else if (params.tagsNotRelation?.notRelationID && params.tagsNotRelation?.notRelationModel !== '') {
                        const result = params.tagsNotRelation.notRelationModel === 'goal'
                            ? await tagAction.getTagNotGoal(params.tagsNotRelation.notRelationID)
                            : await tagAction.getTagNotAssignment(params.tagsNotRelation.notRelationID)
                        setData(result)
                    } else {
                        setData([])
                    }
                    break
                }
                default: {
                    setData([])
                }
            }
        }
        catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        if (reset) {
            setData([])
            return
        }

        fetchData()
    }, [JSON.stringify(params)], reset)
    
    if (params.goalSomeID) {
        console.log('PARAMS OF HOOK GETMODEL (goal) - ', params)
    }

    if (params.tagsRelation) {
        console.log('PARAMS OF HOOK GETMODEL (tag relation) - ', params)
    }

    return { params, data }
}

export { useGetModel }