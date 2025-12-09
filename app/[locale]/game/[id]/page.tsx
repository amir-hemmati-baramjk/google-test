"use client";
import { useGameStore } from "@/stores/gameStore";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { Button } from "../../_components/button/button";
import { PlusIcon } from "../../_components/icons/PlusIcon";
import { ArrowLeftIcon } from "../../_components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../_components/icons/ArrowRightIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AssistanceBox from "../_components/AssistanceBox";

export default function Page() {
  const game = useGameStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const router = useRouter();

  // تعداد آیتم‌ها در هر صفحه بر اساس breakpoint
  const getItemsPerPage = () => {
    if (typeof window === "undefined") return 2;

    const width = window.innerWidth;
    if (width < 320) return 2; // xs
    if (width < 640) return 4; // sm
    if (width < 768) return 4; // md
    if (width < 1024) return 6; // lg
    if (width < 1280) return 6; // xl
    return 6; // 2xl
  };

  // بروزرسانی itemsPerPage هنگام resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      // reset به صفحه اول وقتی itemsPerPage تغییر می‌کند
      setCurrentPage(0);
    };

    window.addEventListener("resize", handleResize);
    // مقدار اولیه
    setItemsPerPage(getItemsPerPage());

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil((game?.categories?.length || 0) / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;

  // آیتم‌های فعلی + آیتم‌های خالی برای پر کردن تا 6 آیتم
  const currentCategories =
    game?.categories?.slice(startIndex, startIndex + itemsPerPage) || [];

  // اگر کمتر از itemsPerPage آیتم داریم، آیتم‌های خالی اضافه می‌کنیم
  const emptyItemsCount = itemsPerPage - currentCategories.length;
  const displayCategories = [
    ...currentCategories,
    ...Array(emptyItemsCount > 0 ? emptyItemsCount : 0).fill(null),
  ];

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle question click with assistant pending state
  const handleQuestionClick = (questionId: string) => {
    const gameStore = useGameStore.getState();
    let url = `/game/${game.id}/question/${questionId}`;

    if (gameStore.pendingDoublePoint) {
      url += "?assistant=doublePoint";
      gameStore.setPendingDoublePoint(false);
    } else if (gameStore.pendingTakePoint) {
      url += "?assistant=takePoint";
      gameStore.setPendingTakePoint(false);
    } else if (gameStore.pendingSilence) {
      url += "?assistant=silence";
      gameStore.setPendingSilence(false);
    }

    router.push(url);
  };

  return (
    <>
      <div className="p-3 flex flex-col justify-between h-full my-auto">
        {/* Grid برای نمایش آیتم‌ها */}
        <div
          className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-3 my-auto`}
        >
          {displayCategories.map((item, index) => (
            <div
              key={item?.id || `empty-${index}`}
              className={`w-full bg-primary-gradient p-1 lg:p-2 xl:p-3 rounded-[10px] ${
                !item ? "opacity-0 pointer-events-none" : ""
              }`}
            >
              {item ? (
                <>
                  <div className="bg-white flex justify-center items-center rounded-[10px]">
                    <Image
                      alt={item.name || "Category image"}
                      width={200}
                      height={200}
                      src={item.picture?.downloadUrl || "/default-image.jpg"}
                      className="w-full sm:w-[70%] lg:w-full h-auto object-cover transition-opacity duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1 py-2 w-full">
                    {[200, 400, 600].map((points) => (
                      <div
                        key={points}
                        className="w-full py-1.5 xl:py-2.5 grid grid-cols-2 text-[12px] md:text-[14px] lg:text-[20px] xl:text-[24px] font-[600] bg-[#EEE5FD] rounded-[12px]"
                      >
                        {item?.questions
                          ?.filter((q: any) => q?.points === points)
                          .map((q: any, qIndex: number) => (
                            <button
                              key={q.id}
                              onClick={() => handleQuestionClick(q.id)}
                              disabled={q.isAnswered}
                              className={`text-center flex justify-center items-center ${
                                q.isAnswered
                                  ? "text-[#ccc] cursor-not-allowed"
                                  : "text-primary cursor-pointer"
                              } ${
                                qIndex === 0
                                  ? "border-r-primary border-r-[1px]"
                                  : ""
                              }`}
                            >
                              {q.points}
                            </button>
                          ))}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                // Placeholder برای آیتم‌های خالی
                <div className="invisible">
                  <div className="bg-white rounded-[10px] h-[150px]"></div>
                  <div className="flex flex-col justify-center gap-1 py-2 w-full">
                    {[200, 400, 600].map((points) => (
                      <div
                        key={points}
                        className="w-full py-2 grid grid-cols-2 text-sm lg:text-lg xl:text-xl 2xl:text-2xl bg-[#EEE5FD] font-bold rounded-[12px]"
                      >
                        <div className="text-center flex justify-center items-center text-primary border-r-primary border-r-[1px]">
                          {points}
                        </div>
                        <div className="text-center flex justify-center items-center text-primary">
                          {points}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-4 mt-2">
          <Button
            className="!p-1.5 w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 !rounded-[5px]"
            size="small"
            variant="primary"
            shape="square"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <ArrowLeftIcon />
          </Button>

          <p className="text-gray-700">
            {currentPage + 1} / {totalPages}
          </p>

          <Button
            className="!p-1.5 w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 !rounded-[5px]"
            size="small"
            variant="primary"
            shape="square"
            onClick={nextPage}
            disabled={currentPage >= totalPages - 1}
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
      <div className="p-2 py-1 lg:py-3 xl:py-5 bg-light-purple w-full flex justify-center items-center h-fit">
        <div className="w-1/2 sm:w-2/5 px-2 flex gap-2 justify-center items-center flex-col sm:flex-row border-l-[2px] border-primary sm:border-none">
          <div className="flex justify-center items-center gap-5 w-full mt-auto">
            <div className="w-full text-center gap-2 flex flex-col justify-between items-center lg:gap-2 2xl:gap-3 text-[10px] md:text-[16px] lg:text-[14px]  xl:text-[24px]">
              <p className="text-white font-bold bg-light-purple-gradient text-sm lg:text-lg xl:text-xl 3xl:text-2xl w-full rounded-[10px] py-1.5 lg:py-2 xl:py-3">
                {game?.teamOneName}
              </p>
              <div className="w-full flex justify-between items-center gap-2 p-1 m-auto rounded-[8px] h-fit">
                <Button
                  className="!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
                  variant="primary"
                  shape="square"
                >
                  <PlusIcon />
                </Button>
                <p className="border-[2px] text-sm sm:text-md lg:text-lg xl:text-xl 2xl:text-2xl border-primary rounded-[8px] w-2/3 py-2 flex justify-center items-center text-primary font-[700]">
                  {game?.teamOnePoints}
                </p>
                <Button
                  className="!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
                  size="small"
                  variant="primary"
                  shape="square"
                >
                  <PlusIcon />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-2/3">
            <AssistanceBox team={1} context="gameboard" />
          </div>
        </div>
        <div className="hidden h-full sm:flex w-1/4 p-5 "></div>
        <div className="w-1/2 sm:w-2/5 px-2 flex gap-2 justify-center items-center flex-col sm:flex-row ">
          <div className="flex justify-center items-center gap-5 w-full mt-auto">
            <div className="w-full text-center gap-2 flex flex-col justify-between items-center lg:gap-2 2xl:gap-3 text-[10px] md:text-[16px] lg:text-[14px]  xl:text-[24px]">
              <p className="text-white font-bold bg-light-purple-gradient text-sm lg:text-lg xl:text-xl 3xl:text-2xl w-full rounded-[10px] py-1.5 lg:py-2 xl:py-3">
                {game?.teamTwoName}
              </p>
              <div className="w-full flex justify-between items-center gap-2 p-1 m-auto rounded-[8px] h-fit">
                <Button
                  className="!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
                  variant="primary"
                  shape="square"
                >
                  <PlusIcon />
                </Button>
                <p className="border-[2px] text-sm sm:text-md lg:text-lg xl:text-xl 2xl:text-2xl border-primary rounded-[8px] w-2/3 py-2 flex justify-center items-center text-primary font-[700]">
                  {game?.teamTwoPoints}
                </p>
                <Button
                  className="!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
                  size="small"
                  variant="primary"
                  shape="square"
                >
                  <PlusIcon />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-2/3">
            <AssistanceBox team={2} context="gameboard" />
          </div>
        </div>
      </div>
    </>
  );
}
