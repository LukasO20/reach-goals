import { useContext, useEffect, useState } from 'react'

import { VisibilityContext } from '../../../../../provider/VisibilityProvider'
import { useTitle } from '../../../../../provider/TitleProvider'

import { iconMap, targetMap } from '../../../../../utils/mapping/mappingUtils'

import './MessageToast.scss'

const MessageToast = (props) => {
    const [toastReady, setToastReady] = useState(false)
    const { title } = useTitle()
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)

    useEffect(() => {
        const isVisible = visibleElements.includes('message-toast')

        if (isVisible) {
            setToastReady(true)

            const timeout = setTimeout(() => {
                const element = document.querySelector('[data-slot="message-toast"]')
                if (element?.classList.contains('message-toast')) {
                    toggleVisibility(targetMap('message-toast', { remove: true }))
                    setToastReady(false)
                }
            }, 5000)

            return () => clearTimeout(timeout)
        }
    }, [visibleElements])

    return (
        toastReady ?
            <div className='message-toast' data-slot='message-toast'>
                <span>{title.toast}</span> {iconMap['close']}
            </div>
            : null
    )
}

export default MessageToast