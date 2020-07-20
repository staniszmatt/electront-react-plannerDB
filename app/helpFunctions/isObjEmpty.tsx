/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
export default function isObjEmpty(obj: {}) {
  const keyCheck: any = Object.keys(obj)[0];
  return obj.hasOwnProperty(keyCheck) ? false : true;
}
