interface Picture {
  id: string;
  fileName: string;
  mimeType: string;
  mediaType: number;
  downloadUrl: string;
}

export interface GamePackage {
  id: string;
  name: string;
  description: string;
  gamesCount: number;
  gPointCount: number;
  nPointCount: number;
  price: number;
  oldPrice: number;
  discountedPrice: number;
  packageType: number;
  displayOrder: number;
  picture: Picture;
  currency: string;
}
