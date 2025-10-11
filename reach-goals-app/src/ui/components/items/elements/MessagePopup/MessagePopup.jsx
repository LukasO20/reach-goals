import { iconMap } from '../../../../../utils/mapping/mappingUtils'

const MessagePopup = (props) => {
    const message = props?.message
    const timer = typeof props?.timer !== 'number' ? 5000 : props?.timer

    return (
        typeof message === 'string' && message !== '' ?
            setTimeout(() => {
                <div>
                    <span>{message}</span>
                    {iconMap['remove']}
                </div>
            }, timer)
            : null
    )
}

export default MessagePopup