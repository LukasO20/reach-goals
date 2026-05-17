import { useManageModel } from '../../../provider/model/manage-model-provider'
import { useVisibility } from '../../../provider/ui/visibility-provider'
import { useTitle } from '../../../provider/ui/title-provider'

import { visibilityMap, switchLayoutMap } from '../../../utils/mapping/mappingUtils.js'

import { cx } from '../../../utils/utils.js'

import ButtonAction from '../../items/elements/button-action/index.jsx'
import ButtonDropdown from '../../items/elements/button-dropdown/index.jsx'
import SearchBar from '../../items/elements/search-bar/index.jsx'

import './style.scss'

const ContainerHeader = () => {
    const { title } = useTitle()
    const { visibleElements } = useVisibility()
    const { setModel } = useManageModel()

    const linkTagClick = (e) => {
        if (e) setModel(prev => ({ ...prev, typeModel: 'tag' }))
    }

    const buttonDropdownClass = cx(
        `
        circle
        themes
        ${visibleElements.includes('btn-themes') && 'active'}
        `
    )

    return (
        <div className='container-header main-content'>
            <h1>{title.header}</h1>
            <div className='nav'>
                <div className='item-nav'>
                    <SearchBar mode='service' placeholder='search an activity' />
                </div>
                <div className='item-nav'>
                    <ButtonAction 
                        onClick={linkTagClick} visibility={visibilityMap(['modal-right', 'tag'])}
                        switchLayout={switchLayoutMap({ area: 'modal', layout: { modalName: 'modal-right', layoutName: 'tag' } })}
                        classBtn='circle tag' icon='tag'
                    />
                </div>
                <div className='item-nav'>
                    <ButtonDropdown visibility={visibilityMap('btn-themes')} icon='themes'
                        classBtn={buttonDropdownClass} classBtnAction='circle' />
                </div>
            </div>
        </div>
    )
}

export default ContainerHeader
