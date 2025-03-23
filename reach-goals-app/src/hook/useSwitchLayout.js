import { useContext } from 'react'
import { SwitchLayoutContext } from '../provider/SwitchLayoutProvider'

export const useSwitchLayout = () => {
    const context = useContext(SwitchLayoutContext)
    if (!context) {
        throw new Error('This hook need to be used of a "SwitchLayoutProvider"')
    }
    return context
}