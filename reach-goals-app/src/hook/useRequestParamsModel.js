import { useEffect, useState } from 'react'
import isEqual from 'lodash/isEqual'
import * as tagAction from '../provider/tag/tagAction'

const useRequestParamsModel = (requestProps) => {
    const [params, setParams] = useState({
        type: requestProps.type ?? null,
        tagsRelation: requestProps.goalID ?? requestProps.assignmentID ?? null,
        tagSomeID: requestProps.tagSomeID ?? null
    })

    console.log('PARAMETERS - ', params)

    const [data, setData] = useState([])

    // useEffect(() => {
    //     setParams((prevParams) => {
    //         const newParams = {
    //             type: requestProps.type ?? null,
    //             tagsRelation: requestProps.goalID ?? requestProps.assignmentID ?? null,
    //             tagSomeID: requestProps.tagSomeID ?? null
    //         }

    //         if (!isEqual(prevParams, newParams)) { return newParams }
    //         return prevParams
    //     })
    // }, [requestProps])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         let tagGetted = undefined

    //         switch (params.type) {
    //             case 'tag': {
    //                 if (params.tagsRelation) {
    //                     tagGetted = await tagAction.getTagOnGoal(params.tagsRelation)
    //                 } else if (params.tagSomeID) {
    //                     tagGetted = await tagAction.getTag(params.tagSomeID)
    //                 }
    //             }
    //         }

    //         setData(tagGetted)
    //     }

    //     fetchData()
    // }, [params])

    return { params, data }
}

export { useRequestParamsModel }