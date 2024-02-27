export const ItemType = {
  listItem: "listItem",
  componentLauncherItem: "componentLauncherItem",
};
export enum ComponentTypes {
  BUTTON = "Button",
  INPUT = "Input",
  RATING = "Rating",
  SWITCH = "Switch",
  MENU = "MENU",
  SLIDER = "SLIDER",
  NEWS = "NEWS",
  EMPTY = "EMPTY",
}
export enum LocalStorageTypes {
  USER_KEY = "USER_KEY",
}
export interface SubGenre {
  href: string;
  text: string;
}
export interface Genre {
  text: string;
  href?: string;
  variant: "LINK" | "GENRE";
  subGenres?: SubGenre[];
}

export interface MenuItems {
  text: string;
  variant: "LINK" | "GENRE";
  href?: string;
  genres?: Genre[];
}
export interface SignupInterface {
  Email: string;
  UserName: string;
  Password: string;
}
export interface UserProfileData {
  UserName: string;
  Email: string;
  UserId: string;
  exp: number;
  Roles: string;
}
