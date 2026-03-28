import { useNavigate } from 'react-router-dom'

import { useManageModel } from '../../../../provider/model/ManageModelProvider.jsx'
import { useVisibility } from '../../../../provider/ui/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../provider/ui/SwitchLayoutProvider.jsx'
import { useTitle } from '../../../../provider/ui/TitleProvider.jsx'

import { visibilityMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'

import { cx } from '../../../../utils/utils.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonDropdown from '../../items/elements/ButtonDropdown/ButtonDropdown.jsx'
import SearchBar from '../../items/elements/SearchBar/SearchBar.jsx'

import './ContainerHeader.scss'

const ContainerH = () => {
    const { title } = useTitle()
    const { visibleElements, toggleVisibility } = useVisibility()
    const { setModel, resetManageModel } = useManageModel()
    const { layout } = useSwitchLayout()
    const navigate = useNavigate()

    const linkTagClick = (e) => {
        if (e) setModel(prev => ({ ...prev, typeModel: 'tag' }))
    }

    const handleClickHeader = (e) => {
        toggleVisibility(visibilityMap(null), e)
        resetManageModel()
        navigate(`/${layout.page.pageName}`) // return standard route during handle
    }

    const buttonDropdownClass = cx(
        `
        circle
        themes
        ${visibleElements.includes('btn-themes') && 'active'}
        `
    )

    return (
        <div className='container-header main-content' onClick={(e) => handleClickHeader(e)}>
            <div className='titles-header'>
                <h1>{title.header}</h1>
            </div>
            <div className='nav'>
                <div className='item-nav'>
                    <SearchBar mode='service' placeholder='search an activity' />
                </div>
                <div className='item-nav'>
                    <ButtonAction onClick={linkTagClick} visibility={visibilityMap(['modal-right', 'tag'])}
                        switchLayout={switchLayoutMap({ area: 'modal', state: { modalName: 'modal-right', layoutName: 'tag' } })}
                        classBtn='circle tag' icon='tag'
                    />
                </div>
                <div className='item-nav'>
                    <ButtonDropdown visibility={visibilityMap('btn-themes')} icon='themes'
                        classBtn={buttonDropdownClass} />
                </div>
            </div>
        </div>
    )
}

export default ContainerH
