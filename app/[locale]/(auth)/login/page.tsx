import React from "react";
import { BackHeaderForsubPages } from "../../_components/backHeader/backHeaderForsubPages";
import LoginForm from "../_components/LoginForm";
import LoginButtons from "../_components/SocialLoginButtons";

export default function page() {
  return (
    <div>
      <BackHeaderForsubPages title="Login" />
      <div className="max-w-[600px] m-auto mt-10 lg:mt-20">
        <LoginForm />
        <LoginButtons />
      </div>
    </div>
  );
}
