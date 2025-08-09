import { useReducer, useEffect, createContext, useContext } from 'react'

import * as tagService from '../../services/tagService.js'

import { initialStateMap } from '../../utils/mapping/mappingUtilsProvider.js'

export const TagModelContext = createContext()

const tagReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true, error: null }
        case 'FETCH_LIST':
            return { ...state, loading: false, error: null, data: action.payload }
        case 'FETCH_ONE':
            return { ...state, loading: false, error: null, selected: action.payload }
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

        try {
            if (typeof filters.tagSomeID === 'boolean' && filters.tagSomeID === true) {
                return dispatch({
                    type: 'FETCH_LIST', payload: await tagService.getTag(filters.tagSomeID)
                })
            } else if (typeof filters.tagSomeID === 'number') {
                return dispatch({
                    type: 'FETCH_ONE', payload: await tagService.getTag(filters.tagSomeID)
                })
            } else if (filters.tagsRelation) {
                return dispatch({
                    type: 'FETCH_LIST', payload: []//tagService.getAssignmentOnGoal(filters.tagsRelation)
                })
            } else if (filters.assignmentTagRelation) {
                // return dispatch({
                //     type: 'FETCH_LIST', payload: await tagService.getAssignmentOnTag(filters.assignmentTagRelation)
                // })
            } else if (filters.notGoalRelation) {
                // return dispatch({
                //     type: 'FETCH_LIST', payload: await tagService.getAssignmentWithoutGoal(filters.notGoalRelation)
                // })       
            }

        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }
    
    useEffect(() => {
        //if necessary check the results of state - 
        console.log('TAG PROVIDER - ', state)
    }, [state])

    return (
        <TagModelContext.Provider value={{ ...state, refetch: load }}>
            {children}
        </TagModelContext.Provider>
    )
}

export const useTagModel = () => useContext(TagModelContext)