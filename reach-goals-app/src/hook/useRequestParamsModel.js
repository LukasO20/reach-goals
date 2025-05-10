import { useEffect, useState } from 'react'

const useRequestParamsModel = (requestProps) => {

    const [params, setParams] = useState(
        requestProps.type === 'goal' ? {}
        
        : requestProps.type === 'assignment' ? {} 
        
        : 
        {
            assignmentID: requestProps.assignmentID ?? null,
            goalID: requestProps.goalID ?? null,
            getAll: requestProps.getAll ?? false
        }
    )

    useEffect(() => {
        setParams((prevParams) => {
            const newParams = 
            
            requestProps.type === 'goal' ? {}
            : 
            requestProps.type === 'assignment' ? {} 
            : 
            {
                assignmentID: requestProps?.assignmentID ?? null,
                goalID: requestProps?.goalID ?? null,
                getAll: requestProps?.getAll ?? false
            }

            return JSON.stringify(prevParams) !== JSON.stringify(newParams) ? newParams :  prevParams
        })

    }, [requestProps])

    return { params }
}

export { useRequestParamsModel }