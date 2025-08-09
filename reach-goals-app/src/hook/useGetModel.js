import { useEffect, useState } from 'react'
import * as tagAction from '../provider/tag/tagAction.js'

const useGetModel = ({ requestProps, reset }) => {
    const [data, setData] = useState([])
    const [params, setParams] = useState({ ...requestProps })

    const fetchData = async () => {
        try {
            switch (params.type) {
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