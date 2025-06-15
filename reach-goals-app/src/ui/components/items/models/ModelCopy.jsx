import { useEffect, useState } from 'react'

import { useGetModel } from '../../../../hook/useGetModel'

//THIS COMPONENT WILL BE A VISUAL REFENCE TO COPY SOME LAYOUT (MAYBE events) OF A REAL MODEL. IT REPLACE THE 'uiLayout.js'

const ModelCopy = ({ typeModel, modelID }) => {
    //The ideia is try to use the hook data 'useGetModel' to push on 'modelsRender' each new model atualized by hook. So 'model' is 'useGetModel'
    const [modelsRender, setModelsRender] = useState([])

    const requestPropsGetModel = {
        type: typeModel ?? null,
        goalSomeID: modelID ?? null,
    }

    const { params: getParams, data: getData } = useGetModel(requestPropsGetModel)

    useEffect(() => {
        if (modelID) {
            setModelsRender([...modelsRender, ...getData])
        }
    }, [modelID])

    console.log('MODEL COPY DATA - ', modelsRender)
    return (
        console.log('MODEL COPY IN ACTION - ', modelsRender)
    )
}

export default ModelCopy