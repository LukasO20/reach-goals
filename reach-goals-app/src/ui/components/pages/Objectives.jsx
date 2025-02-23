import React, { useContext } from 'react'
import { TitleContext } from '../../../hooks/TitleProvider'

const Objectives = () => {
    const { update } = useContext(TitleContext)

    React.useEffect(() => {
        update('Manage your goals and assingments')
    }, [update])

    return (
        <div className='container-objectives'>
            <h1>I'M editor</h1>
        </div>
    )
}

export default Objectives