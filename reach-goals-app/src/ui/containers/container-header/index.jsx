import { useManageModel } from '../../../provider/model/manage-model-provider'
import { useVisibility } from '../../../provider/ui/visibility-provider'
import { useTitle } from '../../../provider/ui/title-provider'

import { visibilityMap, switchLayoutMap } from '../../../utils/mapping/mappingUtils.js'

import { cx } from '../../../utils/utils.js'

import ButtonAction from '../../items/elements/button-action'
import ButtonDropdown from '../../items/elements/button-dropdown'
import SearchBar from '../../items/elements/search-bar'
import Tooltip from '../../items/elements/tooltip'

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
                    <SearchBar mode='service' placeholder='search an activity' tooltip='Search activities' />
                </div>
                <div className='item-nav'>
                    <Tooltip title='Tags panel'>
                        <ButtonAction
                            onClick={linkTagClick} visibility={visibilityMap(['modal-right', 'tag'])}
                            switchLayout={switchLayoutMap({ area: 'modal', layout: { modalName: 'modal-right', layoutName: 'tag' } })}
                            classBtn='circle tag' icon='tag'
                        />
                    </Tooltip>
                </div>
                <div className='item-nav'>
                    <Tooltip title='Themes'>
                        <ButtonDropdown visibility={visibilityMap('btn-themes')} icon='themes'
                            classBtn={buttonDropdownClass} classBtnAction='circle' />
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default ContainerHeader
