import { useContext } from 'react'
import Routes from '../../app/Routes'

import { ManageModelContext } from '../../provider/ManageModelProvider.jsx'
import { VisibilityContext } from '../../provider/VisibilityProvider.jsx'
import { PageTypeContext } from '../../provider/PageTypeProvider.jsx'

import { targetMap, switchLayoutMap, checkboxMap } from '../../utils/mappingUtils.js'

import ButtonAction from './items/elements/ButtonAction.jsx'
import ButtonDropdown from './items/elements/ButtonDropdown.jsx'
import ButtonCheckbox from './items/elements/ButtonCheckbox.jsx'

const ContainerM = () => {
    const { resetManageModel } = useContext(ManageModelContext)
    const { toggleVisibility } = useContext(VisibilityContext) 
    const { pageType } = useContext(PageTypeContext)     
    
    return (
        <div className='container-main' onClick={(e) => { toggleVisibility(targetMap(null), e); resetManageModel() } }>
            <div className='head'>
                <div className='line-p'>
                    <div className='title-m'>
                        <h2>Your control panel</h2>
                    </div>
                    <div className='options-m'>
                        <div className='visibility-m'>
                            <ButtonDropdown target={targetMap('btn-visibility')} classBtn='button-m visibility' title='visibility'/>
                        </div>
                        <div className='more-m'>
                            <ButtonDropdown target={targetMap('btn-more')} classBtn='button-m more' iconFa='fa-solid fa-ellipsis-vertical'/>
                        </div>
                    </div>
                </div>
                <div className='line-s'>
                    <div className='filter'>
                        <ButtonCheckbox checkbox={checkboxMap({ id: 'checkbox-m', value: false })} classBtn='checkbox-m btn-checkbox'/>
                        <ButtonDropdown target={targetMap('btn-filter-content')} classBtn='button-filter-m filter-content' iconFa='fa-solid fa-filter'/>
                        <label className='button-show-m button-st line-chart'><i className='icon-st fa-solid fa-chart-line'></i></label>
                        <label className='button-filter-m search'><i className='icon-st fa-solid fa-magnifying-glass'></i><input type='text' placeholder='search' id='search-content-m' className='search-content' /></label>
                        <ButtonAction classBtn='button-show-m goals' title='goals' switchLayout={switchLayoutMap(pageType, 'layout', 'goal')} />
                        <ButtonAction classBtn='button-show-m assignment' title='unfocused assignments' switchLayout={switchLayoutMap(pageType, 'layout', 'assignment')} />
                        { pageType === 'objectives' && <ButtonAction classBtn='button-show-m all-activities' title='all activities' switchLayout={switchLayoutMap(pageType, 'layout', 'default')} /> }
                    </div>
                    <div className='action'>           
                        <ButtonDropdown target={targetMap('btn-action-order')} classBtn='button-action-m order' iconFa='fa-solid fa-sort' title='order' />
                        <ButtonDropdown target={targetMap('btn-action-create')} classBtn='button-action-m create' iconFa='fa-solid fa-plus' title='create' reference='panel-center' />
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
