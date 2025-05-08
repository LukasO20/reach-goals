const createElement = (region, parent, html) => {
    if (!parent && !html) { return console.error('parent/html parameter is undefined. Check them value.') } 
    parent.insertAdjacentHTML(region, html)
}

const insertModelComponent = (props, type, e) => {
    const checkElementContainer = (elementTarget, container) => {
        if (!elementTarget || !container) { console.error(`Parameter ${elementTarget ?? container} reference is null! Check parameter sended.`) }

        const childrenContainer = Array.from(container.children)
        const valueChecked = childrenContainer.length === 0 ? true : !childrenContainer.some(child => child.id === elementTarget.id)
        return valueChecked
    }

    if (props?.selectableModel) {
        if (!props?.action?.setForm) { return console.error('This model is selectable but parameter "typeModal" is needed!') }
        
        const iconModelReference = type === 'assignment' ? 'fa-list-check' : type === 'goal' ? 'fa-bullseye' : 'fa-tag'

        if (props.action.setForm) {
            const form = document.querySelector(`.content-center form`)
            const setModel = e.currentTarget       
            const containerModel = form.querySelector(`.item-forms.${type} .body`)  
            const isDefinable = checkElementContainer(setModel, containerModel)

            if (isDefinable) {
                createElement('beforeend', containerModel, 
                    `<input hidden id="${setModel.getAttribute('id')}" value="${setModel.getAttribute('id')}" />`)
                createElement('beforeend', containerModel, 
                    `<div class="${type} mini-list" id="${setModel.getAttribute('id')}">
                        <div class="head">
                            <label class="line-info">
                                <i class="icon-st fa-solid ${iconModelReference}"></i>
                                <label>${setModel.querySelector('.line-info label').textContent}</label>
                            </label>
                        </div>
                    </div>`)

                if (typeof props.exFunction === 'function') {
                    let modelSelectableReference = type === 'assignment' || type === 'tag' ? [] : undefined
                    if (type === 'assignment' || type === 'tag') {
                        Array.from(containerModel?.children).forEach(el => {
                            if (el.value) {
                                modelSelectableReference.push(el.value)
                            }
                        })
                    } 
                    else {
                        modelSelectableReference = setModel.getAttribute('id')
                    }

                    const keyTag = 'tags'
                    const keyAssignment = 'assignments'
                    const keyGoal = 'goal'
    
                    const currentKey = type === 'assignment' ? keyAssignment : type === 'goal' ? keyGoal : keyTag
                    const modelSelectable = {
                        [currentKey]: modelSelectableReference
                    }

                    console.log('ARRRRAY 0 ', modelSelectable)
                    props.exFunction(modelSelectable)
                }
            }
        }
    }
}

export { createElement, insertModelComponent }