import { useContext, useEffect, useState } from 'react'
import { VisibilityContext } from '../../../provider/VisibilityProvider.jsx'
import { ManageModelContext } from '../../../provider/ManageModelProvider.jsx'
import { ModalListContext } from '../../../provider/ModalListProvider.jsx'

import { useGetModel } from '../../../hook/useGetModel.js'
import { useSaveModel } from '../../../hook/useSaveModel.js'

import { modalListMap } from '../../../utils/mappingUtils.js'

import ButtonAction from '../items/elements/ButtonAction.jsx'
import Form from '../items/forms/Form.jsx'

import moment from 'moment'

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

    const typeForm = props.type
    const classRemove = visibleElements.length > 2 ? visibleElements.slice(2) : visibleElements.slice(0, 2)

    const [error, setError] = useState(null)
    const [success, setSucess] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const [modelProps, setModelProps] = useState({})
    const [resetModel, setResetModel] = useState(false)

    const { params: getParams, data: getData } = useGetModel(modelProps)
    const { data: saveData, saveModel } = useSaveModel({})

    const nullModal = () => {
        resetManageModel()
    }

    const loadModel = (id) => {
        setLoading(true)

        if (!id) {
            nullModal()
            return setLoading(false)
        }

        const currentKeySomeID = typeForm === 'assignment' ? 'assignmentSomeID' : typeForm === 'goal' ? 'goalSomeID' : 'tagSomeID'
        const currentUseGetModel = {
            type: typeForm,
            [currentKeySomeID]: id
        }

        try {
            setModelProps(currentUseGetModel)
        }
        catch (error) {
            setError('Ops, something wrong: ', error)
        }
        finally {
            setLoading(false)
        }
    }

    const formatDate = (modalForm) => {
        if (!modalForm) { return }
        const { start, end } = modalForm

        const formatInputISO = (input) => {
            if (moment(input, moment.ISO_8601, true).isValid()) {
                return input ? moment(input).format('DD/MM/YYYY') : null
            }
        }

        const formatInput = (input) => {
            if (input && !moment(input, moment.ISO_8601, true).isValid()) {

                const cleanedInput = input.replace(/\D/g, '')
                if (isNaN(Number(cleanedInput))) { return '' }

                const limitedInput = cleanedInput.slice(0, 8)
                let formattedInput = ''

                if (limitedInput.length <= 2) {
                    formattedInput = limitedInput
                }
                else if (limitedInput.length <= 4) {
                    formattedInput = `${limitedInput.slice(0, 2)}/${limitedInput.slice(2)}`
                }
                else {
                    formattedInput = `${limitedInput.slice(0, 2)}/${limitedInput.slice(2, 4)}/${limitedInput.slice(4)}`
                }

                const validDate = moment(formattedInput, 'DD/MM/YYYY')
                if (!validDate.isValid()) {
                    console.error('THIS IS IS INVALID DATE (put an indicator input date error to users see)')
                }

                return formattedInput
            }
        }

        const formatStart = start ? formatInput(start) || formatInputISO(start) : undefined
        const formatEnd = end ? formatInput(end) || formatInputISO(end) : undefined

        return {
            start: formatStart,
            end: formatEnd
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

    const handleTarget = (objectTarget) => {
        const fotmatedDate = formatDate(objectTarget)
        return { ...objectTarget, ...fotmatedDate }
    }

    useEffect(() => {
        loadModel(model.mainModelID)

        if (modelProps && Object.keys(modelProps).length > 0 && model.mainModelID) {
            setModel(prevModel => ({
                ...prevModel,
                submitModel: handleTarget(getData[0])
            }))
        }

        console.log("CALLING EFFECT")

    }, [model.mainModelID, getData])

    useEffect(() => {
        if (Object.keys(saveData).length > 0) {
            resetManageModel()
            toggleVisibility(null)
            setSucess(true)
        }
    }, [saveData])

    const functionFormMap = {
        mapHandleModalList: handleModalList,
        mapModalListMap: modalListMap,
        mapToggleVisibility: toggleVisibility,
        mapNullModal: nullModal,
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

    console.log('VALUE OF LOADING - ', isLoading, model.submitModel)

    return (
        isLoading ? <div id="load-element" className='loading-animation'></div> :
            ((model.submitModel && model.submitModel.id) || (model.mainModelID === null && !resetModel)) ?
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