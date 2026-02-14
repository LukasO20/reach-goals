import { useNavigate } from 'react-router-dom'

import { useVisibility } from '../../../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import { iconMap } from '../../../../../utils/mapping/mappingUtils.js'

import PropTypes from 'prop-types'

import '../ButtonLink/ButtonLink.scss'

const ButtonLink = ({ target, switchLayout, onClick, link, classBtn, img, imgAlt, icon }) => {
    const navigate = useNavigate()
    const { toggleVisibility } = useVisibility()
    const { updateSwitchLayout } = useSwitchLayout()

    const handleClick = (e) => {
        e.stopPropagation()

        if (target) toggleVisibility(target, e)
        if (switchLayout) updateSwitchLayout(switchLayout)
        if (onClick && typeof onClick === 'function') {
            onClick({ e }) // execute external function from 'onClick' external attribute    
        }

        navigate(`${link || '/'}`)
    }

    return (
        <span className={classBtn} onClick={handleClick}>
            { img ? <img src={img} alt={imgAlt} /> : iconMap[icon] }
        </span>
    )
}

ButtonLink.propTypes = {
    target: PropTypes.func,
    onClick: PropTypes.func,
    link: PropTypes.string.isRequired,
    classBtn: PropTypes.string,
    img: PropTypes.string,
    imgAlt: PropTypes.string,
    icon: PropTypes.string 
}

export default ButtonLink