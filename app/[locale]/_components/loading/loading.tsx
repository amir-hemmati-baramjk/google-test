"use client";
import React from "react";
import classNames from "classnames";
import { LoadingProps } from "./loading.types";

const sizeClasses: Record<string, string> = {
  tiny: "loading-xs",
  small: "loading-sm",
  normal: "loading-md",
  large: "loading-lg",
};

const gradientVariants = [
  "primary-bg-gradient",
  "primary-gradient",
  "secondary-gradient",
  "turquoise-gradient",
  "magenta-gradient",
  "orange-gradient",
  "light-purple-gradient",
  "light-blue-gradient",
  "light-orange-gradient",
];

export const Loading: React.FC<LoadingProps> = ({
  type = "spinner",
  variant = "primary",
  size = "normal",
  className,
}) => {
  const isGradient = gradientVariants.includes(variant);

  const classes = classNames(
    "loading inline-block",
    sizeClasses[size],
    `loading-${type}`,
    variant && `loading-${variant}`,
    className
  );

  return <span className={classes}></span>;
};
