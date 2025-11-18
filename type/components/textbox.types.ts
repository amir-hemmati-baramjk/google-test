import { InputHTMLAttributes } from "react";
import { ComponentBase } from "./component-base.type";
import { FieldError } from "react-hook-form";
import { Variant } from "@/type/components/variant.type";
type TextboxType = "text" | "number" | "email" | "password" | "tel" | "date";

export type TextboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  ComponentBase & {
    labelVariant?: Variant;
    type?: TextboxType;
    label?: string;
    error?: FieldError;
  };
