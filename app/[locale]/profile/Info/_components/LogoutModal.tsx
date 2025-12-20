"use client";
import dynamic from "next/dynamic";
import { ChildModalProps } from "@/app/[locale]/_components/modal/modal.types";
import { DeleteAccountIcon } from "@/app/[locale]/_components/icons/DeleteAccountIcon";
import { Button } from "@/app/[locale]/_components/button/button";
import { ExitIcon } from "@/app/[locale]/_components/icons/ExitIcon";
import { useTranslations } from "next-intl";
import { useUser } from "@/stores/userContext";
import {
  accessTokenLs,
  isLoginLS,
  refreshTokenLS,
  userDataSS,
} from "@/localeStorage/storage";
import { useRouter } from "next/navigation";

const Modal = dynamic(() => import("../../../_components/modal/Modal"), {
  ssr: false,
});

export default function LogoutModal({ isOpen, onClose }: ChildModalProps) {
  const t = useTranslations("profileInfo");
  const { setUser } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    setUser(null);
    refreshTokenLS.remove();
    accessTokenLs.remove();
    userDataSS.remove();
    isLoginLS.remove();
    router.push("/login");
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-full flex justify-center items-center bg-error/30 text-error rounded-[20px] py-4">
          <ExitIcon size={80} />
        </div>
        <p className="text-error text-lg font-bold text-center">
          {t("logout-desc")}
        </p>
        <div className="w-full flex justify-center items-center gap-5">
          <div className="w-1/2">
            <Button
              className="!w-full"
              variant="error"
              isOutline
              onClick={onClose}
            >
              {t("no")}
            </Button>
          </div>
          <div className="w-1/2">
            <Button
              variant="error"
              className="!w-full !border-[2px] !border-error"
              onClick={handleLogout}
            >
              {t("yes")}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
