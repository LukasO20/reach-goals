import { useState } from 'react'
import * as tagAction from '../provider/tag/tagAction'
import * as goalAction from '../provider/goal/goalAction'
import * as assignmentAction from '../provider/assignment/assignmentAction'

const useDeleteModel = () => {
    const [data, setData] = useState([])

    const fetchData = async (params) => {
        try {
            switch (params.type) {
                case 'goal': {
                    if (params.goalID) {
                        const result = await goalAction.deleteGoal(params.goalID)
                        setData(result)
                    }
                    break
                }
                case 'assignment': {
                    if (params.assignmentID) {
                        const result = await assignmentAction.deleteAssignment(params.assignmentID)
                        setData(result)
                    }
                    break
                }
                case 'tag': {
                    if (params.tagID) {
                        const result = await tagAction.deleteTag(params.tagID)
                        setData(result)
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

    return { data, deleteModel: fetchData }
}

export { useDeleteModel }