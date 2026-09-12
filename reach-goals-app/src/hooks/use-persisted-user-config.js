import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../utils/db'

export const usePersistedUserConfig = (key, defaultValue) => {
    const config = useLiveQuery(() => db.configs.get(key), [key])

    const setConfig = async (newValue) => {
        try {
            await db.configs.put({ key, value: newValue })
        }
        catch (error) {
            console.error('Error saving user config:', error)
        }
    }

    const currentValue = config ? config.value : defaultValue
    return [currentValue, setConfig]
}