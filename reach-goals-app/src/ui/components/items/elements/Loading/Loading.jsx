import '../Loading/Loading.scss'

const Loading = (props) => {
    const { mode } = props

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

export default Loading