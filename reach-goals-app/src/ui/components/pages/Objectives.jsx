import React, { useContext } from 'react'
import { TitleContext } from '../../../provider/TitleProvider.jsx'

import ExpandableBox from '../items/box/ExpandableBox.jsx'

const Objectives = () => {
    const { update } = useContext(TitleContext)

    React.useEffect(() => {
        update('Manage your goals and assingments')
    }, [update])

    return (
        <div className='container-objectives'>
            <ExpandableBox containerType='objectives' />
        </div>
    )
}

export default Objectives