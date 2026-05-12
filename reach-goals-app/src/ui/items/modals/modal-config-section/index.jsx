const modalItem = (type) => {
    let layout = undefined
    switch (type) {
        case 'config-theme':
            layout = <div className='sec-theme sec'>
                <h3>Configurations of theme section</h3>
            </div>
            break
        case 'config-search':
            layout = <div className='sec-search sec'>
                <h3>Configurations of search section</h3>
            </div>
            break
        case 'config-layout':
            layout = <div className='sec-layout sec'>
                <h3>Configurations of layout section</h3>
            </div>
            break
        default:
            return null
    }

    return layout
}

const ModalConfigSection = (props) => {
    const typeSection = props.type

    return (
        <div className='section-modal config'>
            {modalItem(typeSection)}
        </div>
    )
}

export default ModalConfigSection