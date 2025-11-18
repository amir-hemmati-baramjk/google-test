import { ButtonHTMLAttributes } from "react";
import { ComponentBase } from "./component-base.type";
import { LoadingBehavior } from "./loading-behavior.type";

export type ButtonShape = "default" | "wide" | "full" | "square" | "rounded";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ComponentBase &
  LoadingBehavior & {
    isOutline?: boolean;
    shape?: ButtonShape;
    isLink?: boolean;
    animatedIcon?: boolean;
  };
