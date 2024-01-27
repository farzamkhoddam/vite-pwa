export function getFirstDigit(num: number): number {
  // Convert the number to a string
  const strNum = num.toString();
  // Get the first character of the string
  const firstDigit = strNum[0];
  // Convert the first character back to a number
  const firstDigitAsNumber = parseInt(firstDigit);
  return firstDigitAsNumber;
}
