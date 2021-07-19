import { MediaType } from "./MediaType";

export interface Media {
  id: number;
  url: string;
  type: MediaType;
  file?: File;
}
