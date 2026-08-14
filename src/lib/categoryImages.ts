/**
 * Category imagery for the range grid.
 *
 * These point at files in /public/categories/. Drop the five JPGs in with exactly these
 * names and they appear automatically; until then each tile falls back to a plain Stone
 * panel with the mark on it, so the grid never shows a broken image.
 *
 * Spec for the files is in README.md under "Category images".
 */
export type CategoryImage = { file: string; alt: string }

export const CATEGORY_IMAGES: Record<string, CategoryImage> = {
  pet: {
    file: '/categories/pet.jpg',
    alt: 'Pet supplies: bowls, leads, toys and grooming items',
  },
  home: {
    file: '/categories/home.jpg',
    alt: 'Home and garden goods: storage, cleaning and small garden tools',
  },
  baby: {
    file: '/categories/baby.jpg',
    alt: 'Baby products: bottles, changing and feeding essentials',
  },
  sports: {
    file: '/categories/sports.jpg',
    alt: 'Sports and outdoors kit: water bottles, mats and small equipment',
  },
  stationery: {
    file: '/categories/stationery.jpg',
    alt: 'Stationery and office supplies: pens, notebooks and desk items',
  },
}
