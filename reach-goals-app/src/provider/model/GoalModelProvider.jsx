import { useReducer, useEffect, createContext, useContext } from 'react'

import * as goalService from '../../services/goalService.js'

import { reduceModelMap, initialStateMap } from '../../utils/mapping/mappingUtilsProvider.js'

export const GoalModelContext = createContext()

export const GoalModelProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reduceModelMap, initialStateMap)

    const load = async (filters = {}) => {
        dispatch({ type: 'LOADING' })
        const dataSource = filters.source || 'core'
        const typeDispatch = dataSource === 'core' ? 'FETCH_LIST' : 'FETCH_SUPPORT_LIST'

        try {
            if (typeof filters.goalSomeID === 'boolean' && filters.goalSomeID === true) {
                return dispatch({
                    type: typeDispatch, payload: await goalService.getGoal(filters.goalSomeID)
                })
            } else if (typeof filters.goalSomeID === 'number') {
                return dispatch({
                    type: 'FETCH_ONE', payload: await goalService.getGoal(filters.goalSomeID)
                })
            } else if (filters.goalAssignmentRelation) {
                return dispatch({
                    type: typeDispatch, payload: await goalService.getGoalOnAssignment(filters.goalAssignmentRelation)
                })
            } else if (filters.goalTagRelation) {
                return dispatch({
                    type: typeDispatch, payload: await goalService.getGoalOnTag(filters.goalTagRelation)
                })
            } else if (filters.notAssignmentRelation) {
                return dispatch({
                    type: typeDispatch, payload: await goalService.getGoalWithoutAssignment(filters.notAssignmentRelation)
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