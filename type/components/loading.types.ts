import { ComponentBase } from "./component-base.type";

export type LoadingProps = ComponentBase & {
  type?: "spinner" | "ring";
};
