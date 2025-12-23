import {
  FiveGameIcon,
  TenGameIcon,
} from "@/app/[locale]/_components/icons/FiveGameIcon";
import { Game1Icon } from "@/app/[locale]/_components/icons/Game1Icon";
import { Game2Icon } from "@/app/[locale]/_components/icons/Game2Icon";

export interface PackageStyle {
  variant: string;
  buttonVariant:
    | "magenta-gradients"
    | "orange-gradient"
    | "light-blue-gradient"
    | "primary-gradient";
  textColor: string;
  IconComponent: React.FC<{ size: number }>;
}

export const getPackageStyle = (index: number): PackageStyle => {
  switch (index) {
    case 0:
      return {
        variant: "bg-primary-gradient",
        buttonVariant: "primary-gradient",
        textColor: "text-pink-600",
        IconComponent: Game1Icon,
      };
    case 1:
      return {
        variant: "bg-light-blue-gradient",
        buttonVariant: "light-blue-gradient",
        textColor: "text-blue-600",
        IconComponent: Game2Icon,
      };
    case 4:
      return {
        variant: "bg-orange-gradient",
        buttonVariant: "orange-gradient",
        textColor: "text-orange-600",
        IconComponent: FiveGameIcon,
      };
    case 9:
      return {
        variant: "bg-package-magenta-gradients",
        buttonVariant: "magenta-gradients",
        textColor: "text-pink",
        IconComponent: TenGameIcon,
      };
    default:
      return {
        variant: "bg-magenta-gradient",
        buttonVariant: "magenta-gradients",
        textColor: "text-pink",
        IconComponent: TenGameIcon,
      };
  }
};
