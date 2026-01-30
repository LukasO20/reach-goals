import { useEffect, useState } from 'react'

import { useTitle } from '../../../../../provider/TitleProvider'

import ButtonAction from '../ButtonAction/ButtonAction'

import './MessageToast.scss'

const MessageToast = () => {
    const [toastReady, setToastReady] = useState(false)
    const { title, update } = useTitle()

    useEffect(() => {
        if (toastReady) {
            const timeout = setTimeout(() => {
                const element = document.querySelector('[data-slot="message-toast"]')
                if (element?.classList.contains('message-toast')) {
                    update({ toast: '' })
                    setToastReady(false)
                }
            }, 7500)

            return () => clearTimeout(timeout)
        }
    }, [toastReady, update])

    useEffect(() => {
        !!title.toast && setToastReady(true)
    }, [title.toast])

    const hideToast = () => setToastReady(false)

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