import { useManageModel } from '../../../provider/model/manage-model-provider'
import { useTitle } from '../../../provider/ui/title-provider'
import { useTheme } from '../../../provider/ui/theme-provider'
import { useButtonDropdown } from '../../../hooks/useButtonDropdown.js'

import { visibilityMap, switchLayoutMap } from '../../../utils/mapping/mappingUtils.js'

import ButtonAction from '../../elements/button-action'
import ButtonDropdown from '../../elements/button-dropdown'
import SearchBar from '../../elements/search-bar'
import Tooltip from '../../elements/tooltip'

import './style.scss'

const ContainerHeader = () => {
    const { title } = useTitle()
    const { setModel } = useManageModel()
    const { theme, setTheme } = useTheme()

    const linkTagClick = (e) => {
        if (e) setModel(prev => ({ ...prev, typeModel: 'tag' }))
    }

    const themeDropdown = useButtonDropdown({
        type: 'theme-dropdown',
        value: theme,
        actions: { setterUseSwitchLayout: (target) => setTheme(target) }
    })

    return (
        <div className='container-header main-content'>
            <h1>{title.header}</h1>
            <div className='nav'>
                <div className='item-nav'>
                    <SearchBar mode='service' placeholder='search an activity' tooltip='Search activities' />
                </div>
                <div className='item-nav'>
                    <Tooltip title='Tags panel'>
                        <ButtonAction
                            onClick={linkTagClick} 
                            visibility={visibilityMap(['modal-right', 'tag'])}
                            switchLayout={switchLayoutMap({ area: 'modal', layout: { modalName: 'modal-right', layoutName: 'tag' } })}
                            classBtn='circle tag' 
                            icon='icon-tag'
                        />
                    </Tooltip>
                </div>
                <div className='item-nav'>
                    <ButtonDropdown
                        visibility='dropdown-theme'
                        classBtnAction='circle'
                        classBtn='theme'
                        icon='icon-themes'
                        options={themeDropdown}
                        tooltip='Themes'
                    />
                </div>
            </div>
        </div>
    )
}

export default ContainerHeader
