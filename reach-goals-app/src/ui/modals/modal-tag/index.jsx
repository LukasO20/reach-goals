import { useNavigate } from 'react-router-dom'

import { useVisibility } from '../../../provider/ui/visibility-provider'
import { useManageModel } from '../../../provider/model/manage-model-provider'
import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'
import { useTagProvider } from '../../../provider/model/tag-model-provider'
import { useCheckbox } from '../../../provider/ui/checkbox-provider'

import { visibilityMap, buildCheckboxMap } from '../../../utils/mapping/mappingUtils.js'
import { resetManageModelMap } from '../../../utils/mapping/mappingUtilsProvider.js'

import { ModalFormWrapper } from '../modal-form/modal-form-wrapper'
import ButtonAction from '../../elements/button-action'
import ButtonCheckbox from '../../elements/button-checkbox'
import ModelTabs from '../../elements/model-tabs'
import RelationCard from '../../models/tag/components/relation-card'
import PopupModelOptions from '../../elements/popup-model-options'
import EmptyState from '../../elements/empty-state'

import emptyTagImg from '../../../assets/empty-tag.svg'

import { cx } from '../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').ModalTagProps} Props */

/**
 * @param {Props} props
 */
const ModalTag = ({ filterTabs, onFilterTabs }) => {
    const { visibleElements } = useVisibility()
    const { setModel, resetManageModel } = useManageModel()
    const { page: { data, loading } } = useTagProvider()
    const { data: { layout } } = useSwitchLayout()
    const { valuesCheckbox } = useCheckbox()
    const navigate = useNavigate()

    const hasSelectedModel = !!valuesCheckbox.modal?.selected.length

    const handleClickButtonAction = (e) => {
        if (e) setModel(prev => ({ ...prev, typeModel: 'config' }))
        navigate(`/${layout.page.pageName}`) // return standard route during handle   
    }

    const handleClickButtonActionCreate = () => {
        const resetKeys = resetManageModelMap(['activeModel'])
        resetManageModel(resetKeys)
    }

    const headLeftContent =
        hasSelectedModel ? (
            <ButtonCheckbox
                classBtn='checkbox-main'
                checkboxID='checkbox-tag'
                checkbox={buildCheckboxMap({ checkboxIDMain: 'checkbox-tag', scope: 'modal' })}
                title='Select all'
            />
        ) : null

    const isModalForm = ['tag', 'near-modalForm']
    const isLoading = !!loading
    const isEmptyData = !data?.length && !isLoading

    const content = (<>
        {!isLoading && isEmptyData && (
            <EmptyState
                title="There's nothing a tag yet"
                description='You can create a tag to classify your activities'
                imgSrc={emptyTagImg}
            />
        )}
        {!isLoading && !isEmptyData && (<RelationCard checkboxState={valuesCheckbox} data={data} />)}
    </>)

    const buttonCreateClass = cx(
        `create
        plan
        max-width
        ${isModalForm.every(e => visibleElements.includes(e)) && 'active'}
        `
    )

    const modelTabsClass = cx(
        `${isEmptyData && 'empty'}`
    )

    return (
        <>
            <div className='head'>
                <h2>Tags</h2>
                <ButtonAction
                    classBtn='circle close' 
                    icon='icon-close'
                    visibility={visibilityMap(null)}
                    onClick={handleClickButtonAction}
                />
                <div className='options'>
                    <ButtonAction
                        classBtn={buttonCreateClass}
                        onClick={handleClickButtonActionCreate}
                        visibility={visibilityMap('near-modalForm', { add: true })}
                        icon='icon-plus'
                        title='create'
                    />
                </div>
            </div>
            <div className='body'>
                {isModalForm.every(e => visibleElements.includes(e)) && (
                    <ModalFormWrapper />
                )}
                {hasSelectedModel && (
                    <PopupModelOptions type='pop-model' typeModelOptions='tag' onFilterTabs={onFilterTabs} />
                )}
                <ModelTabs 
                    type='tag' 
                    headLeftChildren={headLeftContent} 
                    loading={isLoading} 
                    filterTabs={filterTabs} 
                    onFilterTabs={onFilterTabs}
                    classModelTabs={modelTabsClass}
                >
                    {content}
                </ModelTabs>
            </div>
        </>
    )
}

export default ModalTag