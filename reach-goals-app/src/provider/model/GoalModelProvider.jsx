import { useReducer, useEffect, createContext, useContext } from 'react'

import * as goalService from '../../services/goalService.js'

import { initialStateMap } from '../../utils/mapping/mappingUtilsProvider.js'

export const GoalModelContext = createContext()

const goalReducer = (state, action) => {
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

export const GoalModelProvider = ({ children }) => {
    const [state, dispatch] = useReducer(goalReducer, initialStateMap)

    const load = async (filters = {}) => {
        dispatch({ type: 'LOADING' })

        try {
            if (typeof filters.goalSomeID === 'boolean' && filters.goalSomeID === true) {
                return dispatch({
                    type: 'FETCH_LIST', payload: await goalService.getGoal(filters.goalSomeID)
                })
            } else if (typeof filters.goalSomeID === 'number') {
                return dispatch({
                    type: 'FETCH_ONE', payload: await goalService.getGoal(filters.goalSomeID)
                })
            } else if (filters.goalAssignmentRelation) {
                return dispatch({
                    type: 'FETCH_LIST', payload: await goalService.getGoalOnAssignment(filters.goalAssignmentRelation)
                })
            } else if (filters.goalTagRelation) {
                return dispatch({
                    type: 'FETCH_LIST', payload: await goalService.getGoalOnTag(filters.goalTagRelation)
                })
            } else if (filters.notAssignmentRelation) {
                return dispatch({
                    type: 'FETCH_LIST', payload: await goalService.getGoalWithoutAssignment(filters.notAssignmentRelation)
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
                    type: 'REMOVE_ONE', payload: await goalService.deleteGoal(id)
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
                    type: 'SAVE_ONE', payload: saveModel === 'update' ? await goalService.updateGoal(model) : await goalService.addGoal(model)
                })
            }
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }

    useEffect(() => {
        //if necessary check the results of state - 
        console.log('GOAL provider - ', state)
    }, [state])

    return (
        <GoalModelContext.Provider value={{ ...state, refetch: load, remove, save }}>
            {children}
        </GoalModelContext.Provider>
    )
}

export const useGoalModel = () => useContext(GoalModelContext)