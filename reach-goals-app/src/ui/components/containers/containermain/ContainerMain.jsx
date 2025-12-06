import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Routes from '../../../../app/Routes.jsx'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { targetMap, switchLayoutMap, checkboxMap } from '../../../../utils/mapping/mappingUtils.js'

import { monthNames } from '../../../../utils/reference.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonDropdown from '../../items/elements/ButtonDropdown/ButtonDropdown.jsx'
import ButtonCheckbox from '../../items/elements/ButtonCheckbox/ButtonCheckbox.jsx'
import SearchBar from '../../items/elements/SearchBar/SearchBar.jsx'

import './ContainerMain.scss'

const ContainerM = () => {
    const { resetManageModel } = useContext(ManageModelContext)
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { layoutComponent } = useSwitchLayout()
    const navigate = useNavigate()

    const handleClickContainer = (e) => {
        toggleVisibility(targetMap(null), e)
        resetManageModel()
        navigate(`/${layoutComponent.page}`) // return standard route during handle
    }

    const isSwitchLayoutAssignment = layoutComponent[layoutComponent.page]?.layout === 'assignment'
    const isSwitchLayoutGoal = layoutComponent[layoutComponent.page]?.layout === 'goal'
    const isSwichPieChart = layoutComponent[layoutComponent.page]?.layout === 'pie-chart'
    const isSwitchLayoutActivities = layoutComponent[layoutComponent.page]?.layout === 'default'

    return (
        <div className='container-main' onClick={(e) => handleClickContainer(e)}>
            <div className='head'>
                {
                    layoutComponent.page !== 'calendar' &&
                    <div className='line-p'>
                        <div className='title-m'>
                            <h2>Your control panel</h2>
                        </div>
                        <div className='options-m'>
                            <div className='visibility-m'>
                                <ButtonDropdown target={targetMap('btn-visibility')} classBtn={`visibility plan ${visibleElements.includes('btn-visibility') && 'active'}`}
                                    title='visibility' icon={'monitor'} />
                            </div>
                            <div className='more-m'>
                                <ButtonDropdown target={targetMap('btn-more')} classBtn={`more plan max-width ${visibleElements.includes('btn-more') && 'active'}`}
                                    icon='ellipsisv' />
                            </div>
                        </div>
                    </div>
                }
                <div className='line-s'>
                    <div className='filter'>
                        {
                            layoutComponent.page !== 'calendar' &&
                            <ButtonCheckbox checkbox={checkboxMap({ id: 'checkbox-m', value: false })} classBtn='checkbox-m btn-checkbox' />
                        }
                        {
                            layoutComponent.page === 'calendar' &&
                            <div className='month-picker'>
                                <span className='month-name'>{monthNames[new Date().getMonth()]}</span>
                                <span className='year-number'>{new Date().getFullYear()}</span>
                            </div>
                        }
                        <SearchBar />
                        <ButtonAction classBtn={`button-action plan-round max-width goal ${isSwitchLayoutGoal ? 'active' : ''}`} title='goals'
                            switchLayout={switchLayoutMap({ page: layoutComponent.page, name: layoutComponent.page, layout: 'layout', value: 'goal' })}
                        />
                        <ButtonAction classBtn={`button-action plan-round max-width assignment ${isSwitchLayoutAssignment ? 'active' : ''}`} title='assignments'
                            switchLayout={switchLayoutMap({ page: layoutComponent.page, name: layoutComponent.page, layout: 'layout', value: 'assignment' })}
                        />
                        {
                            layoutComponent.page === 'home' &&
                            <ButtonAction classBtn={`button-action plan-round max-width pie-chart ${isSwichPieChart ? 'active' : ''}`} icon='chartbar'
                                switchLayout={switchLayoutMap({ page: layoutComponent.page, name: layoutComponent.page, layout: 'layout', value: 'pie-chart' })} 
                            />
                        }
                        {
                            (layoutComponent.page === 'objectives' || layoutComponent.page === 'calendar') &&
                            <ButtonAction classBtn={`button-action plan-round max-width all-activities ${isSwitchLayoutActivities ? 'active' : ''}`} title='all activities'
                                switchLayout={switchLayoutMap({ page: layoutComponent.page, name: layoutComponent.page, layout: 'layout', value: 'default' })}
                            />
                        }
                    </div>
                    <div className='action'>
                        <ButtonDropdown target={targetMap('btn-action-order')} classBtn={`order plan ${visibleElements.includes('btn-action-order') && 'active'}`}
                            icon='arrowaltv' title='order' arrow={true} />
                        <ButtonDropdown target={targetMap('btn-action-create')} classBtn={`create plan ${visibleElements.includes('btn-action-create') && 'active'}`}
                            icon='plus' title='create' reference='panel-center' arrow={true} />
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
