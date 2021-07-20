import { Media } from "./Media";

export interface Album {
  id: string;
  medias: Media[];
  createdAt: Date;
  backgroundColor: string;
  textColor: string;
}
