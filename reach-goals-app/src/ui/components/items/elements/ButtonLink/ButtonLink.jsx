import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'
import { VisibilityContext } from '../../../../../provider/VisibilityProvider.jsx'

import { iconMap } from '../../../../../utils/mapping/mappingUtils.js'

import '../ButtonLink/ButtonLink.scss'

const ButtonLink = (props) => {
    const navigate = useNavigate()
    const { switchLayoutComponent } = useSwitchLayout()
    const { toggleVisibility } = useContext(VisibilityContext)

    const handleClick = (e) => {
        e.stopPropagation()

        if (props.switchLayout) switchLayoutComponent(props.switchLayout)
        if (props.target) toggleVisibility(props.target, e)

        if (props.onClick && typeof props.onClick === 'function') {
            props.onClick({ props, e }) // execute external function from 'onClick' external attribute    
        }

        navigate(`${props.link || '/'}`)
    }

    return (
        <span className={props.classBtn} onClick={handleClick}>
            {
                props.img ?
                    <img src={props.img} alt={props.imgAlt} /> :
                    iconMap[props.icon]
            }
        </span>
    )
}

export default ButtonLink