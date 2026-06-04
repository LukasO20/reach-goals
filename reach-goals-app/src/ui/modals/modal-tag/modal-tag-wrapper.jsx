import { useManageModel } from '../../../provider/model/manage-model-provider'

import { ModelQueryClientProvider } from '../../../provider/model/model-queryclient-provider'

import ModalTag from '.'

export const ModalTagWrapper = () => {
    const { model: { filter: filterModel }, setFilterModel, resetManageModel } = useManageModel()

    /** @param {Object} filter */
    const handleFilterTabs = (filter) => {
        if (!filter) return resetManageModel({ keys: ['filter'] })
        setFilterModel(filter, 'tag')
    }

    return (
        <ModelQueryClientProvider>
            <ModalTag filterTabs={filterModel} onFilterTabs={handleFilterTabs} />
        </ModelQueryClientProvider>
    )
}