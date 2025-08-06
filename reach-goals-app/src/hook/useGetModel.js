import { useEffect, useState } from 'react'
import * as tagAction from '../provider/tag/tagAction.js'
import * as goalAction from '../provider/goal/goalAction.js'
import * as assignmentAction from '../provider/assignment/assignmentAction.js'

const useGetModel = ({ requestProps, reset }) => {
    const [data, setData] = useState([])
    const [params, setParams] = useState({ ...requestProps })

    const fetchData = async () => {
        try {
            switch (params.type) {
                case 'goal': {
                    if (params.goalSomeID) {
                        setData(await goalAction.getGoal(params.goalSomeID))
                    } else if (params.goalAssignmentRelation) {
                        setData(await goalAction.getGoalOnAssignment(params.goalAssignmentRelation))
                    } else if (params.goalTagRelation) {
                        setData(await goalAction.getGoalOnTag(params.goalTagRelation))
                    } else if (params.notAssignmentRelation) {
                        setData(await goalAction.getGoalWithoutAssignment(params.notAssignmentRelation))
                    }
                    break
                }
                case 'assignment': {
                    if (params.assignmentSomeID) {
                        setData(await assignmentAction.getAssignment(params.assignmentSomeID))
                    } else if (params.assignmentGoalRelation) {
                        setData(await assignmentAction.getAssignmentOnGoal(params.assignmentGoalRelation))
                    } else if (params.assignmentTagRelation) {
                        setData(await assignmentAction.getAssignmentOnTag(params.assignmentTagRelation))
                    } else if (params.notGoalRelation) {
                        setData(await assignmentAction.getAssignmentWithoutGoal())
                    }
                    break
                }
                case 'tag': {
                    if (params.tagSomeID) {
                        setData(await tagAction.getTag(params.tagSomeID))
                    } else if (params.tagsRelation) {
                        let result = await tagAction.getTagOnGoal(params.tagsRelation)
                        if (!result.length) {
                            result = await tagAction.getTagOnAssignment(params.tagsRelation)
                        }
                        setData(result)
                    } else if (params.tagsNotRelation?.notRelationID && params.tagsNotRelation?.notRelationModel !== '') {
                        setData(params.tagsNotRelation.notRelationModel === 'goal'
                            ? await tagAction.getTagNotGoal(params.tagsNotRelation.notRelationID)
                            : await tagAction.getTagNotAssignment(params.tagsNotRelation.notRelationID))
                    }
                    break
                }
            }
        }
        catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        console.log('PARAMS SENDED - ', params)
        if (reset) {
            setData([])
            return
        }

        fetchData()
    }, [JSON.stringify(params), reset])

    if (params.goalSomeID) {
        //console.log('PARAMS OF HOOK GETMODEL (goal) - ', params, data)
    }

    if (params.tagsRelation) {
        //console.log('PARAMS OF HOOK GETMODEL (tag relation) - ', params)
    }

    return { params, data, setParams }
}

export { useGetModel }