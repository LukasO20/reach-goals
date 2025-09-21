import { useEffect } from 'react'

import { useTitle } from '../../../../provider/TitleProvider.jsx'

import ExpandableBox from '../../items/elements/ExpandableBox/ExpandableBox.jsx'

import '../Objectives/Objectives.scss'

const Objectives = () => {
    const { update } = useTitle()

    useEffect(() => {
        update('Manage your goals and assingments')
    }, [update])

    return (
        <div className='container-objectives'>
            <ExpandableBox containerType='objectives' />
        </div>
    )
}

export default Objectives