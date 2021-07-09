import "@mdi/font/css/materialdesignicons.css";
import "vuetify/lib/styles/main.sass";
import { createVuetify } from "vuetify";
import * as components from "vuetify/lib/components";
import * as directives from "vuetify/lib/directives";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        background: "#000000",
        text: "#FFFFFF"
      },
      light: {
        background: "#FFFFFF",
        text: "#000000"
      }
    }
  }
});
