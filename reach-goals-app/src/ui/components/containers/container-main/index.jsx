import Routes from '../../../../app/Routes.jsx'

import { useVisibility } from '../../../../provider/ui/visibility-provider.jsx'
import { useSwitchLayout } from '../../../../provider/ui/switch-layout-provider.jsx'
import { useCheckbox } from '../../../../provider/ui/checkbox-provider.jsx'
import { useButtonDropdown } from '../../../../hooks/useButtonDropdown.js'

import { visibilityMap, switchLayoutMap, buildCheckboxMap } from '../../../../utils/mapping/mappingUtils.js'

import { monthNames } from '../../../../utils/reference.js'

import ButtonAction from '../../items/elements/button-action'
import ButtonDropdown from '../../items/elements/button-dropdown'
import ButtonCheckbox from '../../items/elements/button-checkbox'
import PopupModelOptions from '../../items/elements/popup-model-options'

import './style.scss'

const ContainerMain = () => {
    const { toggleVisibility } = useVisibility()
    const { data: { layout, visibility }, updateSwitchLayout, setUserConfigLayout } = useSwitchLayout()
    const { valuesCheckbox, resetCheckbox } = useCheckbox()

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

    const createDropdown = useButtonDropdown({
        type: 'create-dropdown',
        actions: {
            setterUseVisiblity: (target) => toggleVisibility(visibilityMap(['modal-center', target])),
            setterUseSwitchLayout: () => updateSwitchLayout(formRender)
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
        actions: { setterUseSwitchLayout: (target) => setUserConfigLayout(target) }
    })

    const isSwitchColumn = layout.page.layoutName === 'column'
    const isSwichChart = layout.page.layoutName === 'chart'

    const hasSelectedModel = !!valuesCheckbox.page?.selected.length

    return (
        <div className='container-main'>
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
                        {isPageCalendar && (
                            <div className='month-picker'>
                                <span className='month-name'>{monthNames[new Date().getMonth()]}</span>
                                <span className='year-number'>{new Date().getFullYear()}</span>
                            </div>
                        )}
                        {isPageHome && (
                            <>
                                <ButtonAction classBtn={`plan-round max-width goal ${isSwitchColumn ? 'active' : ''}`} icon='column'
                                    switchLayout={switchLayoutMap({ area: 'page', state: { pageName: layout.page.pageName, layoutName: 'column' } })}
                                    onClick={handleButtonActionClick}
                                />
                                <ButtonAction classBtn={`plan-round max-width chart ${isSwichChart ? 'active' : ''}`} icon='chartbar'
                                    switchLayout={switchLayoutMap({ area: 'page', state: { pageName: layout.page.pageName, layoutName: 'chart' } })}
                                    onClick={handleButtonActionClick}
                                />
                            </>
                        )}
                        {!isPageCalendar && hasSelectedModel && (
                            <ButtonCheckbox classBtn='checkbox-main' checkboxID={`checkbox-${layout.page.pageName}`}
                                checkbox={buildCheckboxMap({ checkboxIDMain: `checkbox-${layout.page.pageName}`, scope: 'page' })}
                                title='Select all'
                            />
                        )}
                    </div>
                    <div className='action'>
                        <ButtonDropdown
                            visibility='dropdown-action-create'
                            classBtn='create'
                            icon='plus'
                            title='create'
                            options={createDropdown}
                        />
                        {!isPageCalendar && !isSwichChart && (
                            <>
                                <ButtonDropdown
                                    visibility='dropdown-visibility'
                                    classBtn='visibility'
                                    icon='eye'
                                    title='visibility'
                                    options={visibilityDropdown}
                                />
                                <ButtonDropdown
                                    visibility='dropdown-action-more'
                                    classBtn='more'
                                    icon='ellipsisv'
                                    options={moreDropdown}
                                />
                            </>
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
