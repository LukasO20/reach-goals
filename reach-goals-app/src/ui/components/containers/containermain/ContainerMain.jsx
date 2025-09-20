import { useContext } from 'react'
import Routes from '../../../../app/Routes.jsx'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { targetMap, switchLayoutMap, checkboxMap, iconMap } from '../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonDropdown from '../../items/elements/ButtonDropdown/ButtonDropdown.jsx'
import ButtonCheckbox from '../../items/elements/ButtonCheckbox/ButtonCheckbox.jsx'
import SearchBar from '../../items/elements/SearchBar/SearchBar.jsx'

import './ContainerMain.scss'

const ContainerM = () => {
    const { resetManageModel } = useContext(ManageModelContext)
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { layoutComponent } = useSwitchLayout()

    const isSwitchLayoutAssignment = layoutComponent[layoutComponent.page]?.layout === 'assignment'
    const isSwitchLayoutGoal = layoutComponent[layoutComponent.page]?.layout === 'goal'
    const isSwitchLayoutActivities = layoutComponent[layoutComponent.page]?.layout === 'default'

    return (
        <div className='container-main' onClick={(e) => { toggleVisibility(targetMap(null), e); resetManageModel() }}>
            <div className='head'>
                <div className='line-p'>
                    <div className='title-m'>
                        <h2>Your control panel</h2>
                    </div>
                    <div className='options-m'>
                        <div className='visibility-m'>
                            <ButtonDropdown target={targetMap('btn-visibility')} classBtn={`button-dropdown visibility plan ${visibleElements.includes('btn-visibility') && 'active'}`}
                             title='visibility' icon={'monitor'} />
                        </div>
                        <div className='more-m'>
                            <ButtonDropdown target={targetMap('btn-more')} classBtn={`button-dropdown more plan max-width ${visibleElements.includes('btn-more') && 'active'}`}
                             icon='ellipsisv' />
                        </div>
                    </div>
                </div>
                <div className='line-s'>
                    <div className='filter'>
                        <ButtonCheckbox checkbox={checkboxMap({ id: 'checkbox-m', value: false })} classBtn='checkbox-m btn-checkbox' />
                        <ButtonAction classBtn='button-show-m chart' icon='chartbar' />
                        <SearchBar />
                        <ButtonAction classBtn={`button-action plan-round max-width goal ${isSwitchLayoutGoal && 'active'}`} title='goals'
                            switchLayout={switchLayoutMap({ page: layoutComponent.page, name: layoutComponent.page, layout: 'layout', value: 'goal' })}
                        />
                        <ButtonAction classBtn={`button-action plan-round max-width assignment ${isSwitchLayoutAssignment && 'active'}`} title='assignments'
                            switchLayout={switchLayoutMap({ page: layoutComponent.page, name: layoutComponent.page, layout: 'layout', value: 'assignment' })}
                        />
                        {layoutComponent.page === 'objectives' &&
                            <ButtonAction classBtn={`button-action plan-round max-width all-activities ${isSwitchLayoutActivities && 'active'}`} title='all activities'
                                switchLayout={switchLayoutMap({ page: layoutComponent.page, name: layoutComponent.page, layout: 'layout', value: 'default' })}
                            />}
                    </div>
                    <div className='action'>
                        <ButtonDropdown target={targetMap('btn-action-order')} classBtn={`order plan ${visibleElements.includes('btn-action-order') && 'active'}`} 
                            icon='arrowaltv' title='order' />
                        <ButtonDropdown target={targetMap('btn-action-create')} classBtn={`create plan ${visibleElements.includes('btn-action-create') && 'active'}`} 
                            icon='plus' title='create' reference='panel-center' />
                    </div>
                </div>
            </div>
            <div className='body'>
                <Routes />
            </div>
        </div>
    )
}

export default ContainerM
