"use client";
import React, { useTransition, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/i18n/navigation";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { SelectedCategoryForCreateGameLs } from "@/localeStorage/storage";
import { Button } from "../../_components/button/button";
import CounterInput from "./CounterInput";
import Textbox from "../../_components/inputs/textBox";
import AssistantSelect from "./AssistantSelect";
import { useUser } from "@/stores/userContext";
import { createGameSchema } from "@/type/api/game/createGame.schema";
import {
  createGame,
  CreateGameFormProps,
} from "@/type/api/game/createGame.types";
import { LastCreatedGame } from "@/type/api/game/game.type";
import { ApiResponse } from "@/core/httpSercive.types";

import { getLatestUserGame } from "@/core/game/get-latest-user-game";
import { getAssistance } from "@/core/game/get-available-assistance";
import { createGameService } from "@/core/game/create-game-service";
import LogoMotionLoading from "../../_components/logoMotionLoading/LogoMotionLoading";

const CreateGameForm: React.FC<CreateGameFormProps> = ({
  selectedCatItems,
}) => {
  const { setUser, user } = useUser();
  const t = useTranslations("CreateGameForm");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isFormInitialized, setIsFormInitialized] = React.useState(false);

  const { data: assistance = [] } = useQuery<string[]>({
    queryKey: ["assistance"],
    queryFn: getAssistance,
    staleTime: Infinity,
    initialData: undefined,
  });

  const { data: lastGame, isLoading: isLastGameLoading } =
    useQuery<LastCreatedGame | null>({
      queryKey: ["lastCreatedGame"],
      queryFn: getLatestUserGame,
      staleTime: 5 * 60 * 1000,
    });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
    reset,
  } = useForm<createGame>({
    resolver: zodResolver(createGameSchema(t)),
    defaultValues: {
      Name: "Falta Trivia Game",
      teamOneName: "A",
      teamTwoName: "B",
      teamOnePlayerCount: 1,
      teamTwoPlayerCount: 1,
      assistants: [],
      time200: 20,
      time400: 20,
      time600: 60,
    },
  });

  useEffect(() => {
    if (lastGame && !isLastGameLoading && !isFormInitialized) {
      reset({
        Name: lastGame?.name || "Falta Trivia Game",
        teamOneName: lastGame.teamOneName || "A",
        teamTwoName: lastGame.teamTwoName || "B",
        teamOnePlayerCount: lastGame.teamOnePlayerCount || 1,
        teamTwoPlayerCount: lastGame.teamTwoPlayerCount || 1,
        assistants: lastGame.assistants || [],
        time200: lastGame.time200 || 20,
        time400: lastGame.time400 || 20,
        time600: lastGame.time600 || 60,
      });
      setIsFormInitialized(true);
    }
  }, [lastGame, isLastGameLoading, reset, isFormInitialized]);

  const options: { label: string; value: string }[] = (assistance || []).map(
    (a) => ({
      label: t(`assistantOptions.${a}`),
      value: a,
    })
  );

  const handleAssistantChange = (values: string[]) => {
    setValue("assistants", values, { shouldValidate: true });
  };

  const onSubmit = (data: createGame) => {
    if (data.assistants.length !== 3) {
      toast.error(t("please-select-three-assistants"));
      return;
    }

    startTransition(async () => {
      const payload = {
        ...data,
        categoryIds: selectedCatItems,
        assistants: data.assistants,
      };

      const response: ApiResponse = await createGameService(payload);

      if (response?.success) {
        router.push(`/game/${response?.data}`);

        if (user?.gPoint) setUser({ ...user, gPoint: user.gPoint - 100 });

        SelectedCategoryForCreateGameLs.remove();
      } else {
        toast.error(response?.errors || t("unknown-error"));
      }
    });
  };

  if (isLastGameLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LogoMotionLoading />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-3 w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 w-full">
        <Textbox
          variant="primary"
          labelVariant="primary"
          {...register("Name")}
          name="Name"
          label={t("gameName")}
          placeholder={t("please-enter")}
          error={errors.Name}
          onFocus={() => {
            if (getValues("Name") === "Falta Trivia Game") setValue("Name", "");
          }}
        />

        <AssistantSelect
          label={t("select-assistants")}
          options={options?.filter((it) => it?.value !== "TakePoints")}
          onChange={handleAssistantChange}
          error={errors.assistants?.message}
          defaultValue={lastGame?.assistants || []}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <Textbox
            variant="primary"
            labelVariant="primary"
            {...register("teamOneName")}
            name="teamOneName"
            label={t("team-a")}
            placeholder={t("please-enter")}
            error={errors.teamOneName}
            onFocus={() => {
              if (getValues("teamOneName") === "A") setValue("teamOneName", "");
            }}
          />
          <CounterInput
            control={control}
            name="teamOnePlayerCount"
            error={errors.teamOnePlayerCount?.message}
            minLimit={1}
            maxLimit={500}
            label={t("playerCountTeamA")}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-3">
          <Textbox
            variant="primary"
            labelVariant="primary"
            {...register("teamTwoName")}
            name="teamTwoName"
            label={t("team-b")}
            placeholder={t("please-enter")}
            error={errors.teamTwoName}
            onFocus={() => {
              if (getValues("teamTwoName") === "B") setValue("teamTwoName", "");
            }}
          />
          <CounterInput
            control={control}
            name="teamTwoPlayerCount"
            error={errors.teamTwoPlayerCount?.message}
            minLimit={1}
            maxLimit={500}
            label={t("playerCountTeamB")}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full">
        <div className="w-full lg:w-1/2">
          <CounterInput
            showButtons={false}
            allowInput={true}
            control={control}
            name="time200"
            label={t("time-200") || "200 Points Time (seconds)"}
            error={errors.time200?.message}
            minLimit={0}
            maxLimit={12000}
            step={10}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <CounterInput
            showButtons={false}
            allowInput={true}
            control={control}
            name="time400"
            label={t("time-400") || "400 Points Time (seconds)"}
            error={errors.time400?.message}
            minLimit={0}
            maxLimit={18000}
            step={10}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <CounterInput
            showButtons={false}
            allowInput={true}
            control={control}
            name="time600"
            label={t("time-600") || "600 Points Time (seconds)"}
            error={errors.time600?.message}
            minLimit={0}
            maxLimit={30000}
            step={10}
          />
        </div>
      </div>

      <Button
        isLoading={isPending}
        isDisabled={isPending || selectedCatItems.length === 0}
        type="submit"
        shape="full"
        className="mt-2"
        size="large"
        variant="primary"
      >
        {t("ready-to-play")}
      </Button>
    </form>
  );
};

export default CreateGameForm;
