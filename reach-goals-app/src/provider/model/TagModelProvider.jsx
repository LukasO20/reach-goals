import { useReducer, useEffect, createContext, useContext } from 'react'

import * as tagService from '../../services/tagService.js'

import { initialStateMap } from '../../utils/mapping/mappingUtilsProvider.js'

export const TagModelContext = createContext()

const tagReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true, error: null }
        case 'FETCH_LIST':
            return { ...state, loading: false, error: null, data: { core: action.payload } }
        case 'FETCH_SUPPORT_LIST':
            return { ...state, loading: false, error: null, data: { support: action.payload } }
        case 'FETCH_ONE':
            return { ...state, loading: false, error: null, selected: action.payload }
        case 'REMOVE_ONE':
            return { ...state, loading: false, error: null/*, removed: action.payload*/ }
        case 'SAVE_ONE':
            return { ...state, loading: false, error: null, saved: action.payload }
        case 'ERROR':
            return { loading: false, error: action.payload, data: [] }
        default:
            return state
    }
}

export const TagModelProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tagReducer, initialStateMap)

    const load = async (filters = {}) => {
        dispatch({ type: 'LOADING' })
        const dataSource = filters.source || 'core'
        const typeDispatch = dataSource === 'core' ? 'FETCH_LIST' : 'FETCH_SUPPORT_LIST'
        
        try {
            if (typeof filters.tagSomeID === 'boolean' && filters.tagSomeID === true) {
                return dispatch({
                    type: typeDispatch, payload: await tagService.getTag(filters.tagSomeID)
                })
            } else if (typeof filters.tagSomeID === 'number') {
                return dispatch({
                    type: 'FETCH_ONE', payload: await tagService.getTag(filters.tagSomeID)
                })
            } else if (filters.tagsNotRelation) {

                if (typeof filters.tagsNotRelation.notRelationID === 'number' && typeof filters.tagsNotRelation.notRelationModel === 'string') {                    
                    const notRelation = filters.tagsNotRelation
                    const notRelationModel = notRelation.notRelationModel

                    return dispatch({
                        type: typeDispatch, payload: notRelationModel === 'goal' ?
                            await tagService.getTagNotGoal(notRelation.notRelationID) : await tagService.getTagNotAssignment(notRelation.notRelationID)
                    })  
                }
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
        //if necessary check the results of state - 
        console.log('TAG provider - ', state)
    }, [state])

    return (
        <TagModelContext.Provider value={{ ...state, refetch: load, remove, save }}>
            {children}
        </TagModelContext.Provider>
    )
}

export const useTagModel = () => useContext(TagModelContext)