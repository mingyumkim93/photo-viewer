import { Store } from "./store";
import { Media } from "@/types/Media";
import { MediaType } from "@/types/MediaType";

const MEDIA_STORE = "MEDIA_STORE";

const SAMPLE_IMAGES: Media[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    type: MediaType.Image
  },
  {
    id: 2,
    url: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/minimalist-orange-armando-borges.jpg",
    type: MediaType.Image
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    type: MediaType.Image
  }
];

interface MediaState {
  medias: Media[];
}

class MediaStore extends Store<MediaState> {
  protected data(): MediaState {
    return {
      medias: SAMPLE_IMAGES
    };
  }

  addMedias(medias: Media[]) {
    this.state.medias = [...this.state.medias, ...medias];
    console.log(medias);
    console.log(this.state.medias);
  }

  removeMedia(id: number) {
    this.state.medias = this.state.medias.filter((media) => media.id !== id);
  }
}

export const mediaStore: MediaStore = new MediaStore(MEDIA_STORE);
