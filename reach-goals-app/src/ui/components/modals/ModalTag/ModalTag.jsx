import { useNavigate } from 'react-router-dom'

import { useVisibility } from '../../../../provider/ui/VisibilityProvider.jsx'
import { useManageModel } from '../../../../provider/model/ManageModelProvider.jsx'
import { useSwitchLayout } from '../../../../provider/ui/SwitchLayoutProvider.jsx'
import { useTagProvider } from '../../../../provider/model/TagModelProvider.jsx'
import { useCheckbox } from '../../../../provider/ui/CheckboxProvider.jsx'

import { visibilityMap, switchLayoutMap, buildCheckboxMap } from '../../../../utils/mapping/mappingUtils.js'
import { resetManageModelMap } from '../../../../utils/mapping/mappingUtilsProvider.js'

import ModalForm from '../ModalForm/ModalForm.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonCheckbox from '../../items/elements/ButtonCheckbox/ButtonCheckbox.jsx'
import ModelTabs from '../../items/elements/ModelTabs/ModelTabs.jsx'
import TagRelationCard from '../../items/models/Tag/TagRelationCard.jsx'
import PopupModelOptions from '../../items/elements/PopupModelOptions/PopupModelOptions.jsx'

import { cx } from '../../../../utils/utils.js'

import './ModalTag.scss'

export const ModalTagMap = {
    onFilterTabs: null
}

/**
 * @param {Object} ModalTagMap
 * @param {function} ModalTagMap.onFilterTabs
 */

const ModalTag = ({ onFilterTabs } = ModalTagMap) => {
    const { visibleElements } = useVisibility()
    const { model, setModel, resetManageModel } = useManageModel()
    const { modal: { loading } } = useTagProvider()
    const { data: { layout } } = useSwitchLayout()
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
                <ModelTabs type='tag' headLeftChildren={headLeftContent} loading={isLoadingTag} onFilterTabs={onFilterTabs}>
                    {content}
                </ModelTabs>
                {hasSelectedModel && (<PopupModelOptions type='tag' />)}
            </div>
        </>
    )
}

export default ModalTag