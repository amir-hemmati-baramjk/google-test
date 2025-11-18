"use client";

import React, { forwardRef } from "react";
import classNames from "classnames";
import { TextboxProps } from "../../../../type/components/textbox.types";

export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  (
    {
      variant = "ghost",
      labelVariant = "ghost",
      type = "text",
      className,
      label,
      error,
      size = "normal",
      ...rest
    },
    ref
  ) => {
    const inputClasses = classNames("textbox", "w-full", className, {
      [`textbox-${variant}`]: variant,
    });

    const labelClasses = classNames(
      "font-bold text-white block mx-1 mb-1 text-[14px]",
      {
        [`label-${labelVariant}`]: labelVariant,
      }
    );
    return (
      <div className="w-full">
        {label && <label className={labelClasses}>{label}</label>}
        <input ref={ref} type={type} className={inputClasses} {...rest} />
        {error && (
          <p className="text-error text-[12px] mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);

Textbox.displayName = "Textbox";
export default Textbox;
