import { useContext } from 'react'
import Routes from '../../../../app/Routes.jsx'

import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { targetMap, switchLayoutMap, checkboxMap, iconMap } from '../../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ButtonDropdown from '../../items/elements/ButtonDropdown/ButtonDropdown.jsx'
import ButtonCheckbox from '../../items/elements/ButtonCheckbox/ButtonCheckbox.jsx'

const ContainerM = () => {
    const { resetManageModel } = useContext(ManageModelContext)
    const { toggleVisibility } = useContext(VisibilityContext)
    const { layoutComponent } = useSwitchLayout()

    return (
        <div className='container-main' onClick={(e) => { toggleVisibility(targetMap(null), e); resetManageModel() }}>
            <div className='head'>
                <div className='line-p'>
                    <div className='title-m'>
                        <h2>Your control panel</h2>
                    </div>
                    <div className='options-m'>
                        <div className='visibility-m'>
                            <ButtonDropdown target={targetMap('btn-visibility')} classBtn='button-m visibility' title='visibility' icon={'monitor'} />
                        </div>
                        <div className='more-m'>
                            <ButtonDropdown target={targetMap('btn-more')} classBtn='button-m more' icon='ellipsisv' />
                        </div>
                    </div>
                </div>
                <div className='line-s'>
                    <div className='filter'>
                        <ButtonCheckbox checkbox={checkboxMap({ id: 'checkbox-m', value: false })} classBtn='checkbox-m btn-checkbox' />
                        {/* <ButtonDropdown target={targetMap('btn-filter-content')} classBtn='button-filter-m filter-content' iconFa='fa-solid fa-filter' /> */}
                        <ButtonAction classBtn='button-show-m chart' icon='chartbar' />
                        <label className='button-filter-m search'>{iconMap['search']}<input type='text' placeholder='search' id='search-content-m' className='search-content' /></label>
                        <ButtonAction classBtn='button-show-m goals' title='goals'
                            switchLayout={switchLayoutMap({ page: layoutComponent.page, name: layoutComponent.page, layout: 'layout', value: 'goal' })}
                        />
                        <ButtonAction classBtn='button-show-m assignment' title='assignments'
                            switchLayout={switchLayoutMap({ page: layoutComponent.page, name: layoutComponent.page, layout: 'layout', value: 'assignment' })}
                        />
                        {layoutComponent.page === 'objectives' &&
                            <ButtonAction classBtn='button-show-m all-activities' title='all activities'
                                switchLayout={switchLayoutMap({ page: layoutComponent.page, name: layoutComponent.page, layout: 'layout', value: 'default' })}
                            />}
                    </div>
                    <div className='action'>
                        <ButtonDropdown target={targetMap('btn-action-order')} classBtn='button-action-m order' icon='arrowaltv' title='order' />
                        <ButtonDropdown target={targetMap('btn-action-create')} classBtn='button-action-m create' icon='plus' title='create' reference='panel-center' />
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
