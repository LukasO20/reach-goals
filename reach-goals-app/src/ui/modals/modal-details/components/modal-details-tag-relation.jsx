import Icons from '../../../items/elements/icons'

/** @typedef {import('../types.js').ModalDetailsTagRelationProps} Props */

/**
 * @param {Props} props
 */
const ModalDetailsTagRelation = ({ type, tags = [] }) => {

    const labelTagHead = tags.length <= 1 ? `${tags.length} Tag` : `${tags.length} Tags`
    const hasTags = !!tags.length

    return (
        <div className={`${type}-tags`}>
            <div className='head'>
                <Icons icon='icon-tag' />
                <label>{labelTagHead}</label>
            </div>
            {hasTags && (
                <div className='body scrollable'>
                    {tags.map(({ tag }) => {
                        const styleProps = { backgroundColor: `${tag.color}30`, borderColor: tag.color }

                        return (
                            <label className='tag-card' key={tag.id} style={styleProps}>
                                {tag.name}
                            </ label>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default ModalDetailsTagRelation