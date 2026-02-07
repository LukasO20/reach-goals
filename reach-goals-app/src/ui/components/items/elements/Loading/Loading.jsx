import PropTypes from 'prop-types'

import '../Loading/Loading.scss'

const Loading = ({ mode, title }) => {
    return (
        <>
            {
                mode === 'inline' ?
                    <div className='spinner-inline'>
                        <div className='spinner'></div>
                        {!!title && (<label>{title}</label>)}
                    </div>
                    :
                    <div className='spinner-overlay'>
                        <div className='spinner'></div>
                    </div>
            }
        </>
    )
}

Loading.propTypes = {
    mode: PropTypes.oneOf(['inline', 'block']).isRequired,
    title: PropTypes.string
}

export default Loading