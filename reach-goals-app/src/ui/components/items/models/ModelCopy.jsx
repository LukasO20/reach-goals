import { useEffect } from 'react'

//THIS COMPONENT WILL BE A VISUAL REFENCE TO COPY SOME LAYOUT (MAYBE events) OF A REAL MODEL. IT REPLACE THE 'uiLayout.js'

const ModelCopy = ({ model }) => {
    //The ideia is try to use the hook data 'useGetModel' to push on 'modelsRender' each new model atualized by hook. So 'model' is 'useGetModel'
    const [modelsRender, setModelsRender] = useState([])

    useEffect(() => {
        if (model) {
            setModelsRender([...modelsRender, model])
        }
    }, [model])

    return (
        console.log('MODEL COPY IN ACTION - ', modelsRender)
    )
}

export default ModelCopy