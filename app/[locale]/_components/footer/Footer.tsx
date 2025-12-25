import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const ANDROID_PLAY_URL =
    "https://play.google.com/store/apps/details?id=com.baramjk.falta";
  const IOS_APPSTORE_URL =
    "https://apps.apple.com/us/app/falta-%D9%81%D9%84%D8%AA%D9%87/id6743669553";
  return (
    <footer className="w-full bg-[#2D0066] py-6 px-4 md:px-12 lg:px-20 hidden lg:block mt-10 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Copyright Text */}
        <div className="text-white text-sm md:text-base lg:text-lg font-medium order-3 md:order-1 flex-1">
          Copyright {currentYear} Befalta All Rights Reserved
        </div>

        {/* App Store Buttons */}
        <div className="flex flex- justify-center items-center gap-4 order-2 md:order-2 flex-1">
          <Link
            href={IOS_APPSTORE_URL}
            target="_blank"
            className="transition-transform hover:scale-105 active:scale-95"
            aria-label="Download on App Store"
          >
            <Image
              src="/icons/appStore.svg"
              alt="App Store"
              width={160}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
          <Link
            href={ANDROID_PLAY_URL}
            target="_blank"
            className="transition-transform hover:scale-105 active:scale-95"
            aria-label="Get it on Google Play"
          >
            <Image
              src="/icons/goglePlay.svg"
              alt="Google Play"
              width={160}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-end gap-6 order-1 md:order-3 flex-1">
          <Link
            href={"https://www.tiktok.com/@befalta?_t=ZS-8z0D8DXnpBZ&_r=1"}
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="TikTok"
          >
            <Image
              src="/icons/tiktok.svg"
              alt="tiktok"
              width={160}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
          <Link
            href={"https://www.instagram.com/befalta?igsh=YWl0amFrYmRpcWg4"}
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="Instagram"
          >
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={160}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
