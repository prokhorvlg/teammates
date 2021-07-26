import { Person } from '../types/interfaces'

// Finds the object with the given id within the array.
export const findObjectInArray = (id: number, arrayOfObjects: Person[]) => {
  var result = arrayOfObjects.find(object => object.id === id);
  return (result) ? result : null;
}
// Finds the position of the object with the given id within the array.
export const findPositionInArray = (id: number, arrayOfObjects: Person[]) => {
  return arrayOfObjects.map(function(object) {return object.id; }).indexOf(id);
}
