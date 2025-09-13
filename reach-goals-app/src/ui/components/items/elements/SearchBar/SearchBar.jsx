import { iconMap } from '../../../../../utils/mapping/mappingUtils'

import '../SearchBar/SearchBar.scss'

const SearchBar = (props) => {
    return (
        <label className='search-bar'>
            {iconMap['search']}<input type='text' placeholder='search' id='search-content-m' className='search-content' />
        </label>
    )
}

export default SearchBar