import { useContext, useEffect, useState } from 'react'

import { DataModelContext } from '../../../provider/DataModelProvider.jsx'
import { VisibilityContext } from '../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../provider/ManageModelProvider.jsx'
import { ModalListContext } from '../../../provider/ModalListProvider.jsx'

import { useSaveModel } from '../../../hook/useSaveModel.js'

import { modalListMap } from '../../../utils/mapping/mappingUtils.js'
import { formatDate } from '../../../utils/utils.js'

import ButtonAction from '../items/elements/ButtonAction.jsx'
import Form from '../items/forms/Form.jsx'

import '../../styles/items/Elements.scss'
import '../../styles/panels/Objectives.scss'

const formsInputMap = (typeForm, model, exFunction) => {
    const form = typeForm === 'assignment' &&
        <div className='field-forms duration'>
            <input id={`${typeForm}-duration`} className='input-form' type="text" placeholder='set duration' name='duration' onChange={exFunction} value={model?.duration} />
        </div>

    return form
}

const formsItemMap = (typeForm, modelComponent) => {
    const messageRelation = typeForm === 'goal' ? 'assignments' : 'goals'

    const formItem =
        <div className={`item-forms ${typeForm === 'goal' ? 'assignment' : 'goal'}`}>
            <div className='item-forms head'>
                <div className='item-head-1'>
                    <label>{messageRelation}</label>
                    <ButtonAction modalList={modalListMap(true, typeForm)} classBtn={`form-modallist-${typeForm} button-st`} iconFa='fa-solid fa-plus' title='Add' />
                </div>
                <div className='item-head-2'></div>
            </div>
            <div className='item-forms body'>
                {modelComponent}
            </div>
        </div>

    return formItem
}

const ModalForm = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const { model, setModel, resetManageModel } = useContext(ManageModelContext)
    const { modalList, handleModalList } = useContext(ModalListContext)
    const { getModel } = useContext(DataModelContext)

    const typeForm = props.type
    const classRemove = visibleElements.length > 2 ? visibleElements.slice(2) : visibleElements.slice(0, 2)
    const currentKeySomeID = `${typeForm}SomeID`

    const [error, setError] = useState(null)
    const [success, setSucess] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const { saveModel, data: saveData } = useSaveModel({})

    const loadModel = (id) => {
        setLoading(true)

        if (!id) return setLoading(false)

        const currentUseGetModel = {
            type: typeForm,
            [currentKeySomeID]: id
        }

        try {
            getModel(currentUseGetModel, { current: true })
        }
        catch (error) {
            setError('Ops, something wrong: ', error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target || e

        //Tag attributes
        const tagsRelation = e.tags ?? model.submitModel.tags ?? []

        if (typeForm === 'goal') {
            const assignmentsRelation = e.assignments ?? model.submitModel.assignments ?? []

            const update = {
                ...model.submitModel,
                [name]: value,
                assignments: [...assignmentsRelation],
                tags: [...tagsRelation]
            }

            //Format object when is necessary
            const formatted = { ...update, ...formatDate(update) }

            setModel(prevModel => ({
                ...prevModel,
                submitModel: formatted
            }))
        } else if (typeForm === 'assignment') {

            const update = {
                ...model.submitModel,
                [name]: value,
                goal: e.target === undefined ? Object.values(e)[0] : null,
                tags: [...tagsRelation]
            }

            //Format object when is necessary
            const formatted = { ...update, ...formatDate(update) }

            setModel(prevModel => ({
                ...prevModel,
                submitModel: formatted
            }))
        } else {

            const update = {
                ...model.submitModel,
                [name]: value
            }

            setModel(prevModel => ({
                ...prevModel,
                submitModel: update
            }))
        }
    }

    const handleSubmit = () => {
        setError(null)
        setSucess(false)

        try {
            saveModel({ type: typeForm, model: structuredClone(model.submitModel) })
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        loadModel(model.mainModelID)
    }, [model.mainModelID])

    useEffect(() => {
        if (saveData && typeof saveData === 'object' && Object.keys(saveData).length > 0) {
            resetManageModel()
            toggleVisibility(null)
            setSucess(true)
        }
    }, [saveData])


    const functionFormMap = {
        mapHandleModalList: handleModalList,
        mapModalListMap: modalListMap,
        mapToggleVisibility: toggleVisibility,
        mapHandleChange: handleChange,
        mapFormsInputMap: formsInputMap,
        mapFormsItemMap: formsItemMap,
        mapHandleSubmit: handleSubmit,
        mapSetSucess: setSucess,
        mapSetError: setError
    }

    const booleanFormMap = {
        mapClassRemove: classRemove
    }

    const contextFormMap = {
        mapModalList: modalList,
    }

    const stateFormMap = {
        mapStateSuccess: success,
        mapStateError: error
    }

    //console.log('VALUE OF LOADING - ', isLoading, model)

    return (
        isLoading ? <div id="load-element" className='loading-animation'></div> :
            ((model.submitModel && model.submitModel.id) || model.mainModelID === null) ?
                (
                    <Form typeForm={typeForm} functionFormMap={functionFormMap}
                        model={model.submitModel} booleanFormMap={booleanFormMap}
                        contextFormMap={contextFormMap} stateFormMap={stateFormMap} />
                )
                :
                null
    )
}

export default ModalForm