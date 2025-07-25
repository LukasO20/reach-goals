import { useState } from 'react'
import * as tagAction from '../provider/tag/tagAction.js'
import * as goalAction from '../provider/goal/goalAction.js'
import * as assignmentAction from '../provider/assignment/assignmentAction.js'

const useSaveModel = () => {
    const [data, setData] = useState([])

    const fetchData = async (params) => {
        try {
            switch (params.type) {
                case 'goal': {
                    params.model.id ? setData(await goalAction.updateGoal(params.model)) : setData(await goalAction.addGoal(params.model))
                    break
                }
                case 'assignment': {
                    params.model.id ? setData(await assignmentAction.updateAssignment(params.model)) : setData(await assignmentAction.addAssignment(params.model))
                    break
                }
                case 'tag': {
                    params.model.id ? setData(await tagAction.updateTag(params.model)) : setData(await tagAction.addTag(params.model))
                    break
                }
            }
        }
        catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return { saveModel: fetchData, data }
}

export { useSaveModel }