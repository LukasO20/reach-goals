import { useReducer, useEffect, createContext, useContext } from 'react'

import * as assinmentService from '../services/assignmentService.js'

import { initialStateMap } from '../utils/mapping/mappingUtilsProvider.js'

export const AssignmentModelContext = createContext()

const assignmentReducer = (state, action) => {
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

export const AssignmentModelProvider = ({ children }) => {
    const [state, dispatch] = useReducer(assignmentReducer, initialStateMap)

    const load = async (filters = {}) => {
        dispatch({ type: 'LOADING' })

        try {
            if (typeof filters.assignmentSomeID === 'boolean' && filters.assignmentSomeID === true) {
                return dispatch({
                    type: 'FETCH_LIST', payload: await assinmentService.getAssignment(filters.assignmentSomeID)
                })
            } else if (typeof filters.assignmentSomeID === 'number') {
                return dispatch({
                    type: 'FETCH_ONE', payload: await assinmentService.getAssignment(filters.assignmentSomeID)
                })
            } else if (filters.assignmentGoalRelation) {
                return dispatch({
                    type: 'FETCH_LIST', payload: await assinmentService.getAssignmentOnGoal(filters.assignmentGoalRelation)
                })
            } else if (filters.assignmentTagRelation) {
                return dispatch({
                    type: 'FETCH_LIST', payload: await assinmentService.getAssignmentOnTag(filters.assignmentTagRelation)
                })
            } else if (filters.notGoalRelation) {
                return dispatch({
                    type: 'FETCH_LIST', payload: await assinmentService.getAssignmentWithoutGoal(filters.notGoalRelation)
                })       
            }

        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        //if necessary check the results of state - 
        console.log('ASSIGNMENT PROVIDER - ', state)
    }, [state])

    return (
        <AssignmentModelContext.Provider value={{ ...state, refetch: load }}>
            {children}
        </AssignmentModelContext.Provider>
    )
}

export const useAssignmentModel = () => useContext(AssignmentModelContext)