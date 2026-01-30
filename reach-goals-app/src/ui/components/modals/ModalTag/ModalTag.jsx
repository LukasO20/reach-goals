import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'

import { visibilityMap, switchLayoutMap, filterBuildModelMap } from '../../../../utils/mapping/mappingUtils.js'
import { updateFilterModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import ModalForm from '../ModalForm/ModalForm.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ModelTabs from '../../items/elements/ModelTabs/ModelTabs.jsx'
import TagRelationCard from '../../items/models/Tag/TagRelationCard.jsx'

const ModalTag = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const { setModel, updateFilterModel } = useContext(ManageModelContext)
    const { modal: { data = [], loading: loadingTag } } = useTagProvider()    
    const { layout } = useSwitchLayout()
    const navigate = useNavigate()

    const isModalForm = ['tag', 'near-modalForm']

    const handleClickButtonAction = (e) => {
        if (e) setModel(prev => ({ ...prev, typeModel: 'config' }))
        navigate(`/${layout.page.pageName}`) // return standard route during handle   
    }

    useEffect(() => {
        const filter = filterBuildModelMap({
            tagSomeID: 'all', type: 'tag', source: 'core'
        }, 'tag', 'core')
        const dataFilter = updateFilterModelMap({ filter, model: 'tag', scope: 'modal' })
        
        updateFilterModel(dataFilter)
    }, [updateFilterModel])

    const content = <TagRelationCard tagRelation={data} />

    return (
        <>
            <div className='head'>
                <h2>Tags</h2>
                <ButtonAction visibility={visibilityMap(null)} onClick={handleClickButtonAction} classBtn='button-action circle close' icon='close' />
                <div className='options'>
                    <ButtonAction visibility={visibilityMap('near-modalForm', { add: true })}
                        classBtn={`button-action create plan max-width ${isModalForm.every(e => visibleElements.includes(e)) ? 'active' : ''}`} icon='plus' title='create' />
                    <ButtonAction classBtn='button-action circle max-width config'
                        icon='config' onClick={(e) => handleClickButtonAction(e)}
                        visibility={visibilityMap(['modal-center', 'config'])}
                        switchLayout={switchLayoutMap({ area: 'modal', state: { modalName: 'modal-center', layoutName: 'config' } })}
                    />
                </div>
            </div>
            <div className='body'>
                {isModalForm.every(e => visibleElements.includes(e)) && <ModalForm type='tag' />}
                <ModelTabs type='tag' children={content} loading={loadingTag} />
            </div>
        </>
    )
}

export default ModalTag