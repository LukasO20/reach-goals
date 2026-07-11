import { useNavigate } from 'react-router-dom'

import { useVisibility } from '../../../provider/ui/visibility-provider'
import { useSwitchLayout } from '../../../provider/ui/switch-layout-provider'

import Icons from '../icons'

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
    icon,
    title
}) => {
    const navigate = useNavigate()
    const { toggleVisibility } = useVisibility()
    const { setSwitchLayout } = useSwitchLayout()

    const handleClick = (e) => {
        e.stopPropagation()

        if (target) toggleVisibility(target, e)
        if (switchLayout) setSwitchLayout(switchLayout)
        if (onClick && typeof onClick === 'function') onClick({ e }) // execute external function from 'onClick' external attribute    

        navigate(`${link || '/'}`)
    }

    const hasTitle = !!title

    return (
        <span className={`button-link ${classBtn}`} onClick={handleClick}>
            {img ? <img src={img} alt={imgAlt} /> : <Icons icon={icon} />}
            {hasTitle && (
                <span className='button-title'>
                    {title}
                </span>
            )}
        </span>
    )
}

export default ButtonLink