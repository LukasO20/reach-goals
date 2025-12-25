import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { VisibilityContext } from '../../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../../provider/ManageModelProvider.jsx'
import { useSwitchLayout } from '../../../../provider/SwitchLayoutProvider.jsx'

import { targetMap, switchLayoutMap, filterGetModelMap } from '../../../../utils/mapping/mappingUtils.js'

import ModalForm from '../../panels/ModalForm/ModalForm.jsx'
import ButtonAction from '../../items/elements/ButtonAction/ButtonAction.jsx'
import ModelTabs from '../../items/elements/ModelTabs/ModelTabs.jsx'

const ModalTag = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const { setModel, updateFilterModel } = useContext(ManageModelContext)
    const { layoutComponent } = useSwitchLayout()
    const navigate = useNavigate()

    const isModalForm = ['tag', 'near-modalForm']

    const handleClickButtonAction = (e) => {
        if (e) setModel(prev => ({ ...prev, typeModel: 'config' }))
        navigate(`/${layoutComponent.page}`) // return standard route during handle   
    }

    useEffect(() => {
        const filter = filterGetModelMap({
            tagSomeID: 'all', type: 'tag', source: 'core'
        }, 'tag', 'core')

        updateFilterModel(filter, 'tag', 'panel')
    }, [])

    return (
        <>
            <div className='head'>
                <h2>Tags</h2>
                <ButtonAction target={targetMap(null)} onClick={handleClickButtonAction} classBtn='button-action circle close' icon='close' />
                <div className='options'>
                    <ButtonAction target={targetMap('near-modalForm', { add: true })}
                        classBtn={`button-action create plan max-width ${isModalForm.every(e => visibleElements.includes(e)) ? 'active' : ''}`} icon='plus' title='create' />
                    <ButtonAction classBtn='button-action circle max-width config' icon='config' onClick={(e) => handleClickButtonAction(e)}
                        target={targetMap(['panel-center', 'config'])} switchLayout={switchLayoutMap({ page: layoutComponent.page, name: 'panel', layout: 'layout', value: 'center' })} />
                </div>
            </div>
            <div className='body'>
                {isModalForm.every(e => visibleElements.includes(e)) && <ModalForm type='tag' />}
                <ModelTabs type='tag' />
            </div>
        </>
    )
}

export default ModalTag