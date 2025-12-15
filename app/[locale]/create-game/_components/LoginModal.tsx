"use client";
import dynamic from "next/dynamic";
import { ChildModalProps } from "@/app/[locale]/_components/modal/modal.types";
import { Button } from "@/app/[locale]/_components/button/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
const Modal = dynamic(() => import("../../_components/modal/Modal"), {
  ssr: false,
});

export default function LoginModal({ isOpen, onClose }: ChildModalProps) {
  const t = useTranslations("loginModal");

  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-full flex justify-center items-center  bg-primary/30 text-primary rounded-[20px] py-4">
          <p className="text-primary py-8 text-lg text-center font-bold">
            {t("you-not-registered")}
          </p>
        </div>
        <p className="text-primary text-md text-center ">
          {t("registered-required-modal-desc")}
        </p>
        <div className="w-full flex justify-center items-center gap-5">
          <div className="w-1/2">
            <Button
              className="!w-full"
              variant="primary"
              isOutline
              onClick={() => {
                router.push("/login");
                onClose;
              }}
            >
              {t("login-now")}
            </Button>
          </div>
          <div className="w-1/2 ">
            <Button
              variant="primary"
              className="!w-full !border-[2px] !border-primary"
              onClick={() => {
                router.push("/sign-up");
                onClose;
              }}
            >
              {t("sign-up-now")}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
