import { ToastType } from "./ToastType";

export interface Toast {
  id: number;
  type: ToastType;
  text: string;
}
