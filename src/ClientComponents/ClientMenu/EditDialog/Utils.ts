import { Genre, MenuItems, MenuVariantTypes, SubGenre } from "@/Types";
import { SetStateAction } from "react";

export function editableMenuItemsHasNoUndefined(
  editableMenuItems: MenuItems[]
): boolean {
  return !editableMenuItems.every((item) => {
    if (!item.text) {
      return false;
    }
    if (item.variant === MenuVariantTypes.GENRE) {
      return item?.genres?.every((genre) => {
        if (!genre.text) {
          return false;
        }
        if (genre.variant === MenuVariantTypes.GENRE) {
          return genre?.subGenres?.every((subGenre) => {
            if (!subGenre.text) {
              return false;
            }
            if (!subGenre.href) {
              return false;
            }
            return true;
          });
        } else if (!genre.href) {
          return false;
        }
        return true;
      });
    } else if (!item.href) {
      return false;
    }
    return true;
  });
}

// menu items

export function handleAddItem({
  setEditableMenuItems,
}: {
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
}) {
  setEditableMenuItems((prevState) => [
    ...prevState,
    {
      text: `item ${prevState.length + 1}`,
      variant: MenuVariantTypes.LINK,
      href: "",
    },
  ]);
}
export function handleDeleteItem({
  setEditableMenuItems,
  itemIndex,
}: {
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
  itemIndex: number;
}) {
  {
    setEditableMenuItems((prevState) =>
      prevState.filter((_item, i) => i !== itemIndex)
    );
  }
}
export function handleTitleChange({
  e,
  itemIndex,
  editableMenuItems,
  setEditableMenuItems,
}: {
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  itemIndex: number;
  editableMenuItems: MenuItems[];
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
}) {
  const updatedMenuItems = editableMenuItems.map((item, i) => {
    if (i === itemIndex) {
      return { ...item, text: e.target.value };
    }

    return item;
  });

  setEditableMenuItems(updatedMenuItems);
}
export function handleHrefChange({
  e,
  itemIndex,
  editableMenuItems,
  setEditableMenuItems,
}: {
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  itemIndex: number;
  editableMenuItems: MenuItems[];
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
}) {
  const updatedMenuItems = editableMenuItems.map((item, i) => {
    if (i === itemIndex) {
      return { ...item, href: e.target.value };
    }

    return item;
  });

  setEditableMenuItems(updatedMenuItems);
}

// genre

export function handleGenreTitleChange({
  e,
  itemIndex,
  genreIndex,
  editableMenuItems,
  setEditableMenuItems,
}: {
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  itemIndex: number;
  genreIndex: number;
  editableMenuItems: MenuItems[];
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
}) {
  const updatedMenuItems = editableMenuItems.map((item, i) => {
    if (i === itemIndex) {
      return {
        ...item,
        genres: item.genres?.map((genre, index) => {
          if (index === genreIndex) {
            return { ...genre, text: e.target.value };
          }
          return genre;
        }),
      };
    }

    return item;
  });

  setEditableMenuItems(updatedMenuItems);
}
export function handleGenreHrefChange({
  e,
  itemIndex,
  genreIndex,
  editableMenuItems,
  setEditableMenuItems,
}: {
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  itemIndex: number;
  genreIndex: number;
  editableMenuItems: MenuItems[];
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
}) {
  const updatedMenuItems = editableMenuItems.map((item, i) => {
    if (i === itemIndex) {
      return {
        ...item,
        genres: item.genres?.map((genre, index) => {
          if (index === genreIndex) {
            return { ...genre, href: e.target.value };
          }
          return genre;
        }),
      };
    }

    return item;
  });

  setEditableMenuItems(updatedMenuItems);
}

export function handleAddGenre({
  itemIndex,
  editableMenuItems,
  setEditableMenuItems,
}: {
  itemIndex: number;
  editableMenuItems: MenuItems[];
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
}) {
  const updatedmenuItems = editableMenuItems.map((item, index) => {
    if (index === itemIndex) {
      return {
        text: item.text,
        variant: MenuVariantTypes.GENRE,
        genres:
          item?.genres !== undefined
            ? [
                ...item.genres,
                {
                  text: `Genre ${item.genres.length + 1}`,
                  href: "",
                  variant: MenuVariantTypes.LINK,
                } as Genre,
              ]
            : [
                {
                  text: "Genre 1",
                  href: "",
                  variant: MenuVariantTypes.LINK,
                } as Genre,
              ],
      };
    }
    return item;
  });
  setEditableMenuItems(updatedmenuItems);
}
export function handleDeleteGenre({
  setEditableMenuItems,
  itemIndex,
  genreIndex,
}: {
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
  itemIndex: number;
  genreIndex: number;
}) {
  {
    setEditableMenuItems((prevState) => {
      const genres = prevState[itemIndex].genres;
      return prevState.map((item, index) => {
        if (index === itemIndex) {
          return {
            ...item,
            genres: genres?.filter((_el, i) => i !== genreIndex),
          };
        }
        return item;
      });
    });
  }
}
// subGenre

