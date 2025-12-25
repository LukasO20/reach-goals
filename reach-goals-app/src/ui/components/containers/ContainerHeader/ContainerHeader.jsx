import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'

import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'

import { targetMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonDropdown from '../../items/elements/ButtonDropdown/ButtonDropdown.jsx'

import './ContainerHeader.scss'

const ContainerH = () => {
    const { title } = useTitle()
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { setModel, resetManageModel } = useContext(ManageModelContext)
    const { layoutComponent } = useSwitchLayout()
    const navigate = useNavigate()

    const linkTagClick = (e) => {
        if (e) setModel(prev => ({ ...prev, typeModel: 'tag' }))
    }

    const handleClickHeader = (e) => {
        toggleVisibility(targetMap(null), e)
        resetManageModel()
        navigate(`/${layoutComponent.page}`) // return standard route during handle
    }

    return (
        <div className='container-header main-content' onClick={(e) => handleClickHeader(e)}>
            <div className='titles-header'>
                <h1>{title.header}</h1>
            </div>
            <div className='nav'>
                <div className='item-nav'>
                    <ButtonAction onClick={linkTagClick} target={targetMap(['modal-right', 'tag'])}
                        switchLayout={switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'tag' })}
                        classBtn='button-link circle tag' icon='tag'
                    />
                </div>
                <div className='item-nav'>
                    <ButtonDropdown target={targetMap('btn-themes')} icon='themes'
                        classBtn={`circle themes ${visibleElements.includes('btn-themes') ? 'active' : ''}`} />
                </div>
            </div>
        </div>
    )
}

export default ContainerH
