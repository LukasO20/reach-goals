import PropTypes from 'prop-types'

import '../Loading/Loading.scss'

const Loading = ({ mode }) => {
    return (
        <>
            {
                mode === 'inline' ?
                    <div className="spinner-inline"></div>
                    :
                    <div className="spinner-overlay">
                        <div className="spinner"></div>
                    </div>
            }
        </>
    )
}

Loading.propTypes = {
    mode: PropTypes.oneOf(['inline', 'block']).isRequired
}

export default Loading