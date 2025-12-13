"use client";
import React, { useEffect, useState, useTransition } from "react";
import { BackHeaderForsubPages } from "../../_components/backHeader/backHeaderForsubPages";
import EditInfoForm from "./_components/EditInfoForm";
import { User } from "@/type/api/user/user.type";
import { useUser } from "@/stores/userContext";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { editProfilePictureService } from "@/core/user/edit-user-profile-picture-service";
import Image from "next/image";
import PictureInputButton from "./_components/ProfileInputButton";
import { Loading } from "../../_components/loading/loading";
import { ProfileIcon } from "../../_components/icons/ProfileIcon";
import { CameraIcon } from "../../_components/icons/CameraIcon";
import { getUserProfile } from "@/core/user/user-profile-service";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../_components/button/button";
import { DeleteAccountIcon } from "../../_components/icons/DeleteAccountIcon";
import LogoutModal from "./_components/LogoutModal";
import DeleteAccountModal from "./_components/DeleteAccountModal";

export default function Page() {
  const t = useTranslations("profileInfo");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { user, isInitialized, isLogin, setUser } = useUser();
  const {
    data: profileResponse,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    enabled: Boolean(isInitialized && isLogin),
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (profileResponse?.success && profileResponse?.data) {
      setUser(profileResponse.data);
    }
  }, [profileResponse]);

  function normalizeApiPicture(data: any): NonNullable<User["picture"]> {
    return {
      id: String(data.id),
      fileName: String(data.fileName ?? ""),
      mimeType: String(data.mimeType ?? ""),
      mediaType: Number(data.mediaType ?? 0),
      downloadUrl: String(data.downloadUrl ?? ""),
    };
  }

  function handleChangeUserProfilePic(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event?.target?.files && event?.target?.files?.length) {
      const file = event.target.files[0];

      event.target.value = "";

      startTransition(async () => {
        const response = await editProfilePictureService(file);

        if (response?.success && response.data) {
          const apiPic = normalizeApiPicture(response.data);
          if (apiPic) {
            refetch();
          }
          toast.success(response.message || t("profile-picture-updated"));
        } else {
          const errorMessage = Array.isArray(response?.errors)
            ? response.errors.join(", ")
            : response?.errors || t("failed-to-update-profile-picture");

          toast.error(errorMessage);
        }
      });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <BackHeaderForsubPages title="Edit Profile" />
      <div className="w-full p-5 lg:container mt-5 lg:mt-10 ">
        <div className="flex justify-center flex-col items-center gap-2 w-full py-5">
          <div className="w-auto h-auto relative">
            <div className=" bg-secondary h-[100px] flex justify-center items-center text-white w-[100px] rounded-full relative overflow-hidden">
              {isPending ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Loading />
                </div>
              ) : user?.picture?.downloadUrl ? (
                <div className="w-full h-full bg-white p-1">
                  <Image
                    src={user?.picture?.downloadUrl}
                    alt="Profile"
                    width={200}
                    height={200}
                    className="object-cover rounded-full w-full h-full"
                  />
                </div>
              ) : (
                <ProfileIcon size={56} />
              )}
            </div>
            <PictureInputButton
              onChange={handleChangeUserProfilePic}
              icon={<CameraIcon className="text-secondary" />}
              disabled={isPending}
            />
          </div>
        </div>
        <EditInfoForm />
        <div className="grid grid-cols-2 gap-3 mt-5 lg:max-w-[50%] mx-auto">
          <Button
            onClick={() => setShowDeleteAccountModal(true)}
            className="!flex !gap-2 !px-2"
            animatedIcon
            size="large"
            isOutline
            variant="error"
          >
            <DeleteAccountIcon /> {t("delete-account")}
          </Button>
          <Button
            onClick={() => setShowLogoutModal(true)}
            className="!text-white"
            isOutline
            shape="full"
            size="large"
          >
            {t("logout")}
          </Button>
        </div>
        {/* Modals */}

        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
        />
        <DeleteAccountModal
          isOpen={showDeleteAccountModal}
          onClose={() => setShowDeleteAccountModal(false)}
        />
      </div>
    </div>
  );
}
