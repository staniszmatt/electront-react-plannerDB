export default function isObjEmpty(obj) {
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
