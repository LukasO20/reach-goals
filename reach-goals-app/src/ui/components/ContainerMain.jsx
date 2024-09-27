import React from 'react'
import Routes from '../../app/Routes'

import ButtonDropdown from './items/elements/ButtonDropdown'

const ContainerM = () => {

    return (
        <div className="container-main">
            <div className="head">
                <div className="line-p">
                    <div className="title-m">
                        <h2>Your control panel</h2>
                    </div>
                    <div className="options-m">
                        <div className="visibility-m">
                            <label className="visibility button-m">visibility</label>
                        </div>
                        <div className="more-m">
                            <label className="more button-m"><i className="fa-solid fa-ellipsis-vertical"></i></label>
                        </div>
                    </div>
                </div>
                <div className="line-s">
                    <div className="filter">
                        <label className="button-filter-m checkbox"></label>
                        <label className="button-filter-m filter-content"><i className="icon-st fa-solid fa-filter"></i></label>
                        <label className="button-show-m line-chart"><i className="icon-st fa-solid fa-chart-line"></i></label>
                        <label className="button-filter-m search"><i className="icon-st fa-solid fa-magnifying-glass"></i><input type="text" placeholder="search" id="search-content-m" className="search-content" /></label>
                        <label className="button-show-m button-st goal">goals</label>
                        <label className="button-show-m button-st assignment">unfocused assignments</label>
                    </div>
                    <div className="action">
                        <ButtonDropdown id='btn-action1' classBtn='button-action-m' iconFa='fa-solid fa-sort' title='order' />
                        <ButtonDropdown id='btn-action2' classBtn='button-action-m' iconFa='fa-solid fa-plus' title='create' />
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
