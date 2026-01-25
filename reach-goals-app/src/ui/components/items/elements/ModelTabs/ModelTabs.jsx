import { useState, useContext } from 'react'

import { ManageModelContext } from '../../../../../provider/ManageModelProvider.jsx'

import { filterBuildModelMap, modelTabsMap } from '../../../../../utils/mapping/mappingUtils.js'
import { updateFilterModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'
import Loading from '../Loading/Loading.jsx'

import Proptypes from 'prop-types'

import './ModelTabs.scss'

const ModelTabs = ({ type, children, loading }) => {
    const { updateFilterModel } = useContext(ManageModelContext)

    const [currentFilterData, setCurrentFilterData] = useState({
        assignment: {},
        goal: {},
        tag: {}
    })

    const handleFilterUpdate = (filterObject, type, scope) => {
        if (!filterObject || !type || !scope) return console.error('To update the filter model is necessary a filterObject, type and scope')
        return updateFilterModelMap(filterObject, type, scope)   
    }

    const filterButtonActive = currentFilterData[type] ?
        Object.entries(currentFilterData[type]).find(([_, value]) => value === 'all')?.[0]
        : null

    const handleFilterClick = (currentfilter) => {
        if (type === 'goal') {
            const filterGetGoal = filterBuildModelMap({ ...currentfilter }, 'goal', 'core')
            updateFilterModel(
                handleFilterUpdate(filterGetGoal, 'goal', 'page')
            )
        }

        if (type === 'assignment') {
            const filterGetAssignment = filterBuildModelMap({ ...currentfilter }, 'assignment', 'core')
            updateFilterModel(
                handleFilterUpdate(filterGetAssignment, 'assignment', 'page')
            )
        }

        if (type === 'tag') {
            const filterGetTag = filterBuildModelMap({ ...currentfilter }, 'tag', 'core')
            updateFilterModel(
                handleFilterUpdate(filterGetTag, 'tag', 'modal')
            )
        }

        setCurrentFilterData(() => ({
            [type]: { ...currentfilter }
        }))
    }

    return (
        <div className={`model-tabs ${type}`}>
            <div className='head'>
                <div className='options-sections'>
                    {
                        modelTabsMap[type]?.map((tab, index) => {
                            const currentButton = Object.keys(tab.currentfilter)[0]
                            const isNullFilter = !filterButtonActive && tab.label.includes('every')

                            return <ButtonAction key={index} classBtn={`button-action plan-round max-width small model-tabs 
                            ${currentButton === filterButtonActive ? 'active' : isNullFilter ? 'active' : ''}`}
                                title={tab.label} onClick={(e) => { handleFilterClick(tab.currentfilter) }} />
                        })
                    }
                </div>
            </div>
            <div className='body scrollable'>
                {loading && <Loading mode='block' />}
                {children}
            </div>
        </div>
    )
}

ModelTabs.propTypes = {
    type: Proptypes.string.isRequired,
    children: Proptypes.element.isRequired,
    loading: Proptypes.bool.isRequired
}

export default ModelTabs