import { messaging } from "@/lib/firebase";
import { getToken } from "firebase/messaging";
import { accessTokenLs, fcmAppTokenLS } from "@/localeStorage/storage";
import { getOrCreateDeviceId } from "@/utils/device";
import { FCMTokenOptions, SendTokenResponse } from "@/type/api/auth/auth.types";

export const sendAppTokenToServer = async (
  options: FCMTokenOptions = {}
): Promise<SendTokenResponse> => {
  try {
    if (typeof window === "undefined") {
      console.warn("FCM: Not in browser environment");
      return { success: false, message: "Not in browser environment" };
    }

    if (!("serviceWorker" in navigator)) {
      console.warn("FCM: Service workers are not supported");
      return { success: false, message: "Service workers not supported" };
    }

    if (!("Notification" in window)) {
      console.warn("FCM: Notifications are not supported");
      return { success: false, message: "Notifications not supported" };
    }

    const deviceId = getOrCreateDeviceId();
    const authToken = accessTokenLs?.get();

    if (!authToken || typeof authToken !== "string") {
      console.warn("FCM: No valid authentication token found");
      return { success: false, message: "User not authenticated" };
    }

    const token = await getOrCreateFCMToken(options);
    if (!token) {
      console.warn("FCM: Failed to get FCM token");
      return { success: false, message: "Failed to get FCM token" };
    }

    const response = await sendTokenToServer(token, deviceId, authToken);

    if (response.success) {
      console.log("FCM: Token successfully sent to server");
    } else {
      console.error("FCM: Failed to send token to server");
    }

    return response;
  } catch (error) {
    console.error("FCM: Error in sendAppTokenToServer:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

const getOrCreateFCMToken = async (
  options: FCMTokenOptions = {}
): Promise<string | null> => {
  try {
    const {
      forceRefresh = false,
      vapidKey = "BD-lkDW7L-DtEf_4lmMo2Gyj7wJXz92t9IPPRHitpVrl5C3WBc0O4J1QneM-3vj1mB_MHWT2ITH6KcdmAWYAl48",
    } = options;

    const existingToken = fcmAppTokenLS.get();

    const validExistingToken =
      typeof existingToken === "string" ? existingToken : null;

    if (validExistingToken && !forceRefresh) {
      return validExistingToken;
    }

    if (!messaging) {
      console.error("FCM: Firebase messaging is not initialized");
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("FCM: Notification permission not granted");
      return null;
    }

    const serviceWorkerRegistration =
      await navigator.serviceWorker.getRegistration();
    if (!serviceWorkerRegistration) {
      console.error("FCM: No service worker registration found");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration,
    });

    if (token) {
      fcmAppTokenLS.set(token);
      console.log("FCM: Token generated and stored successfully");
    } else {
      console.error("FCM: Failed to generate token");
    }

    return token;
  } catch (error) {
    console.error("FCM: Error getting FCM token:", error);
    return null;
  }
};

const sendTokenToServer = async (
  token: string,
  deviceId: string,
  authToken: string
): Promise<SendTokenResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/set-app-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          token,
          deviceId,
          platform: "web",
          timestamp: new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`FCM: Server returned ${response.status}:`, errorText);
      return {
        success: false,
        message: `Server error: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || "Token sent successfully",
    };
  } catch (error) {
    console.error("FCM: Network error sending token to server:", error);
    return {
      success: false,
      message: "Network error",
    };
  }
};

export const removeAppTokenFromServer =
  async (): Promise<SendTokenResponse> => {
    try {
      const authTokenRaw = accessTokenLs?.get();
      const deviceId = getOrCreateDeviceId();
      const tokenRaw = fcmAppTokenLS.get();

      const authToken = typeof authTokenRaw === "string" ? authTokenRaw : null;
      const token = typeof tokenRaw === "string" ? tokenRaw : null;

      if (!authToken || !token) {
        return { success: false, message: "No token to remove" };
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/remove-app-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            token,
            deviceId,
          }),
        }
      );

      if (response.ok) {
        fcmAppTokenLS.remove();
        console.log("FCM: Token removed successfully");
        return { success: true, message: "Token removed successfully" };
      } else {
        console.error("FCM: Failed to remove token from server");
        return { success: false, message: "Failed to remove token" };
      }
    } catch (error) {
      console.error("FCM: Error removing token:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Error removing token",
      };
    }
  };

export const isFCMSupported = (): boolean => {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "Notification" in window &&
    !!messaging
  );
};

export const refreshFCMToken = async (): Promise<SendTokenResponse> => {
  return sendAppTokenToServer({ forceRefresh: true });
};
