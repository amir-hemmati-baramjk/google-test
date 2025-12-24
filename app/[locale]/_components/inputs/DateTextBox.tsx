import classNames from "classnames";

import { TextboxProps } from "../../../../type/components/textbox.types";

export const DateTextBox: React.FC<TextboxProps> = ({
  variant = "ghost",
  labelVariant = "ghost",
  type = "date",
  className,
  label,
  size = "normal",
  ...rest
}) => {
  const classes = classNames(
    "textbox",
    "w-full !appearance-none outline-none",
    className,
    {
      [`textbox-${variant}`]: variant,
    }
  );
  const labelClasses = classNames(
    "font-bold text-white block mx-1 mb-1 text-[14px]",
    {
      [`label-${labelVariant}`]: labelVariant,
    }
  );
  return (
    <div className="w-full">
      <label className={labelClasses}>{label}</label>
      <input type={type} className={classes} {...rest} />
    </div>
  );
};

export default DateTextBox;
