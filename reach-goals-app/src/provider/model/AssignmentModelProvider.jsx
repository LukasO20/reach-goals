import { useReducer, useEffect, createContext, useContext } from 'react'

import * as assignmentService from '../../services/assignmentService.js'

import { reduceModelMap, initialStateMap } from '../../utils/mapping/mappingUtilsProvider.js'

export const AssignmentModelContext = createContext()

export const AssignmentModelProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reduceModelMap, initialStateMap)

    const load = async (filters = {}) => {
        dispatch({ type: 'LOADING' })
        const dataSource = filters.source || 'core'
        const typeDispatch = dataSource === 'core' ? 'FETCH_LIST' : 'FETCH_SUPPORT_LIST'

        try {
            if (typeof filters.assignmentSomeID === 'boolean' && filters.assignmentSomeID === true) {
                return dispatch({
                    type: typeDispatch, payload: await assignmentService.getAssignment(filters.assignmentSomeID)
                })
            } else if (typeof filters.assignmentSomeID === 'number') {
                return dispatch({
                    type: 'FETCH_ONE', payload: await assignmentService.getAssignment(filters.assignmentSomeID)
                })
            } else if (filters.assignmentGoalRelation) {
                return dispatch({
                    type: typeDispatch, payload: await assignmentService.getAssignmentOnGoal(filters.assignmentGoalRelation)
                })
            } else if (filters.assignmentTagRelation) {
                return dispatch({
                    type: typeDispatch, payload: await assignmentService.getAssignmentOnTag(filters.assignmentTagRelation)
                })
            } else if (filters.notGoalRelation) {
                return dispatch({
                    type: typeDispatch, payload: await assignmentService.getAssignmentWithoutGoal(filters.notGoalRelation)
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
                    type: 'REMOVE_ONE', payload: await assignmentService.deleteAssignment(id)
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
                    type: 'SAVE_ONE', payload: saveModel === 'update' ? await assignmentService.updateAssignment(model) : await assignmentService.addAssignment(model)
                })
            }
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }

    useEffect(() => {
        //if necessary check the results of state - 
        console.log('ASSIGNMENT provider - ', state)
    }, [state])

    return (
        <AssignmentModelContext.Provider value={{ ...state, refetch: load, remove, save }}>
            {children}
        </AssignmentModelContext.Provider>
    )
}

export const useAssignmentModel = () => useContext(AssignmentModelContext)