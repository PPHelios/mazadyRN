export interface ItemProps {
  id: number;
  title: string;
  image: string;
  link: string;
  endDate: string;
  lastBid: number;
  description: string;
}

export interface ImageData {
  uri: string;
  id: string;
  key: string;
  base64: string;
  fileSize: number;
  //
}