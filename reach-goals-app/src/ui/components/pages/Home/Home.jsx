import { useEffect, useContext } from 'react'

import { useTitle } from '../../../../provider/TitleProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'
import { useGoalProvider } from '../../../../provider/model/GoalModelProvider.jsx'
import { useAssignmentProvider } from '../../../../provider/model/AssignmentModelProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'

import { iconMap, filterGetModelMap } from '../../../../utils/mapping/mappingUtils.js'

import '../Home/Home.scss'

import Goal from '../../items/models/Goal/Goal.jsx'
import Assignment from '../../items/models/Assignment/Assignment.jsx'
import Loading from '../../items/elements/Loading/Loading.jsx'

const Home = () => {
    const { update } = useTitle()
    const { layoutComponent } = useSwitchLayout()
    const { page: { loading: loadingGoal } } = useGoalProvider()
    const { page: { loading: loadingAssignment } } = useAssignmentProvider()
    const { updateFilterModel } = useContext(ManageModelContext)

    const currentLayout = layoutComponent.home.layout

    useEffect(() => {
        update({ header: `Welcome. Let's produce?` })
    }, [])

    useEffect(() => {
        const filter = currentLayout === 'assignment' ?
            filterGetModelMap({
                notGoalRelation: 'all',
                type: currentLayout,
                source: 'core'
            }, currentLayout, 'core')
            :
            filterGetModelMap({
                goalSomeID: 'all',
                type: currentLayout,
                source: 'core'
            }, currentLayout, 'core')
        //const currentScope = model.filter[currentLayout].scope
        updateFilterModel(filter, currentLayout, 'page')
    }, [currentLayout])

    return (
        <div className="container-home">
            {
                (loadingGoal || loadingAssignment) ?
                    <Loading />
                    :
                    <div className="itens">
                        <div className="itens-progress column">
                            <div className="head-column">
                                {iconMap['progress']}<label>in progress</label>
                            </div>
                            <div className="body-column scrollable">
                                <div className='list'>
                                    {
                                        currentLayout === 'goal' ?
                                            <Goal display={{ sideAction: true, type: 'card' }} goalSomeID={'all'} detailsModel={true} status={'progress'} />
                                            :
                                            <Assignment display={{ sideAction: true, type: 'card' }} notGoalRelation={'all'} detailsModel={true} status={'progress'} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="itens-conclude column scrollable">
                            <div className="head-column">
                                {iconMap['check']}<label>conclude</label>
                            </div>
                            <div className="body-column">
                                <div className='list'>
                                    {
                                        currentLayout === 'goal' ?
                                            <Goal display={{ sideAction: true, type: 'card' }} goalSomeID={'all'} detailsModel={true} status={'conclude'} />
                                            :
                                            <Assignment display={{ sideAction: true, type: 'card' }} notGoalRelation={'all'} detailsModel={true} status={'conclude'} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                /* <div className="chart-line">
                    <h1>Representation chart line here...</h1>
                </div> */
            }
        </div>
    )
}

export default Home