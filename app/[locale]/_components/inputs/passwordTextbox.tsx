"use client";
import classNames from "classnames";
import { TextboxProps } from "../../../../type/components/textbox.types";
import { useState } from "react";
import { forwardRef } from "react";

import Image from "next/image";
import { EyeIcon } from "../icons/EyeIcon";
import { EyeSlashIcon } from "../icons/EyeSlashIcon";

export const PasswordTextbox: React.FC<TextboxProps> = forwardRef<
  HTMLInputElement,
  TextboxProps
>(
  (
    {
      variant = "ghost",
      labelVariant = "ghost",
      type = "password",
      className,
      label,
      error,
      size = "normal",
      ...rest
    },
    ref
  ) => {
    const classes = classNames("textbox", "w-full", "", className, {
      [`textbox-${variant}`]: variant,
    });

    const labelClasses = classNames(
      "font-bold text-white block mx-1 mb-1 text-[14px]",
      {
        [`label-${labelVariant}`]: labelVariant,
      }
    );
    const [showPass, setShowPass] = useState(false);
    return (
      <div className="relative w-full">
        <label className={labelClasses}>{label}</label>
        <div dir="ltr" className="relative">
          <input
            ref={ref}
            type={showPass ? "text" : "password"}
            className={`${classes} `}
            {...rest}
          />
          <div
            onClick={() => setShowPass((prev) => !prev)}
            className={`absolute text-base-content top-[50%] translate-y-[-50%] cursor-pointer right-3`}
          >
            {showPass ? (
              <EyeIcon size={24} className="text-primary" />
            ) : (
              <EyeSlashIcon size={24} className="text-primary" />
            )}
          </div>
        </div>
        {error && <p className="text-error text-[12px]">{error.message}</p>}{" "}
      </div>
    );
  }
);

export default PasswordTextbox;
