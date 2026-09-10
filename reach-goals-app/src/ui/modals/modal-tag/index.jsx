import { useVisibility } from '../../../provider/ui/visibility-provider'
import { useTagProvider } from '../../../provider/model/tag-model-provider'
import { useCheckbox } from '../../../provider/ui/checkbox-provider'
import { useDemoSession } from '../../../provider/model/demo-session-provider'

import {
    visibilityMap,
    buildCheckboxMap,
} from '../../../utils/mapping/mappingUtils.js'
import { resetManageModelMap } from '../../../utils/mapping/mappingUtilsProvider.js'

import { ModalFormWrapper } from '../modal-form/modal-form-wrapper'
import ButtonAction from '../../elements/button-action'
import ButtonCheckbox from '../../elements/button-checkbox'
import ModelTabs from '../../elements/model-tabs'
import RelationCard from '../../models/tag/components/relation-card'
import PopupModelOptions from '../../elements/popup-model-options'
import EmptyState from '../../elements/empty-state'
import Tooltip from '../../elements/tooltip'

import emptyTagImg from '../../../assets/empty-tag.svg'

import { safeFilterTabs } from './defaults.js'
import { cx } from '../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').ModalTagProps} Props */

/**
 * @param {Props} props
 */
const ModalTag = ({
    type,
    modelID,
    setFilterModel,
    resetManageModel,
    filterTabs = safeFilterTabs,
    onFilterTabs,
}) => {
    const {
        visitor: { quotaModel },
    } = useDemoSession()
    const { visibleElements } = useVisibility()
    const {
        page: { data = [], loading },
    } = useTagProvider()
    const { valuesCheckbox } = useCheckbox()

    const hasSelectedModel = !!valuesCheckbox.modal.selected.length

    const handleClickButtonActionCreate = () => {
        const resetKeys = resetManageModelMap(['activeModel'])
        resetManageModel(resetKeys)
    }

    const headLeftContent = hasSelectedModel ? (
        <ButtonCheckbox
            classBtn='checkbox-main'
            checkboxID='checkbox-tag'
            checkbox={buildCheckboxMap({
                checkboxIDMain: 'checkbox-tag',
                scope: 'modal',
            })}
            title='Select all'
        />
    ) : null

    const isModalForm = ['tag', 'near-modalForm']
    const isLoading = !!loading
    const isEmptyData =
        !data.length &&
        !isLoading &&
        Object.keys(filterTabs.tag.page)[0] === 'tagSomeID'

    const content = (
        <>
            {!isLoading && isEmptyData && (
                <EmptyState
                    title="There's nothing a tag yet"
                    description='You can create a tag to classify your activities'
                    imgSrc={emptyTagImg}
                />
            )}
            {!isLoading && !isEmptyData && (
                <RelationCard checkboxState={valuesCheckbox} data={data} />
            )}
        </>
    )

    const buttonCreateClass = cx(
        `create
        plan
        max-width
        ${isModalForm.every((e) => visibleElements.includes(e)) && 'active'}
        ${quotaModel.quotaExceeded.tag && 'disable'}
        `
    )

    const modelTabsClass = cx(`${isEmptyData && 'empty'}`)

    return (
        <>
            <div className='head'>
                <h2>Tags</h2>
                <ButtonAction
                    classBtn='circle close'
                    icon='icon-close'
                    visibility={visibilityMap(null)}
                />
                <div className='options'>
                    <Tooltip
                        title={
                            quotaModel.quotaExceeded.tag
                                ? 'Quota Exceeded to create some tag'
                                : ''
                        }
                        positions={{
                            left: '0%',
                            top: 'calc(100% + 0.5rem)',
                            transform: 'translateX(-55%)',
                        }}
                    >
                        <ButtonAction
                            classBtn={buttonCreateClass}
                            onClick={handleClickButtonActionCreate}
                            visibility={visibilityMap('near-modalForm', {
                                add: true,
                            })}
                            icon='icon-plus'
                            title='create'
                        />
                    </Tooltip>
                </div>
            </div>
            <div className='body'>
                {isModalForm.every((e) => visibleElements.includes(e)) && (
                    <ModalFormWrapper
                        type={type}
                        modelID={modelID}
                        setFilterModel={setFilterModel}
                    />
                )}
                {hasSelectedModel && (
                    <PopupModelOptions
                        type='pop-model'
                        typeModelOptions='tag'
                        onFilterTabs={onFilterTabs}
                    />
                )}
                <ModelTabs
                    type={type}
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
