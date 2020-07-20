// Function to setup returns of yes or no based on boolean data received.

export default function booleanToStringYesNo(varToCheck: boolean) {
  if (varToCheck) {
    return 'YES';
  }
  return 'NO';
}
