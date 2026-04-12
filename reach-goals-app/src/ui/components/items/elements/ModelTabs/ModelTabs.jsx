import React, { useState } from 'react'

import { modelTabsMap } from '../../../../../utils/mapping/mappingUtils.js'
import { buildFilterModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'
import Loading from '../Loading/Loading.jsx'

import './ModelTabs.scss'

export const ModelTabsMap = {
    type: '',
    classModelTabs: '',
    children: React.ReactNode,
    headLeftChildren: React.ReactNode,
    onFilterTabs: null,
    loading: false
}

/**
 * @param {Object} ModelTabsMap
 * @param {'goal'|'assignment'|'tag'} ModelTabsMap.type
 * @param {string} [ModelTabsMap.classModelTabs]
 * @param {React.ReactNode} ModelTabsMap.children
 * @param {React.ReactNode} [ModelTabsMap.headLeftChildren]
 * @param {boolean} ModelTabsMap.loading
 * @param {function} ModelTabsMap.onFilterTabs
 */

const ModelTabs = ({ type, classModelTabs, children, headLeftChildren, onFilterTabs, loading } = ModelTabsMap) => {
    const [currentFilterData, setCurrentFilterData] = useState({
        assignment: {},
        goal: {},
        tag: {}
    })

    const filterButtonActive = currentFilterData[type] ?
        Object.entries(currentFilterData[type]).find(([_, value]) => value === 'all')?.[0]
        : null

    const handleFilterClick = (filter) => {
        const filerKey = Object.keys(filter)[0]
        const filterValue = Object.values(filter)[0]
        const source = type === 'tag' ? 'modal' : 'page'

        onFilterTabs(buildFilterModelMap(type, filerKey, source, filterValue))

        setCurrentFilterData(() => ({
            [type]: { ...filter }
        }))
    }

    return (
        <div className={`model-tabs ${type} ${classModelTabs}`}>
            <div className='head'>
                {headLeftChildren}
                <div className='options-sections'>
                    {
                        modelTabsMap[type]?.map((tab, index) => {
                            const currentButton = Object.keys(tab.filter)[0]
                            const isNullFilter = !filterButtonActive && tab.label.includes('every')

                            return (
                                <ButtonAction
                                    key={index}
                                    classBtn={`button-action plan-round max-width small model-tabs 
                                        ${currentButton === filterButtonActive ? 'active' : isNullFilter ? 'active' : ''}`}
                                    title={tab.label}
                                    onClick={() => { handleFilterClick(tab.filter) }}
                                />
                            )
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

export default ModelTabs