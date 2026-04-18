import './style.scss'

/** @typedef {import('./types.js').LoadingProps} Props */

/**
 * @param {Props} props
 */
const Loading = ({ mode, title }) => {
    return (
        <>
            {
                mode === 'inline' ?
                    (<div className='spinner-inline'>
                        <div className='spinner'></div>
                        {!!title && (<label>{title}</label>)}
                    </div>)
                    :
                    (<div className='spinner-overlay'>
                        <div className='spinner'></div>
                    </div>)
            }
        </>
    )
}

export default Loading