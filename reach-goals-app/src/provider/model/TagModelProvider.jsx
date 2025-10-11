import { useReducer, useEffect, createContext, useContext } from 'react'

import * as tagService from '../../services/tagService.js'

import { reduceModelMap, initialStateMap, filterServiceFnMap } from '../../utils/mapping/mappingUtilsProvider.js'

export const TagModelContext = createContext()

export const TagModelProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reduceModelMap, initialStateMap)

    const load = async (filters = {}) => {
        dispatch({ type: 'LOADING' })
        const dataSource = filters.source
        const useFilter = Object.entries(filters).filter(
            filter => typeof filter[1] === 'number' || filter[1] === 'all'
        )[0]

        try {
            //Filter object has valid value to filter
            if (useFilter) {
                const keyFilter = useFilter[0]
                const valueFilter = useFilter[1]
                const typeDispatch = keyFilter === 'tagSomeID' && typeof valueFilter === 'number' ? 'FETCH_ONE' 
                    : dataSource === 'core' ? 'FETCH_LIST' : 'FETCH_SUPPORT_LIST'

                dispatch({
                    type: typeDispatch, payload: await tagService[filterServiceFnMap[keyFilter]](valueFilter)
                })
            }
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }

    const remove = async (id) => {
        dispatch({ type: 'LOADING' })

        try {
            if (typeof id === 'number') {
                return dispatch({
                    type: 'REMOVE_ONE', payload: await tagService.deleteTag(id)
                })
            }
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }

    const save = async (model) => {
        dispatch({ type: 'LOADING' })

        try {
            if (model) {
                const saveModel = typeof model.id === 'number' ? 'update' : 'create'
                return dispatch({
                    type: 'SAVE_ONE', payload: saveModel === 'update' ? await tagService.updateTag(model) : await tagService.addTag(model)
                })
            }
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }

    useEffect(() => {
        //if necessary checks the results of state - discomment this region
        console.log('TAG provider - ', state)
    }, [state])

    return (
        <TagModelContext.Provider value={{ ...state, refetch: load, remove, save }}>
            {children}
        </TagModelContext.Provider>
    )
}

export const useTagModel = () => useContext(TagModelContext)