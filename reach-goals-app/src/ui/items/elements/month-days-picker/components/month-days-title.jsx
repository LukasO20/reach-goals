import { useCallback, useEffect, useRef, useState } from 'react'
import { useAssignmentProvider } from '../../../../../provider/model/assignment-model-provider'
import { useGoalProvider } from '../../../../../provider/model/goal-model-provider'
import { useManageModel } from '../../../../../provider/model/manage-model-provider'
import { useVisibility } from '../../../../../provider/ui/visibility-provider/index.jsx'
import { useOutsideClick } from '../../../../../hooks/useOutsideClick.js'
import { useAnchorPosition } from '../../../../../hooks/useAnchorPosition.js'

import { visibilityMap } from '../../../../../utils/mapping/mappingUtils.js'
import { getTransform } from '../../../../../utils/utils.js'

import ButtonAction from '../../button-action'
import MonthDaysForm from './month-days-form.jsx'
import ModalCards from '../../../../modals/modal-cards'

/** @typedef {import('../types.js').ModalCardsProps} ModalCardsProps */

/** @typedef {import('../types.js').MonthsDaysTitleProps} Props */

/**
 * @param {Props} props
 */
const MonthsDaysTitle = ({ title, startDate, data }) => {
    const { model, setModel } = useManageModel()
    const { visibleElements, toggleVisibility } = useVisibility()
    const { coords, calculatePosition } = useAnchorPosition()
    const { save: saveAssignment, saveSuccess: saveAssignmentSuccess, saving: savingAssignment, resetSave: resetSaveAssignment } = useAssignmentProvider()
    const { save: saveGoal, saveSuccess: saveGoalSuccess, saving: savingGoal, resetSave: resetSaveGoal } = useGoalProvider()

    /** @type {[ModalCardsProps, React.Dispatch<React.SetStateAction<ModalCardsProps>>]} */
    const [modalCards, setModalCards] = useState()

    const visibleForm = `month-form-${startDate}`
    const visibleModal = `month-modal-${startDate}`
    const containerRef = useRef(null)
    const monthDaysModalRef = useRef(null)
    const labelRef = useRef(null)
    const buttonRef = useRef(null)

    /** * @param {React.RefObject<HTMLElement>} elementRef */
    const handleCalculatePosition = (elementRef) => calculatePosition(elementRef.current, containerRef.current)

    const handleButtonActionClick = () => {
        handleCalculatePosition(buttonRef)
        toggleVisibility(visibilityMap(visibleForm))
    }

    /** @param {ModalCardsProps} */
    const handleLabelClick = ({ icon, title, data }) => {
        setModalCards({ icon, title, data })
        toggleVisibility(visibilityMap(visibleModal))
        handleCalculatePosition(labelRef)
    }

    const handleClickButtonModalCards = () => {
        if (isMonthsModalVisible) toggleVisibility(visibilityMap(visibleModal, { remove: true }))
    }

    const resetMutation = useCallback(() => {
        const resetSaveMap = {
            goal: () => resetSaveGoal(),
            assignment: () => resetSaveAssignment(),
        }
        resetSaveMap[model.typeModel]()
    }, [resetSaveGoal, resetSaveAssignment, model.typeModel])

    const isLoading = !!savingGoal || !!savingAssignment
    const isMonthsFormVisible = visibleElements.includes(visibleForm)
    const isMonthsModalVisible = visibleElements.includes(visibleModal)
    const isSuccess = !!saveGoalSuccess || !!saveAssignmentSuccess

    useOutsideClick(monthDaysModalRef, () => {
        if (isMonthsFormVisible) toggleVisibility(visibilityMap(visibleForm, { remove: true }))
        if (isMonthsModalVisible) toggleVisibility(visibilityMap(visibleModal, { remove: true }))
    })

    useEffect(() => {
        if (isSuccess && isMonthsFormVisible) {
            resetMutation()
            toggleVisibility(visibilityMap(visibleForm, { remove: true }))
        }
    }, [isSuccess, isMonthsFormVisible, toggleVisibility, resetMutation, visibleForm])

    return (
        <div className='title' ref={containerRef}>
            <label onClick={() => handleLabelClick({ icon: 'objectives', title: 'Activities', data }) } ref={labelRef}>
                {title}
            </label>
            <div className='title-box'>
                {isMonthsFormVisible && (
                    <MonthDaysForm
                        style={{
                            position: 'absolute',
                            left: `${coords.x}px`,
                            top: `${coords.y}px`,
                            minWidth: `${coords.width}px`,
                            transform: getTransform(coords.placementX, coords.placementY),
                        }}
                        data-placement-y={coords.placementY}
                        data-placement-x={coords.placementX}
                        model={model}
                        startDate={startDate}
                        ref={monthDaysModalRef}
                        setModel={setModel}
                        saveGoal={saveGoal}
                        saveAssignment={saveAssignment}
                        pendingState={isLoading}
                    />
                )}
                {isMonthsModalVisible && (
                    <ModalCards
                        style={{
                            position: 'absolute',
                            left: `${coords.x}px`,
                            top: `${coords.y}px`,
                            minWidth: `${coords.width}px`,
                            transform: getTransform(coords.placementX, coords.placementY),
                        }}
                        data-placement-y={coords.placementY}
                        data-placement-x={coords.placementX}
                        ref={monthDaysModalRef}
                        icon={modalCards.icon}
                        title={modalCards.title}
                        data={modalCards.data}
                        onShowModalCards={handleClickButtonModalCards}
                    />
                )}
                <ButtonAction
                    classBtn='add-activity small circle'
                    icon='plus'
                    innerRef={buttonRef}
                    onClick={() => {
                        setModel((prev) => ({
                            ...prev,
                            typeModel: 'goal',
                            activeModel: { name: null, start: startDate }
                        }));
                        handleButtonActionClick()
                    }}
                />
            </div>
        </div>
    )
}

export default MonthsDaysTitle