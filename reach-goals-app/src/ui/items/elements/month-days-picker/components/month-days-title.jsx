import { useCallback, useEffect, useRef } from 'react'
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

/** @typedef {import('../types.js').MonthsDaysTitleProps} Props */

/**
 * @param {Props} props
 */
const MonthsDaysTitle = ({ title, startDate }) => {
    const { model, setModel } = useManageModel()
    const { visibleElements, toggleVisibility } = useVisibility()
    const { coords, calculatePosition } = useAnchorPosition()
    const { save: saveAssignment, saveSuccess: saveAssignmentSuccess, saving: savingAssignment, resetSave: resetSaveAssignment } = useAssignmentProvider()
    const { save: saveGoal, saveSuccess: saveGoalSuccess, saving: savingGoal, resetSave: resetSaveGoal } = useGoalProvider()

    const visible = `month-form-${startDate}`
    const containerRef = useRef(null)
    const monthDaysFormRef = useRef(null)
    const buttonRef = useRef(null)

    useOutsideClick(monthDaysFormRef, () => {
        if (isMonthsFormVisible) toggleVisibility(visibilityMap(visible, { remove: true }))
    })

    /** * @param {React.RefObject<HTMLElement>} elementRef */
    const handleCalculatePosition = (elementRef) => {
        calculatePosition(elementRef.current, containerRef.current)
    }

    const handleButtonActionClick = () => {
        toggleVisibility(visibilityMap(visible))
        handleCalculatePosition(buttonRef)
    }

    const resetMutation = useCallback(() => {
        const resetSaveMap = {
            goal: () => resetSaveGoal(),
            assignment: () => resetSaveAssignment(),
        }
        resetSaveMap[model.typeModel]()
    }, [resetSaveGoal, resetSaveAssignment, model.typeModel])

    const isLoading = !!savingGoal || !!savingAssignment
    const isMonthsFormVisible = visibleElements.includes(visible)
    const isSuccess = !!saveGoalSuccess || !!saveAssignmentSuccess

    useEffect(() => {
        if (isSuccess && isMonthsFormVisible) {
            resetMutation()
            toggleVisibility(visibilityMap(visible, { remove: true }))
        }
    }, [isSuccess, isMonthsFormVisible, toggleVisibility, resetMutation, visible])

    return (
        <div className='title' ref={containerRef}>
            <label>{title}</label>
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
                        model={model}
                        startDate={startDate}
                        ref={monthDaysFormRef}
                        setModel={setModel}
                        saveGoal={saveGoal}
                        saveAssignment={saveAssignment}
                        pendingState={isLoading}
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