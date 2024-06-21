// Define the Book interface
export interface Book {
  id: string;
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

export interface BookCardProps {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
  onRemove: () => void;
}
