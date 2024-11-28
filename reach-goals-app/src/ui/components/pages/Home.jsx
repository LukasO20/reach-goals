import React, { useContext } from 'react'
import { TitleContext } from '../../../provider/components/TitleProvider'

import Meta from '../items/models/Meta'

import '../../styles/pages/Home.scss'

const Home = () => {
    const { update } = useContext(TitleContext)

    React.useEffect(() => {
        update(`Welcome. Let's produce?`)
    }, [update])

    return (
        <div className="container-home">
            <div className="itens">
                <div className="itens-to-do column">
                    <div className="head-column">
                        <label>to do</label>
                    </div>
                    <div className="body-column">
                        <div className='list'>
                            <Meta/>
                        </div>
                    </div>
                </div>
                <div className="itens-progress column">
                    <div className="head-column">
                        <label>in progress</label>
                    </div>
                    <div className="body-column"></div>
                </div>
                <div className="itens-finished column">
                    <div className="head-column">
                        <label>finished</label>
                    </div>
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