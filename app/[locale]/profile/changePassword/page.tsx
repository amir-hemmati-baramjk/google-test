"use client";

import { BackHeaderForsubPages } from "../../_components/backHeader/backHeaderForsubPages";
import ChangePasswordForm from "./_components/ChangePasswordForm";

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <BackHeaderForsubPages title="Change Password" />
      <div className="w-full p-5 lg:container mt-5 lg:mt-10 ">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
