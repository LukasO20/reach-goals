import { iconMap } from '../../../../../utils/mapping/mappingUtils'

const SearchBar = (props) => {
    return (
        <label className='search-st'>
            {iconMap['search']}<input type='text' placeholder='search' id='search-content-m' className='search-content' />
        </label>
    )
}

export default SearchBar