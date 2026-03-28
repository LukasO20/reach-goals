import './Loading.scss'

export const LoadingMap = {
    mode: 'inline',
    title: ''
}

/**
 * @param {Object} LoadingMap
 * @param {'inline'|'block'} LoadingMap.mode
 * @param {string} LoadingMap.title
 */

const Loading = ({ mode, title } = LoadingMap) => {
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