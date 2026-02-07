import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { useTitle } from '../../../../provider/TitleProvider.jsx'

import { visibilityMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonDropdown from '../../items/elements/ButtonDropdown/ButtonDropdown.jsx'

import './ContainerHeader.scss'
import SearchBar from '../../items/elements/SearchBar/SearchBar.jsx'

const ContainerH = () => {
    const { title } = useTitle()
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { setModel, resetManageModel } = useContext(ManageModelContext)
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
                        classBtn='button-link circle tag' icon='tag'
                    />
                </div>
                <div className='item-nav'>
                    <ButtonDropdown visibility={visibilityMap('btn-themes')} icon='themes'
                        classBtn={`circle themes ${visibleElements.includes('btn-themes') ? 'active' : ''}`} />
                </div>
            </div>
        </div>
    )
}

export default ContainerH
