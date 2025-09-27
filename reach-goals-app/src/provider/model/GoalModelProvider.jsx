import { useReducer, useEffect, createContext, useContext } from 'react'

import * as goalService from '../../services/goalService.js'

import { reduceModelMap, initialStateMap, filterServiceFnMap } from '../../utils/mapping/mappingUtilsProvider.js'

export const GoalModelContext = createContext()

export const GoalModelProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reduceModelMap, initialStateMap)

    const load = async (filters = {}) => {
        dispatch({ type: 'LOADING' })
        const dataSource = filters.source || 'core'
        const typeDispatch = dataSource === 'core' ? 'FETCH_LIST' : 'FETCH_SUPPORT_LIST'
        const useFilter = Object.entries(filters).filter(filter => typeof filter[1] === 'number')[0]

        try {
            //Filter object has valid value to filter
            if (useFilter) {
                const keyFilter = useFilter[0]
                const valueFilter = useFilter[1]
                const choseDispatch = keyFilter === 'goalSomeID' ? 'FETCH_ONE' : 'FETCH_LIST'

                return dispatch({
                    type: choseDispatch, payload: await goalService[filterServiceFnMap[keyFilter]](valueFilter)
                })
            }
            //Filter object hasn't value to filter
            else {
                return dispatch({
                    type: typeDispatch, payload: await goalService.getGoal(filters.goalSomeID)
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