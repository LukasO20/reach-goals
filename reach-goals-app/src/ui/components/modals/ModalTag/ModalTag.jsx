import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useVisibility } from '../../../../provider/ui/VisibilityProvider.jsx'
import { useManageModel } from '../../../../provider/model/ManageModelProvider.jsx'
import { useSwitchLayout } from '../../../../provider/ui/SwitchLayoutProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'
import { useCheckbox } from '../../../../provider/ui/CheckboxProvider.jsx'

import { visibilityMap, switchLayoutMap, filterBuildModelMap, buildCheckboxMap } from '../../../../utils/mapping/mappingUtils.js'
import { updateFilterModelMap, resetManageModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import ModalForm from '../ModalForm/ModalForm.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonCheckbox from '../../items/elements/ButtonCheckbox/ButtonCheckbox.jsx'
import ModelTabs from '../../items/elements/ModelTabs/ModelTabs.jsx'
import TagRelationCard from '../../items/models/Tag/TagRelationCard.jsx'
import PopupModelOptions from '../../items/elements/PopupModelOptions/PopupModelOptions.jsx'

import { cx } from '../../../../utils/utils.js'

import './ModalTag.scss'

const ModalTag = () => {
    const { visibleElements } = useVisibility()
    const { model, setModel, updateFilterModel, resetManageModel } = useManageModel()
    const { modal: { loading } } = useTagProvider()
    const { layout } = useSwitchLayout()
    const { valuesCheckbox } = useCheckbox()
    const navigate = useNavigate()

    const hasSelectedModel = !!valuesCheckbox.modal?.selected.length

    const handleClickButtonAction = (e) => {
        if (e) setModel(prev => ({ ...prev, typeModel: 'config' }))
        navigate(`/${layout.page.pageName}`) // return standard route during handle   
    }

    const handleClickButtonActionCreate = () => {
        const resetKeys = resetManageModelMap(['formModel'])
        resetManageModel(resetKeys)
    }

    useEffect(() => {
        const filter = filterBuildModelMap({
            tagSomeID: 'all', type: 'tag', source: 'core'
        }, 'tag', 'core')
        const dataFilter = updateFilterModelMap({ filter, model: 'tag', scope: 'modal' })

        updateFilterModel(dataFilter)
    }, [updateFilterModel])

    const content = <TagRelationCard checkboxState={valuesCheckbox} />
    
    const headLeftContent = hasSelectedModel ? (
        <ButtonCheckbox classBtn='checkbox-main tag' checkboxID='checkbox-tag'
            checkbox={buildCheckboxMap({ checkboxIDMain: 'checkbox-tag', scope: 'modal' })}
            title='Select all'
        />
    ) : null

    const isModalForm = ['tag', 'near-modalForm']
    const isLoadingTag = !!loading && !model.mainModelID

    const buttonCreateClass = cx(
        `create
        plan
        max-width
        ${isModalForm.every(e => visibleElements.includes(e)) && 'active'}
        `
    )

    return (
        <>
            <div className='head'>
                <h2>Tags</h2>
                <ButtonAction visibility={visibilityMap(null)} onClick={handleClickButtonAction} classBtn='button-action circle close' icon='close' />
                <div className='options'>
                    <ButtonAction
                        onClick={handleClickButtonActionCreate}
                        visibility={visibilityMap('near-modalForm', { add: true })}
                        classBtn={buttonCreateClass} 
                        icon='plus' 
                        title='create' 
                    />
                    <ButtonAction
                        classBtn='circle max-width config'
                        icon='config' 
                        onClick={(e) => handleClickButtonAction(e)}
                        visibility={visibilityMap(['modal-center', 'config'])}
                        switchLayout={switchLayoutMap({ area: 'modal', state: { modalName: 'modal-center', layoutName: 'config' } })}
                    />
                </div>
            </div>
            <div className='body'>
                {isModalForm.every(e => visibleElements.includes(e)) && <ModalForm type='tag' />}
                <ModelTabs type='tag' children={content} headLeftChildren={headLeftContent} loading={isLoadingTag} />
                {hasSelectedModel && (<PopupModelOptions type='tag' />)}
            </div>
        </>
    )
}

export default ModalTag