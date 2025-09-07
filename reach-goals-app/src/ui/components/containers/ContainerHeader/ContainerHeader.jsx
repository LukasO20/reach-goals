import { useContext } from 'react'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'

import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'
import { useTitle } from '../../../../provider/TitleProvider.jsx'

import { targetMap, switchLayoutMap } from '../../../../utils/mapping/mappingUtils.js'

import ButtonLink from '../../items/elements/ButtonLink/ButtonLink.jsx'

const ContainerH = () => {
    const { title } = useTitle()
    const { toggleVisibility } = useContext(VisibilityContext)
    const { setModel } = useContext(ManageModelContext)
    const { layoutComponent } = useSwitchLayout()

    const linkTagClick = (event) => {
        if (event) setModel(prev => ({ ...prev, typeModel: 'tag' }))
    }

    return (
        <div className="container-header main-content" onClick={(e) => toggleVisibility(targetMap(), e)}>
            <div className="titles-header">
                <h1>{title}</h1>
            </div>
            <div className="nav">
                <div className="item-nav" onClick={(e) => { toggleVisibility(targetMap(['panel-right', 'tag']), e); linkTagClick(e) }}>
                    <ButtonLink id="btn-tag" switchLayout={switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'right' })}
                        link={`/${layoutComponent.page}/tag`} classBtn="button-h tag" icon="tag"
                    />
                </div>
                <div className='item-nav'>
                    <ButtonLink id="btn-theme" classBtn="button-h theme" icon="themes" />
                </div>
            </div>
        </div>
    )
}

export default ContainerH
