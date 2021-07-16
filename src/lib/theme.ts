import { ref } from "vue";

export const theme = ref("dark");
export function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
}
