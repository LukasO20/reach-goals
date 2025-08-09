import { useReducer, useEffect, createContext, useContext } from 'react'

import * as assignmentService from '../../services/assignmentService.js'

import { initialStateMap } from '../../utils/mapping/mappingUtilsProvider.js'

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
                    type: 'FETCH_LIST', payload: await assignmentService.getAssignment(filters.assignmentSomeID)
                })
            } else if (typeof filters.assignmentSomeID === 'number') {
                return dispatch({
                    type: 'FETCH_ONE', payload: await assignmentService.getAssignment(filters.assignmentSomeID)
                })
            } else if (filters.assignmentGoalRelation) {
                return dispatch({
                    type: 'FETCH_LIST', payload: await assignmentService.getAssignmentOnGoal(filters.assignmentGoalRelation)
                })
            } else if (filters.assignmentTagRelation) {
                return dispatch({
                    type: 'FETCH_LIST', payload: await assignmentService.getAssignmentOnTag(filters.assignmentTagRelation)
                })
            } else if (filters.notGoalRelation) {
                return dispatch({
                    type: 'FETCH_LIST', payload: await assignmentService.getAssignmentWithoutGoal(filters.notGoalRelation)
                })       
            }

        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }
    
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