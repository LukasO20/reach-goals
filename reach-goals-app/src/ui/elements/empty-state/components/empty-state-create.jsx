import { switchLayoutMap, visibilityMap } from '../../../../utils/mapping/mappingUtils'

import ButtonAction from '../../button-action'

const EmptyStateCreate = () => {
    const formRender = switchLayoutMap({
        area: 'modal',
        layout: { modalName: 'modal-center', layoutName: 'form' }
    })

    return (
        <div className='empty-content create'>
            <ButtonAction
                classBtn='create-goal plan create medium'
                icon='goal'
                title='Create goal'
                visibility={visibilityMap(['modal-center', 'goal'])}
                switchLayout={formRender}
            />
            <ButtonAction
                classBtn='create-goal plan create medium'
                icon='assignment'
                title='Create assignment'
                visibility={visibilityMap(['modal-center', 'assignment'])}
                switchLayout={formRender}
            />
        </div>
    )
}

export default EmptyStateCreate