import { useNavigate } from 'react-router-dom'

import Routes from '../../../../app/Routes.jsx'

import { useManageModel } from '../../../../provider/model/ManageModelProvider.jsx'
import { useVisibility } from '../../../../provider/ui/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../provider/ui/SwitchLayoutProvider.jsx'
import { useCheckbox } from '../../../../provider/ui/CheckboxProvider.jsx'

import { visibilityMap, switchLayoutMap, buildCheckboxMap } from '../../../../utils/mapping/mappingUtils.js'

import { monthNames } from '../../../../utils/reference.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonDropdown from '../../items/elements/ButtonDropdown/ButtonDropdown.jsx'
import ButtonCheckbox from '../../items/elements/ButtonCheckbox/ButtonCheckbox.jsx'
import PopupModelOptions from '../../items/elements/PopupModelOptions/PopupModelOptions.jsx'

import './ContainerMain.scss'

const ContainerM = () => {
    const { resetManageModel } = useManageModel()
    const { toggleVisibility } = useVisibility()
    const { layout, updateSwitchLayout } = useSwitchLayout()
    const { valuesCheckbox, resetCheckbox } = useCheckbox()
    const navigate = useNavigate()

    const handleClickContainer = (e) => {
        toggleVisibility(visibilityMap(null), e)
        resetManageModel()
        navigate(`/${layout.page.pageName}`) // return standard route during handle
    }

    const handleButtonActionClick = () => {
        resetCheckbox({ keys: ['page'] })
    }

    const formRender = switchLayoutMap({
        area: 'modal',
        state: { modalName: 'modal-center', layoutName: 'form' }
    })

    const dropdownOptionsMap = [
        {
            title: 'goal',
            icon: 'plus',
            onClick: () => { 
                toggleVisibility(visibilityMap(['modal-center', 'goal'])); 
                updateSwitchLayout(formRender)
            }
        },
        {
            title: 'assignment',
            icon: 'plus',
            onClick: () => { 
                toggleVisibility(visibilityMap(['modal-center', 'assignment'])); 
                updateSwitchLayout(formRender) 
            }
        }
    ]

    const isSwitchLayoutAssignment = layout.page.layoutName === 'assignment'
    const isSwitchLayoutGoal = layout.page.layoutName === 'goal'
    const isSwichPieChart = layout.page.layoutName === 'pie-chart'
    const isSwitchLayoutActivities = layout.page.layoutName === 'all'

    const isPageCalendar = layout.page.pageName === 'calendar'
    const isPageHome = layout.page.pageName === 'home'
    const isPageObjectives = layout.page.pageName === 'objectives'

    const hasSelectedModel = !!valuesCheckbox.page?.selected.length

    return (
        <div className='container-main' onClick={(e) => handleClickContainer(e)}>
            <div className='head'>
                {
                    !isPageCalendar && (
                        <div className='line-p'>
                            <div className='title-m'>
                                <h2>Your control panel</h2>
                            </div>
                        </div>
                    )
                }
                <div className='line-s'>
                    <div className='filter'>
                        {
                            !isPageCalendar && hasSelectedModel && (
                                <ButtonCheckbox classBtn='checkbox-main' checkboxID={`checkbox-${layout.page.pageName}`}
                                    checkbox={buildCheckboxMap({ checkboxIDMain: `checkbox-${layout.page.pageName}`, scope: 'page' })}
                                    title='Select all'
                                />
                            )
                        }
                        {
                            isPageCalendar && (
                                <div className='month-picker'>
                                    <span className='month-name'>{monthNames[new Date().getMonth()]}</span>
                                    <span className='year-number'>{new Date().getFullYear()}</span>
                                </div>
                            )
                        }
                        <ButtonAction classBtn={`plan-round max-width goal ${isSwitchLayoutGoal ? 'active' : ''}`} title='goals'
                            switchLayout={switchLayoutMap({ area: 'page', state: { pageName: layout.page.pageName, layoutName: 'goal' } })}
                            onClick={handleButtonActionClick}
                        />
                        <ButtonAction classBtn={`plan-round max-width assignment ${isSwitchLayoutAssignment ? 'active' : ''}`} title='assignments'
                            switchLayout={switchLayoutMap({ area: 'page', state: { pageName: layout.page.pageName, layoutName: 'assignment' } })}
                            onClick={handleButtonActionClick}
                        />
                        {
                            isPageHome && (
                                <ButtonAction classBtn={`plan-round max-width pie-chart ${isSwichPieChart ? 'active' : ''}`} icon='chartbar'
                                    switchLayout={switchLayoutMap({ area: 'page', state: { pageName: layout.page.pageName, layoutName: 'pie-chart' } })}
                                    onClick={handleButtonActionClick}

                                />
                            )
                        }
                        {
                            (isPageObjectives || isPageCalendar) && (
                                <ButtonAction classBtn={`plan-round max-width all-activities ${isSwitchLayoutActivities ? 'active' : ''}`} title='all activities'
                                    switchLayout={switchLayoutMap({ area: 'page', state: { pageName: layout.page.pageName, layoutName: 'all' } })}
                                />
                            )
                        }
                    </div>
                    <div className='action'>
                        <ButtonDropdown visibility='dropdown-visibility' classBtn='visibility'
                            title='visibility' arrow={true} />
                        <ButtonDropdown visibility='dropdown-action-order' classBtn='order'
                            icon='arrowaltv' title='order' arrow={true} />
                        <ButtonDropdown visibility='dropdown-action-create' classBtn='create'
                            icon='plus' title='create' options={dropdownOptionsMap} arrow={true} />
                    </div>
                </div>
            </div>
            {hasSelectedModel && (<PopupModelOptions />)}
            <div className='body'>
                <Routes />
            </div>
        </div>
    )
}

export default ContainerM
