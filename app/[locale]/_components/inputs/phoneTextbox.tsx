import classNames from "classnames";
import { forwardRef } from "react";
import { TextboxProps } from "../../../../type/components/textbox.types";

interface PhoneTextboxProps extends TextboxProps {
  countryCode?: string;
}

export const PhoneTextbox = forwardRef<HTMLInputElement, PhoneTextboxProps>(
  (
    {
      variant = "ghost",
      labelVariant = "ghost",
      type = "tel",
      className,
      label,
      error,
      size = "normal",
      countryCode = "+965",
      ...rest
    },
    ref
  ) => {
    const classes = classNames("textbox", "w-full", className, {
      [`textbox-${variant}`]: variant,
    });

    const labelClasses = classNames(
      "font-bold text-white block mx-1 mb-1 text-[14px]",
      {
        [`label-${labelVariant}`]: labelVariant,
      }
    );

    return (
      <div className="relative w-full">
        <label className={labelClasses}>{label}</label>
        <div dir="ltr" className="relative">
          <input
            style={{ padding: "0 50px" }}
            ref={ref}
            type={type}
            className={`${classes} px-12`}
            {...rest}
          />
          <div
            style={{ direction: "ltr" }}
            className="absolute text-[14px] top-[50%] translate-y-[-50%] cursor-pointer left-3 text-base-content"
          >
            {countryCode}
          </div>
        </div>
        {error && <p className="text-error text-[12px]">{error.message}</p>}
      </div>
    );
  }
);

PhoneTextbox.displayName = "PhoneTextbox";
export default PhoneTextbox;
