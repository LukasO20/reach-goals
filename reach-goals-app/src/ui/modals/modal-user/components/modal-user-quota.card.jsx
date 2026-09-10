import { QUOTAGOALEXCEEDED, QUOTAMODELEXCEEDED } from '../defaults.js'

import Icons from '../../../elements/icons'

/** @typedef {import('../types.js').ModalUserQuotaCardProps & React.HTMLAttributes<HTMLDivElement>} Props */

/**
 * @param {Props} props
 */
const ModalUserQuotaCard = ({ quotaModel }) => {
    return (
        <div className='quota-card'>
            <div className='item'>
                <label className='title'>
                    <Icons icon='icon-goal' size='medium' />
                    Goal
                </label>
                <label className='quota-label'>
                    {quotaModel.registry.goal}/{QUOTAGOALEXCEEDED}
                </label>
            </div>
            <div className='item'>
                <label className='title'>
                    <Icons icon='icon-assignment' size='medium' /> Assignment
                </label>
                <label className='quota-label'>
                    {quotaModel.registry.assignment}/{QUOTAMODELEXCEEDED}
                </label>
            </div>
            <div className='item'>
                <label className='title'>
                    <Icons icon='icon-tag' size='medium' /> Tag
                </label>
                <label className='quota-label'>
                    {quotaModel.registry.tag}/{QUOTAMODELEXCEEDED}
                </label>
            </div>
        </div>
    )
}

export default ModalUserQuotaCard
