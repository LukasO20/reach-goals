import { useEffect, useState } from 'react'

const ONE_SECOND = 1000

const formatTime = (milliseconds) => {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / ONE_SECOND))

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0'),
    ].join(':')
}

export const useCountdown = (timestamp) => {
    const [remaining, setRemaining] = useState(() => {
        if (!timestamp) return 0

        return Math.max(0, new Date(timestamp).getTime() - Date.now())
    })

    useEffect(() => {
        if (!timestamp) {
            setRemaining(0)
            return
        }

        const expirationTime = new Date(timestamp).getTime()

        const update = () => {
            const difference = expirationTime - Date.now()

            setRemaining(Math.max(0, difference))
        }

        update()

        const interval = setInterval(update, ONE_SECOND)

        return () => clearInterval(interval)
    }, [timestamp])

    return {
        milliseconds: remaining,
        seconds: Math.floor(remaining / ONE_SECOND),
        formatted: formatTime(remaining),
        isExpired: remaining <= 0,
    }
}
