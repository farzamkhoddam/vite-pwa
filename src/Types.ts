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
  DROPPEDITEMS = "DROPPEDITEMS",
  ROW_NUMBER = "ROW_NUMBER",
  UIDS = "UIDS",
  MENU_ITEMS = "MENU_ITEMS",
  BOX_WIDTH = "BOX_WIDTH",
  BOX_HEIGHT = "BOX_HEIGHT",
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
