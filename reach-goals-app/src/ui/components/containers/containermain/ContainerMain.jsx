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
    const { data: { layout, visibility }, updateSwitchLayout, setUserConfigLayout } = useSwitchLayout()
    const { valuesCheckbox, resetCheckbox } = useCheckbox()

    const navigate = useNavigate()

    const handleClickContainer = (e) => {
        toggleVisibility(visibilityMap(null), e)
        resetManageModel()
        navigate(`/${layout.page.pageName}`)
    }

    const handleButtonActionClick = () => {
        resetCheckbox({ keys: ['page'] })
    }

    const formRender = switchLayoutMap({
        area: 'modal',
        state: { modalName: 'modal-center', layoutName: 'form' }
    })

    const isPageCalendar = layout.page.pageName === 'calendar'
    const isPageHome = layout.page.pageName === 'home'
    const isPageObjectives = layout.page.pageName === 'objectives'

    const moreDropdownOptionsMap = [
        {
            id: 'switch-cards',
            classBtn: visibility.cards === 'card' ? 'active' : '',
            title: `Switch to ${visibility.cards === 'card' ? 'card-mini' : 'card'}`,
            icon: 'cardmini',
            uiMode: 'button-toggle',
            onClick: () => setUserConfigLayout({
                type: 'visibility',
                data: { cards: visibility.cards === 'card' ? 'card-mini' : 'card' }
            })
        },
        isPageObjectives && [
            {
                id: 'switch-columns-less',
                classBtn: visibility.columns === 'column-2x2' ? 'active' : '',
                title: `${visibility.columns === 'column-2x2' ? 'Remove' : 'Apply'} to columns 2x2`,
                icon: visibility.columns === 'column-2x2' ? 'columnslessoff' : 'columnsless',
                onClick: () => setUserConfigLayout({ 
                    type: 'visibility', 
                    data: { columns: visibility.columns === 'column-2x2' ? null : 'column-2x2' } 
                })
            },
            {
                id: 'switch-columns-more',
                classBtn: visibility.columns === 'column-3x3' ? 'active' : '',
                title: `${visibility.columns === 'column-3x3' ? 'Remove' : 'Apply'} to columns 3x3`,
                icon: visibility.columns === 'column-3x3' ? 'columnsmoreoff' : 'columnsmore',
                onClick: () => setUserConfigLayout({ 
                    type: 'visibility', 
                    data: { columns: visibility.columns === 'column-3x3' ? null : 'column-3x3' } 
                })
            }
        ]
    ].filter(Boolean)

    const createDropdownOptionsMap = [
        {
            title: 'Goal',
            icon: 'plus',
            onClick: () => {
                toggleVisibility(visibilityMap(['modal-center', 'goal']));
                updateSwitchLayout(formRender)
            }
        },
        {
            title: 'Assignment',
            icon: 'plus',
            onClick: () => {
                toggleVisibility(visibilityMap(['modal-center', 'assignment']));
                updateSwitchLayout(formRender)
            }
        }
    ]

    const visibilityDropdownOptionsMap = [
        {
            id: 'hide-tags',
            classBtn: visibility.tagsCard ? 'active' : '',
            title: `${visibility.tagsCard ? 'Hide' : 'Show'} tags`,
            icon: 'tag',
            onClick: () => setUserConfigLayout({
                type: 'visibility',
                data: { tagsCard: !visibility.tagsCard }
            })
        },
        {
            id: 'progress-status',
            classBtn: visibility.status?.includes('progress') ? 'active' : '',
            title: `${visibility.status?.includes('progress') ? 'Hide' : 'Show'} progress activity`,
            icon: 'progress',
            onClick: () => setUserConfigLayout({ type: 'visibility', data: { status: ['progress'] } })
        },
        {
            id: 'conclude-status',
            classBtn: visibility.status?.includes('conclude') ? 'active' : '',
            title: `${visibility.status?.includes('conclude') ? 'Hide' : 'Show'} conclude activity`,
            icon: 'check',
            onClick: () => setUserConfigLayout({ type: 'visibility', data: { status: ['conclude'] } })
        },
        {
            id: 'cancel-status',
            classBtn: visibility.status?.includes('cancel') ? 'active' : '',
            title: `${visibility.status?.includes('cancel') ? 'Hide' : 'Show'} cancel activity`,
            icon: 'cancel',
            onClick: () => setUserConfigLayout({ type: 'visibility', data: { status: ['cancel'] } })
        },
    ]

    const isSwitchLayoutAssignment = layout.page.layoutName === 'assignment'
    const isSwitchLayoutGoal = layout.page.layoutName === 'goal'
    const isSwichPieChart = layout.page.layoutName === 'pie-chart'
    const isSwitchLayoutActivities = layout.page.layoutName === 'all'

    const hasSelectedModel = !!valuesCheckbox.page?.selected.length

    return (
        <div className='container-main' onClick={(e) => handleClickContainer(e)}>
            <div className='head'>
                {!isPageCalendar && (
                    <div className='line-p'>
                        <div className='title-m'>
                            <h2>Your control panel</h2>
                        </div>
                    </div>
                )}
                <div className='line-s'>
                    <div className='filter'>
                        {!isPageCalendar && hasSelectedModel && (
                            <ButtonCheckbox classBtn='checkbox-main' checkboxID={`checkbox-${layout.page.pageName}`}
                                checkbox={buildCheckboxMap({ checkboxIDMain: `checkbox-${layout.page.pageName}`, scope: 'page' })}
                                title='Select all'
                            />
                        )}
                        {isPageCalendar && (
                            <div className='month-picker'>
                                <span className='month-name'>{monthNames[new Date().getMonth()]}</span>
                                <span className='year-number'>{new Date().getFullYear()}</span>
                            </div>
                        )}
                        <ButtonAction classBtn={`plan-round max-width goal ${isSwitchLayoutGoal ? 'active' : ''}`} title='goals'
                            switchLayout={switchLayoutMap({ area: 'page', state: { pageName: layout.page.pageName, layoutName: 'goal' } })}
                            onClick={handleButtonActionClick}
                        />
                        <ButtonAction classBtn={`plan-round max-width assignment ${isSwitchLayoutAssignment ? 'active' : ''}`} title='assignments'
                            switchLayout={switchLayoutMap({ area: 'page', state: { pageName: layout.page.pageName, layoutName: 'assignment' } })}
                            onClick={handleButtonActionClick}
                        />
                        {isPageHome && (
                            <ButtonAction classBtn={`plan-round max-width pie-chart ${isSwichPieChart ? 'active' : ''}`} icon='chartbar'
                                switchLayout={switchLayoutMap({ area: 'page', state: { pageName: layout.page.pageName, layoutName: 'pie-chart' } })}
                                onClick={handleButtonActionClick}

                            />
                        )}
                        {(isPageObjectives || isPageCalendar) && (
                            <ButtonAction classBtn={`plan-round max-width all-activities ${isSwitchLayoutActivities ? 'active' : ''}`} title='all activities'
                                switchLayout={switchLayoutMap({ area: 'page', state: { pageName: layout.page.pageName, layoutName: 'all' } })}
                            />
                        )}
                    </div>
                    <div className='action'>
                        <ButtonDropdown
                            visibility='dropdown-action-create'
                            classBtn='create'
                            icon='plus'
                            title='create'
                            options={createDropdownOptionsMap}
                        />
                        {!isPageCalendar && (
                            <>
                                <ButtonDropdown
                                    visibility='dropdown-visibility'
                                    classBtn='visibility'
                                    icon='eye'
                                    title='visibility'
                                    options={visibilityDropdownOptionsMap}
                                />
                                <ButtonDropdown
                                    visibility='dropdown-action-more'
                                    classBtn='more'
                                    icon='ellipsisv'
                                    options={moreDropdownOptionsMap}
                                />
                            </>
                        )}
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
