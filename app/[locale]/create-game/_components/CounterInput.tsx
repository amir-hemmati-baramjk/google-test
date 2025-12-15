import React from "react";
import { useController, FieldValues } from "react-hook-form";
import { CounterInputProps } from "@/type/api/game/createGame.types";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../_components/button/button";

const CounterInput = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  error,
  step = 1,
  maxLimit = Infinity,
  minLimit = 1,
  allowInput = true,
  className = "",
  showButtons = true,
}: CounterInputProps<TFieldValues> & { allowInput?: boolean }) => {
  const {
    field: { value, onChange },
    // @ts-expect-error:error
  } = useController({ name, control, defaultValue: minLimit });

  const handleIncrease = () => {
    const increased = value + step;
    if (increased <= maxLimit) {
      onChange(increased);
    }
  };

  const handleDecrease = () => {
    const decreased = value - step;
    if (decreased >= minLimit) {
      onChange(decreased);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      onChange("");
      return;
    }

    const numericValue = Number(inputValue);
    if (!isNaN(numericValue)) {
      if (numericValue >= minLimit && numericValue <= maxLimit) {
        onChange(numericValue);
      }
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      onChange(minLimit);
      return;
    }

    const numericValue = Number(inputValue);

    if (numericValue < minLimit) {
      onChange(minLimit);
    } else if (numericValue > maxLimit) {
      onChange(maxLimit);
    }
  };

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm  text-secondary font-bold">{label}</label>
      )}
      <div className="w-full flex items-center  justify-between ">
        {allowInput ? (
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={`text-center outline-none  border border-secondary/30 p-3 rounded-xl text-secondary font-bold bg-light-purple ${
              showButtons ? " w-2/3" : "w-full"
            }`}
            aria-label={label}
          />
        ) : (
          <p className="min-w-[2rem] text-center">{value}</p>
        )}
        {showButtons && (
          <div className="flex gap-1">
            <Button
              shape="square"
              variant="primary-gradient"
              onClick={handleDecrease}
              disabled={value <= minLimit}
              animatedIcon
              className="!h-10 !w-10 !p-0"
            >
              <MinusIcon size={24} />
            </Button>
            <Button
              shape="square"
              onClick={handleIncrease}
              disabled={value >= maxLimit}
              variant="primary-gradient"
              className="!h-10 !w-10 !p-0"
            >
              <PlusIcon size={24} />
            </Button>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CounterInput;
