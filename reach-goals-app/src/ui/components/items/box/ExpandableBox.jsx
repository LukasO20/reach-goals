import Goal from '../models/Goal'
import ButtonAction from '../elements/ButtonAction'

const switchExpandableBox = (type, containerType) => {
    switch (type) {
        case 'goal':
            return
        default:
            return (
                <>
                    <div className={`box-list goal ${containerType}`}>
                        <div className='head'>
                            <label>Goals without relation</label>
                            <ButtonAction classBtn='button-expand goal' iconFa='fa-solid fa-chevron-down' />
                        </div>
                        <div className='body'>
                            <Goal notAssignmentRelation={true} />
                        </div>
                    </div>
                    <div className={`box-list goal-assignment ${containerType}`}>
                        <div className='head'>
                            <label>Goals with assignments</label>
                            <ButtonAction classBtn='button-expand goal' iconFa='fa-solid fa-chevron-down' />
                        </div>
                        <div className='body'>
                            <Goal assignmentRelation={true} />
                        </div>
                    </div>
                </>
            )
    }
}

const ExpandableBox = (props) => {
    const type = props?.type
    const containerType = props?.containerType

    return (
        switchExpandableBox(type, containerType)
    )
}

export default ExpandableBox