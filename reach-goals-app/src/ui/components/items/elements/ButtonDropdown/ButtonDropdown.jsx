import { useVisibility } from '../../../../../provider/VisibilityProvider.jsx'
import { useManageModel } from '../../../../../provider/ManageModelProvider.jsx'

import { visibilityMap, switchLayoutMap } from '../../../../../utils/mapping/mappingUtils.js'
import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'

import { cx } from '../../../../../utils/utils.js'

import ButtonAction from '../ButtonAction/ButtonAction.jsx'

import '../ButtonDropdown/ButtonDropdown.scss'

export const ButtonDropdownMap = {
    visibility: {},
    reference: '',
    changeDropdownValue: () => { },
    icon: '',
    classBtn: '',
    title: '',
    arrow: false
}

/**
 * @param {Object} ButtonDropdownMap
 * @param {Object} ButtonDropdownMap.visibility
 * @param {string} ButtonDropdownMap.reference
 * @param {Function} ButtonDropdownMap.changeDropdownValue
 * @param {string} ButtonDropdownMap.icon
 * @param {string} ButtonDropdownMap.classBtn
 * @param {string} ButtonDropdownMap.title
 * @param {boolean} ButtonDropdownMap.arrow
 */

const mapOptionDropdown = (type) => {
    if (type === 'status') {
        return [
            {
                op: 'progress',
                title: 'in progress',
                icon: 'progress'
            },
            {
                op: 'conclude',
                title: 'concluded',
                icon: 'check',
            },
            {
                op: 'cancel',
                title: 'canceled',
                icon: 'cancel',
            },
        ]
    }
}

const NullObject = (value) => {
    return (Array.isArray(value) || typeof value === "string") && value.length !== 0
}

const ButtonDropdown = ({
    visibility,
    reference,
    changeDropdownValue,
    icon,
    classBtn,
    title,
    arrow
} = ButtonDropdownMap) => {
    const { visibleElements, toggleVisibility } = useVisibility()
    const { model } = useManageModel()

    const typeClass = visibility.class !== undefined ? visibility.class[0] : null
    const dropdownStatus = typeClass.includes('goal-status') || typeClass.includes('assignment-status')
    const isCreateDropdown = typeClass === 'btn-action-create'

    let titleDropdown = undefined
    let optionsDropdown = undefined
    let classTargetDropdown = undefined

    const dropdownActionClick = ({ datavalue }) => {
        if (datavalue) {
            if (typeof changeDropdownValue === 'function' && dropdownStatus) {
                changeDropdownValue({ name: 'status', value: datavalue })
            }
        }
    }

    const defineDropdown = () => {
        switch (typeClass) {
            case 'btn-action-create':
                titleDropdown = 'Create objectives'
                optionsDropdown = [
                    {
                        op: 'goal',
                        title: 'goal',
                        icon: 'plus'
                    },
                    {
                        op: 'assignment',
                        title: 'assignment',
                        icon: 'plus'
                    }
                ]
                break
            case 'goal-status':
                titleDropdown = 'Select status'
                optionsDropdown = mapOptionDropdown('status')
                break
            case 'assignment-status':
                titleDropdown = 'Select status'
                optionsDropdown = mapOptionDropdown('status')
                break
            default:
                return null
        }
    }

    const dropdownMenuClass = cx(
        `dropdown-menu
        ${!!classBtn?.includes('left') && 'left'}
        ${visibleElements.includes(typeClass) && 'show'}
        `
    )

    return (
        <div className={`button-dropdown ${classBtn}`}
            onClick={(e) => toggleVisibility(visibility, e)}
            onKeyDown={(e) => e.key === 'Enter' ? toggleVisibility(visibility, e) : ''}
            role='button'
            tabIndex='0'
        >
            <div className='dropdown-title'>
                <label>
                    {icon && iconMap[icon]}
                    {title}
                </label>
                {arrow && <label>{iconMap['arrowdown']}</label>}
            </div>
            <div className={dropdownMenuClass} onClick={(e) => e.stopPropagation()}>
                {defineDropdown()}
                <div className='dropdown-item item-element'>
                    <div className='section-options'>
                        {NullObject(titleDropdown) && <span>{titleDropdown}</span>}
                        {NullObject(optionsDropdown) &&
                            optionsDropdown.map((option, index) => {
                                switch (reference) {
                                    case 'modal-center':
                                        classTargetDropdown = [[reference, `${option.op}`]]
                                        break
                                    default:
                                        classTargetDropdown = [null, { remove: true }]
                                        break
                                }

                                return (
                                    <div className={`option ${option.op}`} key={`op-${index}`}>
                                        <div className='item-option'>
                                            <div className='item-title'>
                                                <ButtonAction
                                                    onClick={dropdownActionClick} datavalue={dropdownStatus ? option.op : null}
                                                    visibility={visibilityMap(...classTargetDropdown)}
                                                    switchLayout={switchLayoutMap({ area: 'modal', state: { modalName: 'modal-center', layoutName: 'form' } })}
                                                    classBtn={`form-${option.op} 
                                                            plan-round 
                                                            ${model.formModel?.status === option.op ? 'active' : ''
                                                        }`}
                                                    icon={option.icon} title={`${option.title}`} type={option.op} nullForm={isCreateDropdown}
                                                />
                                            </div>
                                            <div className='item-details'></div>
                                        </div>
                                        <div className='item-option-style'></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ButtonDropdown