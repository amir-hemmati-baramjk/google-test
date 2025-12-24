"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import styles from "./QuestionMedia.module.css";
import { useTranslations } from "next-intl";
import { VideoPlayer } from "@/app/[locale]/_components/videoplayer";
import { AudioPlayer } from "@/app/[locale]/_components/audioPlayer";
import { QuestionMediaProps } from "./media.type";

const Media: React.FC<QuestionMediaProps> = React.memo(
  ({ data, notPlay, setShowQuestiontext }) => {
    const [openState, setOpenState] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const t = useTranslations("index");

    useEffect(() => {
      setIsLoading(!!data);
    }, [data]);

    const slides = useMemo(() => {
      return data?.mediaType === 0 ? [{ src: data.downloadUrl }] : [];
    }, [data]);

    const handleMediaLoaded = () => setIsLoading(false);

    return (
      <div className="h-full w-full relative flex justify-center items-center">
        {/* {isLoading && data?.mediaType === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/assets/loading/buttonLoadingWhite.svg"
              alt="Loading..."
              className="w-10"
            />
          </div>
        )} */}

        {data?.mediaType === 0 && (
          <div className=" h-full overflow-hidden flex justify-center">
            <Lightbox
              className={styles.lightbox}
              open={openState}
              close={() => setOpenState(false)}
              slides={[
                {
                  src: data.downloadUrl,
                  width: 1200,
                  height: 800,
                },
              ]}
              plugins={[Zoom, Fullscreen]}
              carousel={{ finite: true }}
              zoom={{
                maxZoomPixelRatio: 3,
                scrollToZoom: true,
              }}
            />

            <Image
              onClick={() => setOpenState(true)}
              width={500}
              height={500}
              className={`cursor-zoom-in object-contain  rounded-[6px] transition-opacity duration-300 ${"opacity-100"}`}
              src={data?.downloadUrl}
              alt="Question Media"
              priority
            />
          </div>
        )}

        {data?.mediaType === 1 && (
          <div className="overflow-hidden flex justify-center h-full w-fit min-w-[300px]">
            <VideoPlayer
              onEnd={() => {
                if (setShowQuestiontext) {
                  setShowQuestiontext(true);
                }
              }}
              src={data?.downloadUrl}
            />
          </div>
        )}

        {data?.mediaType === 2 && (
          <div className="flex justify-center items-center w-full">
            <AudioPlayer src={data?.downloadUrl} />
          </div>
        )}
      </div>
    );
  }
);

export default Media;
