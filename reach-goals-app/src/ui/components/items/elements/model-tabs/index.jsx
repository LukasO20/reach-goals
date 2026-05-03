import { useSwitchLayout } from '../../../../../provider/ui/switch-layout-provider.jsx'

import { modelTabsMap } from '../../../../../utils/mapping/mappingUtils.js'
import { buildFilterModelMap } from '../../../../../utils/mapping/mappingUtilsProvider.js'

import { cx } from '../../../../../utils/utils.js'

import ButtonAction from '../button-action'
import Loading from '../loading'

import './style.scss'

/** @typedef {import('./types.js').ModelTabsProps} Props */

/**
 * @param {Props} props
 */
const ModelTabs = ({ type, classModelTabs, children, headLeftChildren, filterTabs, onFilterTabs, loading }) => {
    const { data: { visibility } } = useSwitchLayout()

    const filterButtonActive = filterTabs ?
        Object.entries(filterTabs[type]).find(([, data]) => data.page === 'all' || data.modal === 'all')?.[0]
        : null

    const columnsUserConfig = type !== 'tag' ? visibility.columns : null

    const modelTabsClass = cx(`
        model-tabs
        ${columnsUserConfig}
        ${type}
        ${classModelTabs}
        `)

    const handleFilterClick = (filter) => {
        const filerKey = Object.keys(filter)[0]
        const filterValue = Object.values(filter)[0]
        const source = type === 'tag' ? 'modal' : 'page'

        onFilterTabs(buildFilterModelMap(type, filerKey, source, filterValue))
    }

    const buttonActionClass = cx(`
        plan-round 
        max-width 
        small 
        model-tabs
        `)

    return (
        <div className={modelTabsClass}>
            <div className='head'>
                {headLeftChildren}
                <div className='options-sections'>
                    {
                        modelTabsMap[type]?.map((tab, index) => {
                            const currentButton = Object.keys(tab.filter)[0]
                            const isNullFilter = !filterButtonActive && tab.label.includes('every')
                            const activeButton = currentButton === filterButtonActive ? 'active' : isNullFilter ? 'active' : ''

                            return (
                                <ButtonAction
                                    key={index}
                                    classBtn={`${buttonActionClass} ${activeButton}`}
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