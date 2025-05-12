import { useEffect, useState } from 'react'

const useRequestParamsModel = (requestProps) => {
    const [params, setParams] = useState({
        tagsRelation: requestProps?.goalID ?? requestProps?.assignmentID ?? null,
        tagSomeID: requestProps?.tagSomeID
    })

    useEffect(() => {
        setParams((prevParams) => {
            const newParams = {
                tagsRelation: requestProps?.goalID ?? requestProps?.assignmentID ?? null,
                tagSomeID: requestProps?.tagSomeID
            }

            return JSON.stringify(prevParams) !== JSON.stringify(newParams) ? newParams :  prevParams
        })

    }, [requestProps.goalID, requestProps.assignmentID, requestProps.tagSomeID])

    return { params }
}

export { useRequestParamsModel }