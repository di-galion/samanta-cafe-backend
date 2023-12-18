export const getNoNullProperty = (obj) => {
    const result = {}
    for (let propName in obj) {
        if (!obj[propName]) return
        result[propName] = obj[propName]
    }
    return result
}