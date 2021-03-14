// Declarations for global interfaces & types
type ImageInfo = {
  uri: string;
  aspectRatio: number;
};

type Details = {
  title: string;
  description: string;
  exampleImages: ImageInfo[];
  descriptionImages: ImageInfo[];
};

type DataProcessItem = {
  variant: 'augmentation' | 'preprocess';
  name: string;
  details: Details;
};
