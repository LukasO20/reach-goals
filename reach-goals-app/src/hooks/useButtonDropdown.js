import { useMemo, useCallback } from 'react'

/**
 * @typedef {Object} DropdownOption
 * @property {string} title
 * @property {string} icon
 * @property {function():void} onClick
 */

/**
 * @typedef {Object} DropdownActions
 * @property {function(string):void} setterUseVisiblity 
 * @property {function():void} setterUseSwitchLayout
 * @property {function():void} setterUseTheme
 */

/**
 * @typedef {Object} UseButtonDropdownProps
 * @property {Object | null} value
 * @property {'create-dropdown' | 'visibility-dropdown' | 'more-dropdown' | 'theme-dropdown'} type
 * @property {DropdownActions} actions
 * @property {boolean} [isPageObjectives]
 * @property {boolean} [isPageCalendar]
 */

/**
 * @param {UseButtonDropdownProps} props
 * @returns {DropdownOption[] | null}
 */
export const useButtonDropdown = ({ type, value, actions, isPageObjectives, isPageCalendar }) => {
    const { setterUseSwitchLayout, setterUseVisiblity, setterUseTheme } = actions

    const handleActions = useCallback((target) => {
        if (typeof setterUseSwitchLayout === 'function') setterUseSwitchLayout(target)
        if (typeof setterUseVisiblity === 'function') setterUseVisiblity(target)
        if (typeof setterUseTheme === 'function') setterUseTheme(target)
    }, [setterUseSwitchLayout, setterUseVisiblity, setterUseTheme])

    return useMemo(() => {
        if (type === 'create-dropdown') {
            return [
                {
                    title: 'Goal',
                    icon: 'icon-plus',
                    onClick: () => handleActions('goal')
                },
                {
                    title: 'Assignment',
                    icon: 'icon-plus',
                    onClick: () => handleActions('assignment')
                }
            ]
        }

        if (type === 'more-dropdown') {
            return [
                {
                    id: 'switch-cards',
                    classBtn: value.cards === 'card' ? 'active' : '',
                    title: `Switch to ${value.cards === 'card' ? 'card-mini' : 'card'}`,
                    icon: 'cardmini',
                    uiMode: 'button-toggle',
                    onClick: () => handleActions({ 
                        type: 'visibility', 
                        data: { cards: value.cards === 'card' ? 'card-mini' : 'card' } 
                    })
                },
                isPageObjectives && [
                    {
                        id: 'switch-columns-less',
                        classBtn: value.columns === 'column-2x2' ? 'active' : '',
                        title: `${value.columns === 'column-2x2' ? 'Remove' : 'Apply'} to columns 2x2`,
                        icon: value.columns === 'column-2x2' ? 'icon-columns-off' : 'icon-column-2x2',
                        onClick: () => handleActions({ 
                            type: 'visibility', 
                            data: { columns: value.columns === 'column-2x2' ? null : 'column-2x2' } 
                        })
                    },
                    {
                        id: 'switch-columns-more',
                        classBtn: value.columns === 'column-3x3' ? 'active' : '',
                        title: `${value.columns === 'column-3x3' ? 'Remove' : 'Apply'} to columns 3x3`,
                        icon: value.columns === 'column-3x3' ? 'icon-columns-off' : 'icon-column-3x3',
                        onClick: () => handleActions({ 
                            type: 'visibility', 
                            data: { columns: value.columns === 'column-3x3' ? null : 'column-3x3' } 
                        })
                    }
                ]
            ].filter(Boolean)
        }

        if (type === 'visibility-dropdown') {
            return [
                !isPageCalendar &&
                {
                    id: 'hide-tags',
                    classBtn: value.tagsCard ? 'active' : '',
                    title: `${value.tagsCard ? 'Hide' : 'Show'} tags`,
                    icon: value.tagsCard ? 'icon-tag' : 'icon-tag-off',
                    onClick: () => handleActions({ type: 'visibility', data: { tagsCard: !value.tagsCard } })
                },
                {
                    id: 'progress-status',
                    classBtn: value.status?.includes('progress') ? 'active' : '',
                    title: `${value.status?.includes('progress') ? 'Hide' : 'Show'} progress activity`,
                    icon: value.status?.includes('progress') ? 'icon-progress' : 'icon-progress-off',
                    onClick: () => handleActions({ type: 'visibility', data: { status: ['progress'] } })
                },
                {
                    id: 'conclude-status',
                    classBtn: value.status?.includes('conclude') ? 'active' : '',
                    title: `${value.status?.includes('conclude') ? 'Hide' : 'Show'} conclude activity`,
                    icon: value.status?.includes('conclude') ? 'icon-conclude' : 'icon-conclude-off',
                    onClick: () => handleActions({ type: 'visibility', data: { status: ['conclude'] } })
                },
                {
                    id: 'cancel-status',
                    classBtn: value.status?.includes('cancel') ? 'active' : '',
                    title: `${value.status?.includes('cancel') ? 'Hide' : 'Show'} cancel activity`,
                    icon: value.status?.includes('cancel') ? 'icon-cancel' : 'icon-cancel-off',
                    onClick: () => handleActions({ type: 'visibility', data: { status: ['cancel'] } })
                },
            ].filter(Boolean)
        }

        if (type === 'theme-dropdown') {
            return [
                {
                    id: 'light-theme',
                    classBtn: value === 'light' ? 'active' : '',
                    title: 'Light Theme',
                    icon: 'icon-color-pallet',
                    onClick: () => handleActions('light')
                },
                {
                    id: 'dark-theme',
                    classBtn: value === 'dark' ? 'active' : '',
                    title: 'Dark Theme',
                    icon: 'icon-color-pallet',
                    onClick: () => handleActions('dark')
                }
            ]
        }

        return null
    }, [type, handleActions, isPageObjectives, isPageCalendar, value])
}