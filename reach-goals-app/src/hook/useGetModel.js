import { useEffect, useState, useMemo } from 'react'
import * as tagAction from '../provider/tag/tagAction'
import * as goalAction from '../provider/goal/goalAction'
import * as assignmentAction from '../provider/assignment/assignmentAction'

const useGetModel = (requestProps) => {
    const params = useMemo(() => ({
        type: requestProps.type ?? null,

        tagsRelation: requestProps.tagsRelation ?? null,     
        tagsNotRelation: requestProps.tagsNotRelation && {
            notRelationID: requestProps.tagsNotRelation.notRelationID ?? null,
            notRelationModel: requestProps.tagsNotRelation.notRelationModel ?? null
        },
        tagSomeID: requestProps.tagSomeID ?? null,

        goalSomeID: requestProps.goalSomeID ?? null,
        assignmentRelation: requestProps.assignmentRelation ?? null,     

        assignmentSomeID: requestProps.assignmentSomeID ?? null

    }), [requestProps.type, requestProps.tagsRelation,
        requestProps.assignmentSomeID,  requestProps.goalSomeID,
        requestProps.tagSomeID, requestProps.tagsNotRelation])

    const [data, setData] = useState([])

    console.log('PARAMS OF HOOK GETMODEL - ', params)
    useEffect(() => {
        const fetchData = async () => {
            try {
                switch (params.type) {
                    case 'goal': {
                        if (params.goalSomeID) {
                            const result = await goalAction.getGoal(params.goalSomeID)
                            setData(result)
                        } else if (params.assignmentRelation) {
                            const result = await goalAction.getGoalOnAssignment(params.assignmentRelation)
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
                        } else {
                            setData([])
                        }
                        break
                    }
                    case 'tag': {
                        if (params.tagSomeID) {
                            const result = await tagAction.getTag(params.tagSomeID)
                            setData(result)
                        } 
                        else if (params.tagsRelation) {
                            let result = await tagAction.getTagOnGoal(params.tagsRelation)
                            if (!result.length) {
                                result = await tagAction.getTagOnAssignment(params.tagsRelation)
                            }
                            setData(result)

                        } else if (params.tagsNotRelation.notRelationID && params.tagsNotRelation.notRelationModel !== '') {
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

        fetchData()
    }, [params])

    return { params, data }
}

export { useGetModel }