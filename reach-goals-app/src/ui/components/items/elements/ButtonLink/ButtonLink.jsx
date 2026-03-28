import { useNavigate } from 'react-router-dom'

import { useVisibility } from '../../../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'

import './ButtonLink.scss'

export const ButtonLinkMap = {
    target: {},
    switchLayout: {},
    onClick: () => { },
    link: '',
    classBtn: '',
    img: '',
    imgAlt: '',
    icon: ''
}

/**
 * @param {Object} ButtonLinkMap
 * @param {Object} ButtonLinkMap.target
 * @param {Object} ButtonLinkMap.switchLayout
 * @param {Function} ButtonLinkMap.onClick
 * @param {string} ButtonLinkMap.link
 * @param {string} ButtonLinkMap.classBtn
 * @param {string} ButtonLinkMap.img
 * @param {string} ButtonLinkMap.imgAlt
 * @param {string} ButtonLinkMap.icon
 */

const ButtonLink = ({
    target,
    switchLayout,
    onClick,
    link,
    classBtn,
    img,
    imgAlt,
    icon
} = ButtonLinkMap) => {
    const navigate = useNavigate()
    const { toggleVisibility } = useVisibility()
    const { updateSwitchLayout } = useSwitchLayout()

    const handleClick = (e) => {
        e.stopPropagation()

        if (target) toggleVisibility(target, e)
        if (switchLayout) updateSwitchLayout(switchLayout)
        if (onClick && typeof onClick === 'function') onClick({ e }) // execute external function from 'onClick' external attribute    

        navigate(`${link || '/'}`)
    }

    return (
        <span className={`button-link ${classBtn}`} onClick={handleClick}>
            {img ? <img src={img} alt={imgAlt} /> : iconMap[icon]}
        </span>
    )
}

export default ButtonLink