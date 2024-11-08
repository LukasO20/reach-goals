import React, { useContext } from 'react'
import Routes from '../../app/Routes'
import { VisibilityContext } from '../../provider/components/VisibilityProvider'

import ButtonDropdown from './items/elements/ButtonDropdown'
import ButtonCheckbox from './items/elements/ButtonCheckbox'

const targetMap = (classes) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
    }
    return attributes
}

const ContainerM = () => {
    const { toggleVisibility } = useContext(VisibilityContext)

    return (
        <div className="container-main" onClick={(e) => toggleVisibility(targetMap(null), e)}>
            <div className="head">
                <div className="line-p">
                    <div className="title-m">
                        <h2>Your control panel</h2>
                    </div>
                    <div className="options-m">
                        <div className="visibility-m">
                            <ButtonDropdown target={targetMap('btn-visibility')} classBtn="button-m visibility" title="visibility"/>
                        </div>
                        <div className="more-m">
                            <ButtonDropdown target={targetMap('btn-more')} classBtn="button-m more" iconFa="fa-solid fa-ellipsis-vertical"/>
                        </div>
                    </div>
                </div>
                <div className="line-s">
                    <div className="filter">
                        <ButtonCheckbox target={targetMap('btn-checkbox', { add: true })} classBtn='btn-option-r btn-checkbox'/>
                        <ButtonDropdown target={targetMap('btn-filter-content')} classBtn="button-filter-m filter-content" iconFa="fa-solid fa-filter"/>
                        <label className="button-show-m button-st line-chart"><i className="icon-st fa-solid fa-chart-line"></i></label>
                        <label className="button-filter-m search"><i className="icon-st fa-solid fa-magnifying-glass"></i><input type="text" placeholder="search" id="search-content-m" className="search-content" /></label>
                        <label className="button-show-m button-st goal">goals</label>
                        <label className="button-show-m button-st assignment">unfocused assignments</label>
                    </div>
                    <div className="action">           
                        <ButtonDropdown target={targetMap('btn-action1')} classBtn="button-action-m order" iconFa="fa-solid fa-sort" title="order" />
                        <ButtonDropdown target={targetMap('btn-action2')} classBtn="button-action-m create" iconFa="fa-solid fa-plus" title="create" />
                    </div>
                </div>
            </div>
            <div className="body">
                <Routes />
            </div>
        </div>
    )
}

export default ContainerM
