export type Bookmark = {
  id: number;
  title: string;
  url: string;
  description: string;
  category: string;
  favorite?: boolean;
};