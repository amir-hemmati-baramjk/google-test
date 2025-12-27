"use client";
import React, { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { useTranslations } from "next-intl";

interface AssistantSelectProps {
  label: string;
  options: { label: string; value: string }[];
  onChange: (values: string[]) => void;
  error?: string;
  defaultValue?: string[];
  isDisabled?: boolean;
}

const AssistantSelect: React.FC<AssistantSelectProps> = ({
  label,
  options,
  onChange,
  error,
  defaultValue = [],
  isDisabled = false,
}) => {
  const [selected, setSelected] = useState<
    MultiValue<{ label: string; value: string }>
  >([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showMaxMessage, setShowMaxMessage] = useState(false);

  useEffect(() => {
    if (
      !isInitialized &&
      defaultValue &&
      defaultValue.length > 0 &&
      options.length > 0
    ) {
      const defaultOptions = options.filter((option) =>
        defaultValue.includes(option.value)
      );
      setSelected(defaultOptions);
      setIsInitialized(true);
    }
  }, [defaultValue, options, isInitialized]);

  const handleChange = (
    newValue: MultiValue<{ label: string; value: string }>
  ) => {
    if (newValue.length <= 3) {
      setSelected(newValue);
      const stringValues = newValue.map((v) => v.value);
      onChange(stringValues);
      setShowMaxMessage(false);
    }
  };

  const handleMenuOpen = () => {
    if (selected.length >= 3) {
      setShowMaxMessage(true);

      setTimeout(() => setShowMaxMessage(false), 10000);
      return false;
    }
    return true;
  };

  const t = useTranslations("index");

  return (
    <div className="w-full">
      {showMaxMessage && (
        <p className="text-warning text-sm ">
          {t("maxAssistantsSelected") ||
            "You have selected the maximum number of assistants. Please remove one to select another."}
        </p>
      )}
      <label className="font-bold block mx-1 mb-1 text-[14px] text-secondary">
        {label}
      </label>
      <Select
        isDisabled={isDisabled}
        isSearchable={false}
        isMulti
        options={options}
        value={selected}
        onChange={handleChange}
        onMenuOpen={handleMenuOpen}
        closeMenuOnSelect={false}
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "#eee5fd",
            borderColor: state.isFocused ? "#2f00754d" : "#d1d5db",
            borderRadius: "8px",
            padding: "5px 6px",
            boxShadow: state.isFocused ? "0 0 0 1px #2563eb" : "none",
            "&:hover": { borderColor: "#2f0075" },
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: "white",
            borderRadius: "6px",
            padding: "0 4px",
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "#2f0075",
            fontWeight: "500",
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: "#d53430",
            cursor: "pointer",
            ":hover": { backgroundColor: "#bae6fd", color: "#0c4a6e" },
          }),
        }}
        placeholder={t("selectAssistantPlaceholder")}
      />

      {error && <p className="text-error text-[12px] mt-1">{error}</p>}
    </div>
  );
};

export default AssistantSelect;
