import { Link } from 'react-router-dom'

import { useSwitchLayout } from '../../../../../provider/SwitchLayoutProvider.jsx'

import { iconMap } from '../../../../../utils/mapping/mappingUtils.js'

import '../ButtonLink/ButtonLink.scss'

const ButtonLink = (props) => {
    const { switchLayoutComponent } = useSwitchLayout()

    const handleClick = (e) => {
        e.stopPropagation()
        if (props.switchLayout) { switchLayoutComponent(props.switchLayout) }
    }

    return (
        <Link to={`${props.link !== undefined ? props.link : '/'}`} className={props.classBtn} onClick={handleClick}>
            {props.img !== undefined ?
                <img src={props.img} alt={props.imgAlt} /> :
                iconMap[props.icon]
            }
        </Link>
    )
}

export default ButtonLink