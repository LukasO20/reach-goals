import { useState } from 'react'
import * as tagAction from '../provider/tag/tagAction.js'
import * as goalService from '../services/goalService.js'
import * as assignmentService from '../services/assignmentService.js'

const useSaveModel = () => {
    const [data, setData] = useState([])

    const fetchData = async (params) => {
        try {
            switch (params.type) {
                case 'goal': {
                    params.model.id ? setData(await goalService.updateGoal(params.model)) : setData(await goalService.addGoal(params.model))
                    break
                }
                case 'assignment': {
                    params.model.id ? setData(await assignmentService.updateAssignment(params.model)) : setData(await assignmentService.addAssignment(params.model))
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