"use client";

import React, { useEffect, useState } from "react";
import { colord } from "colord";
import {
  ColorEntry,
  TypographyStyle,
} from "../../../../type/components/designSystemBase.type";

const baseTypography: TypographyStyle[] = [
  {
    label: "Heading 1",
    className: "text-4xl font-bold",
    sample: "Heading 1",
    size: "2.25rem",
    weight: "700",
  },
  {
    label: "Heading 2",
    className: "text-3xl font-bold",
    sample: "Heading 2",
    size: "1.875rem",
    weight: "700",
  },
  {
    label: "Heading 3",
    className: "text-2xl font-semibold",
    sample: "Heading 3",
    size: "1.5rem",
    weight: "600",
  },
  {
    label: "Heading 4",
    className: "text-xl font-semibold",
    sample: "Heading 4",
    size: "1.25rem",
    weight: "600",
  },
  {
    label: "Heading 5",
    className: "text-lg font-medium",
    sample: "Heading 5",
    size: "1.125rem",
    weight: "500",
  },
  {
    label: "Paragraph",
    className: "text-base font-normal",
    sample: "This is a paragraph.",
    size: "1rem",
    weight: "400",
  },
  {
    label: "Small",
    className: "text-sm font-normal",
    sample: "Small text",
    size: "0.875rem",
    weight: "400",
  },
  {
    label: "Tiny",
    className: "text-xs font-light",
    sample: "Tiny text",
    size: "0.75rem",
    weight: "300",
  },
];

const getTextColor = (background: string, isGradient: boolean) =>
  isGradient ? "#fff" : colord(background).isDark() ? "#f9f9f9" : "#111";

const isValidColor = (val: string) =>
  /^#([0-9A-Fa-f]{3}){1,2}$/.test(val) || /^rgb/.test(val);

const ColorBox: React.FC<ColorEntry> = ({ name, value, isGradient }) => (
  <div
    className="w-56 h-32 flex flex-col items-center justify-center rounded-lg shadow border m-2 text-center p-2"
    style={{
      background: value || "#fff",
      color: getTextColor(value || "#fff", isGradient),
    }}
  >
    <span className="uppercase font-medium text-sm">{name}</span>
    <span className="text-xs opacity-80">{value}</span>
  </div>
);

const TypographyBox: React.FC<{ t: TypographyStyle; colors: ColorEntry[] }> = ({
  t,
  colors,
}) => (
  <div className="mb-6">
    <span className="block text-gray-500 mb-2">{t.label}</span>
    <div className="flex flex-wrap gap-4 items-center">
      {colors.map((c) => (
        <div
          key={c.name}
          className="flex flex-col items-center justify-center p-2"
        >
          <span className={t.className} style={{ color: c.value || "#111" }}>
            {t.sample}
          </span>
          <span className="text-gray-500 text-xs">
            {t.size} / {t.weight}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const DesignSystem: React.FC = () => {
  const [solids, setSolids] = useState<ColorEntry[]>([]);
  const [gradients, setGradients] = useState<ColorEntry[]>([]);

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const entries: ColorEntry[] = Array.from(root)
      .filter((v) => v.startsWith("--"))
      .map((v) => {
        const val = root.getPropertyValue(v).trim();
        return {
          name: v.replace("--", ""),
          value: val,
          isGradient: val.includes("gradient"),
        };
      });

    setSolids(entries.filter((c) => !c.isGradient && isValidColor(c.value)));
    setGradients(entries.filter((c) => c.isGradient));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-12">
      {/* Solid Colors */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Solid Colors</h2>
        <div className="flex flex-wrap">
          {solids.map((c) => (
            <ColorBox key={c.name} {...c} />
          ))}
        </div>
      </section>

      {/* Gradients */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Gradients</h2>
        <div className="flex flex-wrap">
          {gradients.map((c) => (
            <ColorBox key={c.name} {...c} />
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Typography</h2>
        {baseTypography.map((t) => (
          <TypographyBox key={t.label} t={t} colors={solids} />
        ))}
      </section>
    </div>
  );
};

export default DesignSystem;
