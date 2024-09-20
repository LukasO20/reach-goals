import React from 'react'
import '../styles/Home.scss'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <div className="container-home">
            <div className="itens">
                <div className="itens-to-do column">
                    <div className="head-column"></div>
                    <div className="body-column"></div>
                </div>
                <div className="itens-progress column">
                    <div className="head-column"></div>
                    <div className="body-column"></div>
                </div>
                <div className="itens-finished column">
                    <div className="head-column"></div>
                    <div className="body-column"></div>
                </div>
            </div>
            <div className="chart-line">
                <h1>Representation chart line here...</h1>
            </div>
        </div>
    )
}

export default Home