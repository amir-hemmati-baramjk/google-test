import { z } from "zod";
import { createGameBaseSchema } from "./createGame.schema";

import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Category } from "./game.type";

export type createGame = z.infer<typeof createGameBaseSchema>;

export interface CategoryCardProps {
  data: Category;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
  isSelectionLimitReached: boolean;
  assistants: string[];
}

export type CounterInputProps<TFieldValues extends FieldValues = FieldValues> =
  {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    label?: string;
    error?: string;
    step?: number;
    maxLimit?: number;
    minLimit?: number;
    className?: string;
    showButtons?: boolean;
  };

export type CategoryItem = {
  id: string;
  name: string;
};

export type CreateGameFormProps = {
  selectedCatItems: string[];
};

export type ModalType = "login" | "payment" | "create" | null;

export interface GameModalsProps {
  modalType: ModalType;
  setModalType: (type: ModalType) => void;
  selectedCatItems: string[];
}
