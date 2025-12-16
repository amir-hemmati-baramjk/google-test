import {
  FiveGameIcon,
  TenGameIcon,
} from "@/app/[locale]/_components/icons/FiveGameIcon";
import { Game1Icon } from "@/app/[locale]/_components/icons/Game1Icon";
import { Game2Icon } from "@/app/[locale]/_components/icons/Game2Icon";

export interface PackageStyle {
  variant:
    | "magenta-gradient"
    | "orange-gradient"
    | "light-blue-gradient"
    | "primary-gradient";
  textColor: string;
  IconComponent: React.FC<{ size: number }>;
}

export const getPackageStyle = (index: number): PackageStyle => {
  switch (index) {
    case 0: // 1 Game
      return {
        variant: "primary-gradient",
        textColor: "text-pink-600",
        IconComponent: Game1Icon,
      };
    case 1: // 2 Games
      return {
        variant: "light-blue-gradient",
        textColor: "text-blue-600",
        IconComponent: Game2Icon,
      };
    case 4: // 5 Games
      return {
        variant: "orange-gradient",
        textColor: "text-orange-600",
        IconComponent: FiveGameIcon,
      };
    case 9: // 10 Games
    default:
      return {
        variant: "magenta-gradient",
        textColor: "text-pink",
        IconComponent: TenGameIcon,
      };
  }
};
