import { ChangeEvent, ReactNode, useRef } from "react";

type PictureInputButtonProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  icon: ReactNode;
  disabled?: boolean;
};

const PictureInputButton: React.FC<PictureInputButtonProps> = ({
  onChange,
  icon,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-12 h-12 absolute -end-8 -bottom-4">
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onChange}
        disabled={disabled}
      />
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={disabled}
        className={`flex items-center justify-center p-1 rounded-full transition-colors bg-white`}
      >
        {icon}
      </button>
    </div>
  );
};

export default PictureInputButton;
