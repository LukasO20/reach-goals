import { useManageModel } from '../../../provider/model/manage-model-provider'

import { ModelQueryClientProvider } from '../../../provider/model/model-queryclient-provider'

import ModalTag from '.'

/** @typedef {import('./types.js').ModalTagWrapperProps} Props */

/**
 * @param {Props} props
 */
export const ModalTagWrapper = ({
    modelID,
    filterModel,
    setFilterModel,
    resetManageModel,
}) => {
    /** @param {Object} filter */
    const handleFilterTabs = (filter) => {
        if (!filter) return resetManageModel({ keys: ['filter'] })
        setFilterModel({ filter: filter, type: 'tag' })
    }

    return (
        <ModelQueryClientProvider>
            <ModalTag
                modelID={modelID}
                filterTabs={filterModel}
                onFilterTabs={handleFilterTabs}
                setFilterModel={setFilterModel}
                resetManageModel={resetManageModel}
            />
        </ModelQueryClientProvider>
    )
}
