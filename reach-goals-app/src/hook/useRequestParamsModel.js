import { useEffect, useState, useMemo } from 'react'
import * as tagAction from '../provider/tag/tagAction'

const useRequestParamsModel = (requestProps) => {
    const params = useMemo(() => ({
        type: requestProps.type ?? null,
        tagsRelation: requestProps.tagsRelation ?? null,        
        tagSomeID: requestProps.tagSomeID ?? null
    }), [requestProps.type, requestProps.tagsRelation, requestProps.tagSomeID])

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                switch (params.type) {
                    case 'tag': {
                        if (params.tagsRelation) {
                            const result = await tagAction.getTagOnGoal(params.tagsRelation)
                            setData(result)
                        } else if (params.tagSomeID) {
                            const result = await tagAction.getTag(params.tagSomeID)
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

export { useRequestParamsModel }