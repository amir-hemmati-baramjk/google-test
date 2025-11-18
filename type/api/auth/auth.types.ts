import { z } from "zod";
import {
  getForgetpassSchema,
  getSignInSchema,
  getSignInWithEmailSchema,
  getSignUpSchema,
  getSignUpWithEmailSchema,
  getVerifyForgetpassSchema,
  getVerifySchema,
} from "./auth.schema";

// Dummy translation function for typing purposes
const t = (key: string) => key;

// Create static schemas just for types
const _signInSchema = getSignInSchema(t);
const _signInWithEmailSchema = getSignInWithEmailSchema(t);
const _signUpSchema = getSignUpSchema(t);
const _signUpWithEmailSchema = getSignUpWithEmailSchema(t);
const _verifySchema = getVerifySchema(t);
const _forgetpassSchema = getForgetpassSchema(t);
const _verifyForgetpassSchema = getVerifyForgetpassSchema(t);

// Export types
export type SignIn = z.infer<typeof _signInSchema>;
export type SignUp = z.infer<typeof _signUpSchema>;
export type Verify = z.infer<typeof _verifySchema>;
export type SignInWithEmail = z.infer<typeof _signInWithEmailSchema>;
export type SignUpWithEmail = z.infer<typeof _signUpWithEmailSchema>;
export type VerifyForgetpassSchema = z.infer<typeof _verifyForgetpassSchema>;
export type ForgetpassSchema = z.infer<typeof _forgetpassSchema>;

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expireDate: string;
  permissions: string[];
  roles: string[];
}

// Type definitions for social login
export type SocialProvider = 1 | 2; // 1 = Google, 2 = Apple

export interface SocialLoginPayload {
  Provider: SocialProvider;
  IdToken: string;
  Email?: string | null;
  FullName?: string | null;
}

export interface SocialLoginResponse {
  accessToken: string;
  refreshToken: string;
  expireDate: string;
  permissions: string[];
  roles: string[];
  user?: any;
}

export type WnPayload = {
  idToken: string;
  provider: SocialProvider;
  email?: string | null;
  name?: string | null;
  exp?: number;
};

// Types for better TypeScript support
export interface SendTokenResponse {
  success: boolean;
  message?: string;
}

export interface FCMTokenOptions {
  forceRefresh?: boolean;
  vapidKey?: string;
}