export function handleSubGenreTitleChange({
  e,
  itemIndex,
  genreIndex,
  subGenreIndex,
  editableMenuItems,
  setEditableMenuItems,
}: {
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  itemIndex: number;
  genreIndex: number;
  subGenreIndex: number;
  editableMenuItems: MenuItems[];
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
}) {
  const updatedMenuItems = editableMenuItems.map((item, i) => {
    if (i === itemIndex) {
      return {
        ...item,
        genres: item.genres?.map((genre, index) => {
          if (index === genreIndex) {
            return {
              ...genre,
              subGenres: genre?.subGenres?.map((subGenre, j) => {
                if (j === subGenreIndex) {
                  return { ...subGenre, text: e.target.value };
                }
                return subGenre;
              }),
            };
          }
          return genre;
        }),
      };
    }

    return item;
  });

  setEditableMenuItems(updatedMenuItems);
}
export function handleSubGenreHrefChange({
  e,
  itemIndex,
  genreIndex,
  subGenreIndex,
  editableMenuItems,
  setEditableMenuItems,
}: {
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  itemIndex: number;
  genreIndex: number;
  subGenreIndex: number;
  editableMenuItems: MenuItems[];
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
}) {
  const updatedMenuItems = editableMenuItems.map((item, i) => {
    if (i === itemIndex) {
      return {
        ...item,
        genres: item.genres?.map((genre, index) => {
          if (index === genreIndex) {
            return {
              ...genre,
              subGenres: genre?.subGenres?.map((subGenre, j) => {
                if (j === subGenreIndex) {
                  return { ...subGenre, href: e.target.value };
                }
                return subGenre;
              }),
            };
          }
          return genre;
        }),
      };
    }

    return item;
  });

  setEditableMenuItems(updatedMenuItems);
}
export function handleAddSubGenre({
  itemIndex,
  genreIndex,
  editableMenuItems,
  setEditableMenuItems,
}: {
  itemIndex: number;
  genreIndex: number;
  editableMenuItems: MenuItems[];
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
}) {
  const updatedmenuItems = editableMenuItems.map((item, index) => {
    if (index === itemIndex) {
      return {
        text: item.text,
        variant: item.variant,
        genres: item.genres?.map((genre, i) => {
          if (i === genreIndex) {
            return {
              text: genre.text,
              variant: MenuVariantTypes.GENRE,
              subGenres:
                genre.subGenres !== undefined
                  ? [
                      ...genre.subGenres,
                      {
                        text: `Sub Genre ${genre.subGenres.length + 1}`,
                        href: "",
                        variant: MenuVariantTypes.LINK,
                      } as SubGenre,
                    ]
                  : [
                      {
                        text: "Sub Genre 1",
                        href: "",
                      } as SubGenre,
                    ],
            };
          }
          return genre;
        }),
      };
    }
    return item;
  });
  setEditableMenuItems(updatedmenuItems);
}
export function handleDeleteSubGenre({
  setEditableMenuItems,
  itemIndex,
  genreIndex,
  subGenreIndex,
}: {
  setEditableMenuItems: React.Dispatch<SetStateAction<MenuItems[]>>;
  itemIndex: number;
  genreIndex: number;
  subGenreIndex: number;
}) {
  {
    setEditableMenuItems((prevState) => {
      const genres = prevState[itemIndex].genres;
      const subGenres = prevState?.[itemIndex]?.genres?.[genreIndex]?.subGenres;
      return prevState.map((item, index) => {
        if (index === itemIndex) {
          return {
            ...item,
            genres: genres?.map((genreEl, j) => {
              if (j === genreIndex) {
                return {
                  ...genreEl,
                  subGenres: subGenres?.filter((_el, i) => i !== subGenreIndex),
                };
              }
              return genreEl;
            }),
          };
        }
        return item;
      });
    });
  }
}
