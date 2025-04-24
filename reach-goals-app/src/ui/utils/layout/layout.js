const createElement = (region, parent, html) => {
    if (!parent && !html) { return console.error('parent/html parameter is undefined. Check them value.') } 
    parent.insertAdjacentHTML(region, html)
}

export { createElement }