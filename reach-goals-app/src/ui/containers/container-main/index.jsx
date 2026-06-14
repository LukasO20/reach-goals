import Routes from '../../../app/Routes'

import { useVisibility } from '../../../provider/ui/visibility-provider'
import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'
import { useCheckbox } from '../../../provider/ui/checkbox-provider'
import { useButtonDropdown } from '../../../hooks/useButtonDropdown.js'
import { useSwitchMonths } from '../../../provider/ui/switch-months-provider'

import { visibilityMap, switchLayoutMap, buildCheckboxMap } from '../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../items/elements/button-action'
import ButtonDropdown from '../../items/elements/button-dropdown'
import ButtonCheckbox from '../../items/elements/button-checkbox'
import PopupModelOptions from '../../items/elements/popup-model-options'
import ObjectivesStatus from '../../pages/objectives/components/objectives-status.jsx'
import Tooltip from '../../items/elements/tooltip'

import './style.scss'

const ContainerMain = () => {
    const { toggleVisibility } = useVisibility()
    const { data: { layout, visibility }, setSwitchLayout, setUserConfigLayout } = useSwitchLayout()
    const { monthLabel, nextMonth, previousMonth } = useSwitchMonths()
    const { valuesCheckbox, resetCheckbox } = useCheckbox()

    const handleButtonActionClick = () => {
        resetCheckbox({ keys: ['page'] })
    }

    const formRender = switchLayoutMap({
        area: 'modal',
        layout: { modalName: 'modal-center', layoutName: 'form' }
    })

    const isPageCalendar = layout.page.pageName === 'calendar'
    const isPageHome = layout.page.pageName === 'home'
    const isPageObjectives = layout.page.pageName === 'objectives'

    const createDropdown = useButtonDropdown({
        type: 'create-dropdown',
        actions: {
            setterUseVisiblity: (target) => toggleVisibility(visibilityMap(['modal-center', target])),
            setterUseSwitchLayout: () => setSwitchLayout(formRender)
        }
    })

    const moreDropdown = useButtonDropdown({
        type: 'more-dropdown',
        value: visibility,
        isPageObjectives: isPageObjectives,
        actions: { setterUseSwitchLayout: (target) => setUserConfigLayout(target) }
    })

    const visibilityDropdown = useButtonDropdown({
        type: 'visibility-dropdown',
        value: visibility,
        isPageCalendar: isPageCalendar,
        actions: { setterUseSwitchLayout: (target) => setUserConfigLayout(target) }
    })

    const isSwitchColumn = layout.page.layoutName === 'column'
    const isSwichChart = layout.page.layoutName === 'chart'

    const hasSelectedModel = !!valuesCheckbox.page?.selected.length

    return (
        <div className='container-main'>
            <div className='head'>
                <div className='sub-head'>
                    <div>
                        {isPageCalendar && (
                            <div className='month-picker'>
                                <Tooltip title='Previous Month'>
                                    <ButtonAction classBtn='month-previous small circle' icon='icon-arrow-left' onClick={previousMonth} />
                                </Tooltip>
                                <label>{monthLabel}</label>
                                <Tooltip title='Next Month'>
                                    <ButtonAction classBtn='month-next small circle' icon='icon-arrow-right' onClick={nextMonth} />
                                </Tooltip>
                            </div>
                        )}
                        {isPageHome && (
                            <>
                                <Tooltip title='Column Layout'>
                                    <ButtonAction classBtn={`plan-round max-width goal ${isSwitchColumn ? 'active' : ''}`} icon='icon-columns'
                                        switchLayout={switchLayoutMap({ area: 'page', layout: { pageName: layout.page.pageName, layoutName: 'column' } })}
                                        onClick={handleButtonActionClick}
                                    />
                                </Tooltip>
                                <Tooltip title='Chart Layout'>
                                    <ButtonAction classBtn={`plan-round max-width chart ${isSwichChart ? 'active' : ''}`} icon='icon-pie-chart'
                                        switchLayout={switchLayoutMap({ area: 'page', layout: { pageName: layout.page.pageName, layoutName: 'chart' } })}
                                        onClick={handleButtonActionClick}
                                    />
                                </Tooltip>
                            </>
                        )}
                        {!isPageCalendar && hasSelectedModel && (
                            <ButtonCheckbox
                                classBtn='checkbox-main'
                                checkboxID={`checkbox-${layout.page.layoutName}`}
                                checkbox={buildCheckboxMap({ checkboxIDMain: `checkbox-${layout.page.layoutName}`, scope: 'page' })}
                                title='Select all'
                            />
                        )}
                        {isPageObjectives && (
                            <ObjectivesStatus />
                        )}
                    </div>
                    <div>
                        <ButtonDropdown
                            visibility='dropdown-action-create'
                            classBtn='create'
                            icon='icon-plus'
                            title='create'
                            options={createDropdown}
                        />
                        {
                            (isPageCalendar || isPageHome || isPageObjectives) && !isSwichChart && (
                                <ButtonDropdown
                                    visibility='dropdown-visibility'
                                    classBtn='visibility'
                                    icon='icon-eye'
                                    title='visibility'
                                    options={visibilityDropdown}
                                    renderTopChildren={true}
                                />
                            )
                        }
                        {!isPageCalendar && !isSwichChart && (
                            <ButtonDropdown
                                visibility='dropdown-action-more'
                                classBtn='more'
                                icon='icon-dots'
                                options={moreDropdown}
                                tooltip='More options'
                            />
                        )}
                    </div>
                </div>
            </div>
            {hasSelectedModel && (<PopupModelOptions type='pop-model' />)}
            <div className='body'>
                <Routes />
            </div>
        </div>
    )
}

export default ContainerMain
