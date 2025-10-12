import { useContext, useEffect } from 'react'

import { VisibilityContext } from '../../../../../provider/VisibilityProvider'

import { iconMap, targetMap } from '../../../../../utils/mapping/mappingUtils'

const MessagePopup = (props) => {
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)
    const message = props?.message
    const timer = typeof props?.timer !== 'number' ? 5000 : props?.timer
    const messagePopupReady = visibleElements.includes('message-popup')

    // toggleVisibility(targetMap('message-popup', { add: true }))

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         toggleVisibility(targetMap('message-popup', { remove: true }))    
    //     }, timer)

    //     return () => clearTimeout(timeout)  
    // }, [timer])

    return (
        typeof message === 'string' && message !== '' && messagePopupReady ?
            <div className='message-popup'>
                <span>{message}</span>
                {iconMap['close']}
            </div>
            : null
    )
}

export default MessagePopup