
export const ObjectIsEquals = (firstObject: Object, secondObject: Object) => {  
  return Object.keys(firstObject).length === Object.keys(secondObject).length && 
  (Object.keys(firstObject) as (keyof typeof firstObject)[]).every((key) => {
    return (
      Object.prototype.hasOwnProperty.call(secondObject, key) && 
      firstObject[key] === secondObject[key]
    )
  })
}
