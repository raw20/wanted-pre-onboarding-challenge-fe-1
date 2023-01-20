import { ReactNode } from "react";

export type Ref = HTMLButtonElement;

export interface BarProps {
  children?: ReactNode;
  type: "submit" | "span";
}
