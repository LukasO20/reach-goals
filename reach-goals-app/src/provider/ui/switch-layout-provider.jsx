import { useState, useContext, createContext, useCallback, useMemo } from 'react'

import { usePersistedUserConfig } from '../../hooks/usePersistedUserConfig'

import { switchLayoutMap } from '../../utils/mapping/mappingUtilsProvider'
import { persistedUserConfigKeysMap, persistedUserConfigMap } from '../../utils/mapping/mappingUtils'

/**
* @typedef {Object} SetUserConfigLayoutProps
* @property {'visibility'} type
* @property {import('../../utils/types').VisibilityConfigProps} data
*/

/**
* @typedef {Object} OutputProps
* @property {import('../../utils/types').VisibilityConfigProps} visibility
*/

/**
 * @typedef {Object} SwitchLayoutContextValue
 * @property {function(SetUserConfigLayoutProps): void} setUserConfigLayout
 */

/** @type {import('react').Context<SwitchLayoutContextValue>} */
const SwitchLayoutContext = createContext()

export const SwitchLayoutProvider = ({ children }) => {
    const [layout, setLayout] = useState(switchLayoutMap)
    const [uiVisibility, setVisibility] = usePersistedUserConfig(persistedUserConfigKeysMap.visibility, persistedUserConfigMap.visibility)

    const update = (switcher) => {
        if (switcher.area && switcher.state) {
            setLayout((prev) => ({
                ...prev,
                [switcher.area]: {
                    ...prev[switcher.area],
                    ...switcher.state
                }
            }))
        }
    }

    //TODO: CHANGE NAME TO SET BESIDES UDPATE
    const updateSwitchLayout = useCallback(({ area, state }, e) => {
        e?.stopPropagation()
        update({ area, state })
    }, [])

    const setUserConfigLayout = useCallback(
        /** @param {SetUserConfigLayoutProps} props */
        ({ type, data }) => {
            if (typeof data === 'object') {
                const isStatusKey = Object.keys(data)[0] === 'status'

                if (isStatusKey) {
                    const hasStatus = uiVisibility.status?.some(status => data.status.includes(status))
                    setVisibility({
                        ...uiVisibility, status: hasStatus ?
                            uiVisibility.status.filter(status => !data.status.includes(status)) :
                            [...uiVisibility.status, ...data.status]
                    })
                }

                if (type === 'visibility' && !isStatusKey) setVisibility({ ...uiVisibility, ...data })
            }

            return null
        }, [setVisibility, uiVisibility])

    const output = useMemo(() => {
        return {
            layout,
            visibility: uiVisibility,
        }
    }, [layout, uiVisibility])

    const value = useMemo(() => ({ data: output, updateSwitchLayout, setUserConfigLayout }), [updateSwitchLayout, setUserConfigLayout, output])

    return (
        <SwitchLayoutContext.Provider value={value}>
            {children}
        </SwitchLayoutContext.Provider>
    )
}

export const useSwitchLayout = () => useContext(SwitchLayoutContext)