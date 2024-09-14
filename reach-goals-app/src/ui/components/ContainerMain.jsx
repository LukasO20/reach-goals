import React from 'react'
import Routes from '../../app/Routes'

export default props => 
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
                    <label className="checkbox button-filter-m"></label>
                    <label className="filter-content button-filter-m"><i className="icon-st fa-solid fa-filter"></i></label>
                    <label className="line-chart button-filter-m"><i className="icon-st fa-solid fa-chart-line"></i></label>
                    <label className="search button-filter-m"><i className="icon-st fa-solid fa-magnifying-glass"></i><input type="text" placeholder="search" id="search-content-m" className="search-content" /></label>
                    <label className="goal button-filter-m button-st">goals</label>
                    <label className="assignment button-filter-m button-st">unfocused assignments</label>
                </div>
                <div className="action">
                    <label className="goal button-action-m button-st"><i className="icon-st fa-solid fa-sort"></i>order</label>
                    <label className="goal button-action-m button-st"><i className="icon-st fa-solid fa-plus"></i>create</label>
                </div>
            </div>
        </div>
        <div className="body">
            <Routes />
        </div>
    </div>