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

type Augmentation = {
  variant: 'augmentation';
  name: string;
  details: Details;
};

type Preprocess = {
  variant: 'preprocess';
  name: string;
  details: Details;
};

type DataProcessItem = Augmentation | Preprocess;
