import { useContext, useEffect, useState } from 'react'

import { VisibilityContext } from '../../../../../provider/VisibilityProvider'
import { useTitle } from '../../../../../provider/TitleProvider'

import { targetMap } from '../../../../../utils/mapping/mappingUtils'

import ButtonAction from '../ButtonAction/ButtonAction'

import './MessageToast.scss'

const MessageToast = (props) => {
    const [toastReady, setToastReady] = useState(false)
    const { title, update } = useTitle()
    const { visibleElements, toggleVisibility } = useContext(VisibilityContext)

    useEffect(() => {
        const isVisible = visibleElements.includes('message-toast')

        if (isVisible) {
            setToastReady(true)

            const timeout = setTimeout(() => {
                const element = document.querySelector('[data-slot="message-toast"]')
                if (element?.classList.contains('message-toast')) {
                    update({ toast: '' })
                    toggleVisibility(targetMap('message-toast', { remove: true }))
                    setToastReady(false)
                }
            }, 7500)

            return () => clearTimeout(timeout)
        }
    }, [visibleElements])

    useEffect(() => {
        typeof title.toast === 'string' && title.toast !== '' && toggleVisibility(targetMap('message-toast', { add: true }))
    }, [title.toast])

    const hideToast = () => {
        setToastReady(false)
        toggleVisibility(targetMap('message-toast', { remove: true }))
    }

    return (
        toastReady ?
            <div className='message-toast' data-slot='message-toast'>
                <span className='title'>{title.toast}</span> 
                <ButtonAction classBtn='button-action circle close' icon='close' onClick={hideToast} />
            </div>
            : null
    )
}

export default MessageToast