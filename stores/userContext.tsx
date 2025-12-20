import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import {
  userDataSS,
  isLoginLS,
  localLangLS,
  CompleteRegistrationLS,
  accessTokenLs,
  refreshTokenLS,
} from "@/localeStorage/storage";
import { User } from "@/type/api/user/user.type";

// Context type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  isLogin: boolean;
  setIsLogin: (login: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  isInitialized: boolean;
  logout: () => void;
}

// Default context value
const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => {},
  updateUser: () => {},
  isLogin: false,
  setIsLogin: () => {},
  language: "en",
  setLanguage: () => {},
  isInitialized: false,
  logout: () => {},
};

// Create Context
const UserContext = createContext<UserContextType>(defaultContextValue);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  const APP_LANG_COOKIE = "APP_LANG";

  // Function to set language cookie
  const setAppLangCookie = useCallback((locale: "en" | "ar") => {
    if (typeof document !== "undefined") {
      document.cookie =
        `${APP_LANG_COOKIE}=${locale}; Path=/; Max-Age=${
          60 * 60 * 24 * 365
        }; SameSite=Lax` + (location.protocol === "https:" ? "; Secure" : "");
    }
  }, []);

  // Function to update partial user data
  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  // Function to handle user logout
  const logout = useCallback(() => {
    setUser(null);
    setIsLogin(false);
    userDataSS.remove();
    isLoginLS.remove();
    // If tokens need to be removed as well
    accessTokenLs.remove();
    refreshTokenLS.remove();
  }, []);

  // Sync user language with cookie and localStorage
  useEffect(() => {
    if (user?.language !== undefined && user?.language !== null) {
      const desiredLang = user.language === 1 ? "ar" : "en";
      setLanguage(desiredLang);
      setAppLangCookie(desiredLang);
      localLangLS.set(desiredLang);
    }
  }, [user?.language, setAppLangCookie]);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (language === "en" || language === "ar") {
      localLangLS.set(language);
      setAppLangCookie(language);
    }
  }, [language, setAppLangCookie]);

  // Load initial data from localStorage on component mount
  useEffect(() => {
    const loadInitialData = () => {
      try {
        // Load user data
        const rawUser = userDataSS.get();
        if (typeof rawUser === "string") {
          try {
            const parsedUser: User = JSON.parse(rawUser);
            setUser(parsedUser);
          } catch (error) {
            console.error("Error parsing user data:", error);
            userDataSS.remove(); // Remove corrupted data
          }
        }

        // Load login status
        const rawLogin = isLoginLS.get();
        if (typeof rawLogin === "string") {
          setIsLogin(rawLogin === "true");
        } else if (typeof rawLogin === "boolean") {
          setIsLogin(rawLogin);
        }

        // Load language preference
        const rawLang = localLangLS.get();
        if (
          typeof rawLang === "string" &&
          (rawLang === "en" || rawLang === "ar")
        ) {
          setLanguage(rawLang);
        } else {
          // Default language
          setLanguage("en");
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadInitialData();
  }, []);

  // Auto-save user data to localStorage when user changes
  useEffect(() => {
    if (isInitialized) {
      if (user) {
        userDataSS.set(JSON.stringify(user));
      } else {
        userDataSS.remove();
      }
    }
  }, [user, isInitialized]);

  // Auto-save login status to localStorage when it changes
  useEffect(() => {
    if (isInitialized) {
      isLoginLS.set(isLogin);
    }
  }, [isLogin, isInitialized]);

  const contextValue: UserContextType = {
    user,
    setUser,
    updateUser,
    isLogin,
    setIsLogin,
    language,
    setLanguage,
    isInitialized,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
