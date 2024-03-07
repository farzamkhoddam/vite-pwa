import { useSearchParams } from "react-router-dom";
import { CookiesTypes, UserProfileData } from "./Types";
import Cookies from "js-cookie";
export const IsClientBoss = () => {
  const [searchParams] = useSearchParams();
  return searchParams.get("boss") === "true";
};
export const GetUserKeyDecoded = () => {
  function decodeBase64Url(base64Url?: string): UserProfileData {
    // Convert Base64Url to Base64
    if (base64Url) {
      const base64 = base64Url?.replace(/-/g, "+")?.replace(/_/g, "/");
      // Decode Base64 string
      const base64Padded = base64 + "=".repeat((4 - (base64?.length % 4)) % 4);
      return JSON.parse(atob(base64Padded));
    }
    return {} as UserProfileData;
  }

  // Example JWT token
  const token: string | undefined = Cookies.get(CookiesTypes.USER_KEY);
  // Split the token into its parts
  const parts = token?.split(".");

  // Decode the payload
  const payload: UserProfileData = decodeBase64Url(parts?.[1]);
  return payload;
};
export function getFirstDigit(num: number): number {
  // Convert the number to a string
  const strNum = num?.toString();
  // Get the first character of the string
  const firstDigit = strNum[0];
  // Convert the first character back to a number
  const firstDigitAsNumber = parseInt(firstDigit);
  return firstDigitAsNumber;
}
