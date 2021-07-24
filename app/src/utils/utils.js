// Finds the object with the given id within the array.
export const findObjectInArray = (id, arrayOfObjects) => {
  var result = arrayOfObjects.find(object => object.id === id);
  return (result) ? result : {};
}
// Finds the position of the object with the given id within the array.
export const findPositionInArray = (id, arrayOfObjects) => {
  return arrayOfObjects.map(function(object) {return object.id; }).indexOf(id);
}
