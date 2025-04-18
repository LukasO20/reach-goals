import React, { useContext } from 'react'
import { TitleContext } from '../../../provider/TitleProvider'
import { useSwitchLayout } from '../../../hook/useSwitchLayout'

import Goal from '../items/models/Goal'

import '../../styles/pages/Home.scss'
import Assignment from '../items/models/Assignment'

const Home = () => {
    const { update } = useContext(TitleContext)
    const { layoutComponent } = useSwitchLayout()

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
                            {
                                layoutComponent.home.layout === 'goal' ?
                                <Goal display={{sideAction: true, type: 'card'}}/> :
                                <Assignment display={{sideAction: true, type: 'card'}} unfocused={true} />
                            }
                        </div>
                    </div>
                </div>
                <div className="itens-progress column">
                    <div className="head-column">
                        <label>in progress</label>
                    </div>
                    <div className="body-column"></div>
                </div>
                <div className="itens-conclude column">
                    <div className="head-column">
                        <label>conclude</label>
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