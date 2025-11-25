export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
  className?: string;
};

export type ChildModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
