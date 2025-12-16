"use client";
import React from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { useLocale } from "next-intl";

interface CurrencyOption {
  value: string;
  label: string;
}

interface CurrencySelectorProps {
  label: string;
  selectedCurrency: string;
  currencies: string[];
  onChange: (currency: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  label,
  selectedCurrency,
  currencies,
  onChange,
  isLoading,
  disabled,
}) => {
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "fa";
  const options: CurrencyOption[] = currencies.map((c) => ({
    value: c,
    label: c,
  }));
  const currentValue = options.find((o) => o.value === selectedCurrency);
  const handleChange = (newValue: SingleValue<CurrencyOption>) => {
    if (newValue) onChange(newValue.value);
  };

  const customStyles: StylesConfig<CurrencyOption, false> = {
    control: (base, state) => ({
      ...base,
      padding: "2px",
      borderRadius: "0.5rem", // rounded-lg
      borderColor: "rgba(255, 255, 255, 0.2)",
      backgroundColor: "white",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        borderColor: "rgba(255, 255, 255, 0.4)",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#5D00EA"
        : state.isFocused
        ? "#f0fdfa"
        : "white",
      color: state.isSelected ? "white" : "#2E2D2F",
      fontWeight: "600",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#2E2D2F",
      fontWeight: "700",
    }),
  };

  return (
    <div className="mb-4 w-full">
      <label className="block mb-1 text-sm text-white font-medium">
        {label}
      </label>
      <Select
        instanceId="currency-select"
        options={options}
        value={currentValue}
        onChange={handleChange}
        isLoading={isLoading}
        isDisabled={disabled}
        isRtl={isRtl}
        styles={customStyles}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};
