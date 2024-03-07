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
  SLIDER = "Slider",
  NEWS = "NEWS",
  EMPTY = "EMPTY",
}

export enum CookiesTypes {
  USER_KEY = "USER_KEY",
  USER_REFRESH_KEY = "USER_REFRESH_KEY",
}
export enum MenuVariantTypes {
  GENRE = "GENRE",
  LINK = "LINK",
}
// Client Menu Types
export interface SubGenre {
  href: string;
  text: string;
}
export interface Genre {
  text: string;
  href?: string;
  variant: MenuVariantTypes;
  subGenres?: SubGenre[];
}
// Menu Types
export interface MenuItems {
  text: string;
  variant: MenuVariantTypes;
  href?: string;
  genres?: Genre[];
}

// Identification Types

export interface SignupInterface {
  Email: string;
  UserName: string;
  Password: string;
}
export interface SigninInterface {
  UserNameOrEmail: string;
  Password: string;
}
export interface UserProfileData {
  UserName: string;
  Email: string;
  UserId: string;
  exp: number;
  Roles: string;
}
//

// Auth Types
export interface AuthResDataType {
  accessToken: string;
  refreshToken: string;
}

// Client Slider
export interface ClientSlider_Cards {
  title: string;
  desc: string;
  image: string;
}
export type ComponentDataTypes = ClientSlider_Cards[] | MenuItems[];
