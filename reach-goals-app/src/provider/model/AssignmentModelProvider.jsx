import { useReducer, useEffect, createContext, useContext } from 'react'

import * as assignmentService from '../../services/assignmentService.js'

import { reduceModelMap, initialStateMap, filterServiceFnMap } from '../../utils/mapping/mappingUtilsProvider.js'

export const AssignmentModelContext = createContext()

export const AssignmentModelProvider = ({ children }) => {
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
                const typeDispatch = keyFilter === 'assignmentSomeID' && typeof valueFilter === 'number' ? 'FETCH_ONE'
                    : dataSource === 'core' ? 'FETCH_LIST' : 'FETCH_SUPPORT_LIST'

                dispatch({
                    type: typeDispatch, payload: await assignmentService[filterServiceFnMap[keyFilter]](valueFilter)
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