import { Store } from "./store";

const COLOR_STORE = "COLOR_STORE";
interface ColorState {
  backgroundColor: string;
  textColor: string;
}

class ColorStore extends Store<ColorState> {
  protected data(): ColorState {
    return {
      backgroundColor: "#000000",
      textColor: "#FFFFFF"
    };
  }

  setBackgroundColor(backgroundColor: string) {
    this.state.backgroundColor = backgroundColor;
  }

  setTextColor(textColor: string) {
    this.state.textColor = textColor;
  }
}

export const colorStore: ColorStore = new ColorStore(COLOR_STORE);
