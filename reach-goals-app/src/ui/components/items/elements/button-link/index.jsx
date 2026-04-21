import { useNavigate } from 'react-router-dom'

import { useVisibility } from '../../../../../provider/ui/visibility-provider.jsx'
import { useSwitchLayout } from '../../../../../provider/ui/switch-layout-provider.jsx'

import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'

import './style.scss'

/** @typedef {import('./types.js').ButtonLinkProps} Props */

/**
 * @param {Props} props
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
}) => {
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