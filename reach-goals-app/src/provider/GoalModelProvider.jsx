import { useReducer, useEffect, createContext, useContext } from 'react'

import * as goalService from '../services/goalService.js'

export const GoalModelContext = createContext()

const initialState = {
    loading: false,
    error: null,
    data: []
}

const goalReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true, error: null }
        case 'SUCCESS':
            return { loading: false, error: null, data: action.payload }
        case 'ERROR':
            return { loading: false, error: action.payload, data: [] }
        default:
            return state
    }
}

export const GoalModelProvider = ({ children, initialFilters = {} }) => {
    const [state, dispatch] = useReducer(goalReducer, initialState)

    const loadGoals = async (filters = {}) => {
        dispatch({ type: 'LOADING' })
        try {
            let data = []

            if (filters.goalSomeID) {
                data = await goalService.getGoal(filters.goalSomeID)
            } else if (filters.goalAssignmentRelation) {
                data = await goalService.getGoalOnAssignment(filters.goalAssignmentRelation)
            } else if (filters.goalTagRelation) {
                data = await goalService.getGoalOnTag(filters.goalTagRelation)
            } else if (filters.notAssignmentRelation) {
                data = await goalService.getGoalWithoutAssignment(filters.notAssignmentRelation)
            }

            dispatch({ type: 'SUCCESS', payload: data })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }

    useEffect(() => {
        loadGoals()
    }, [])

    useEffect(() => {
        //if necessary check the results of state - console.log(state)
    }, [state])

    return (
        <GoalModelContext.Provider value={{ ...state, refetch: loadGoals }}>
            {children}
        </GoalModelContext.Provider>
    )
}

export const useGoalModel = () => useContext(GoalModelContext)