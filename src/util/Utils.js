
module.exports = returnEmptyIfPropertyIsNullOrEmpty = (object,propertyName) => {
    if (object[propertyName] === null || object[propertyName] === 'null' ||
        object[propertyName] === undefined || object[propertyName] === 'undefined'){
        return ''
    }else{
        return object[propertyName]
    }

}