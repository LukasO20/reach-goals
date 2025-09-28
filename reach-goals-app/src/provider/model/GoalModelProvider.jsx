import { useReducer, useEffect, createContext, useContext } from 'react'

import * as goalService from '../../services/goalService.js'

import { reduceModelMap, initialStateMap, filterServiceFnMap } from '../../utils/mapping/mappingUtilsProvider.js'

export const GoalModelContext = createContext()

export const GoalModelProvider = ({ children }) => {
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
                const typeDispatch = typeof valueFilter === 'number' ? 'FETCH_ONE' 
                    : dataSource === 'core' ? 'FETCH_LIST' : 'FETCH_SUPPORT_LIST'

                return dispatch({
                    type: typeDispatch, payload: await goalService[filterServiceFnMap[keyFilter]](valueFilter)
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