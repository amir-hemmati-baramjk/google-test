"use client";
import React, { useTransition, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/i18n/navigation";
import { toast } from "react-toastify";
import { Button } from "../../_components/button/button";
import Textbox from "../../_components/inputs/textBox";
import { useUser } from "@/stores/userContext";
import { createGameSchema } from "@/type/api/game/createGame.schema";
import { createGame } from "@/type/api/game/createGame.types";
import { LastCreatedGame } from "@/type/api/game/game.type";
import { ApiResponse } from "@/core/httpSercive.types";
import { createGameService } from "@/core/game/create-game-service";
import AssistantSelect from "../../_components/inputs/selectbox";
import CounterInput from "../../create-game/_components/CounterInput";
import { restartGame } from "@/core/game/restart-game-service";

interface CreateGameFormProps {
  lastGame: LastCreatedGame | null;
  availableAssistances?: string[];
}

const RestartGameForm: React.FC<CreateGameFormProps> = ({
  lastGame,
  availableAssistances = [
    "Remove2Options",
    "DoublePoints",
    "UseSilence",
    "SkipQuestion",
    "ChangeQuestion",
  ],
}) => {
  const { setUser, user } = useUser();
  const t = useTranslations("restart-game-form");
  const [isPending, startTransition] = useTransition();
  const [isKeepGoingPending, startKeepGoingTransition] = useTransition();
  const router = useRouter();

  const handleKeepGoing = () => {
    startKeepGoingTransition(() => {
      router.push(`/game/${lastGame?.id}`);
    });
  };
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
    if (lastGame) {
      reset({
        Name: lastGame.name || "Falta Trivia Game",
        teamOneName: lastGame.teamOneName || "A",
        teamTwoName: lastGame.teamTwoName || "B",
        teamOnePlayerCount: lastGame.teamOnePlayerCount || 1,
        teamTwoPlayerCount: lastGame.teamTwoPlayerCount || 1,
        assistants: lastGame.assistants || [],
        time200: lastGame.time200 || 20,
        time400: lastGame.time400 || 20,
        time600: lastGame.time600 || 60,
      });
    }
  }, [lastGame, reset]);

  const options = availableAssistances.map((a) => ({
    label: t(`assistantOptions.${a}`),
    value: a,
  }));

  const handleAssistantChange = (values: string[]) => {
    setValue("assistants", values, { shouldValidate: true });
  };

  const onSubmit = (data: createGame) => {
    if (data.assistants.length !== 3) {
      toast.error(t("please-select-three-assistants"));
      return;
    }

    startTransition(async () => {
      const response: ApiResponse = await restartGame(
        data,
        lastGame?.id as string
      );

      if (response?.success) {
        router.push(`/game/${response?.data}`);
        if (user?.gPoint) setUser({ ...user, gPoint: user.gPoint - 100 });
      } else {
        toast.error(response?.errors || t("unknown-error"));
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full"
    >
      <div className="grid grid-cols-1 gap-3 w-full">
        <Textbox
          variant="primary"
          labelVariant="primary"
          {...register("Name")}
          label={t("gameName")}
          error={errors.Name}
          onFocus={() => {
            if (getValues("Name") === "Falta Trivia Game") setValue("Name", "");
          }}
        />

        <AssistantSelect
          isDisabled={true}
          label={t("select-assistants")}
          options={options.filter((it) => it.value !== "TakePoints")}
          onChange={handleAssistantChange}
          error={errors.assistants?.message}
          defaultValue={getValues("assistants")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 w-full border-y border-gray-100 py-4 my-2">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <Textbox
            variant="primary"
            labelVariant="primary"
            {...register("teamOneName")}
            label={t("team-a")}
            error={errors.teamOneName}
          />
          <CounterInput
            control={control}
            name="teamOnePlayerCount"
            label={t("playerCountTeamA")}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-3">
          <Textbox
            variant="primary"
            labelVariant="primary"
            {...register("teamTwoName")}
            label={t("team-b")}
            error={errors.teamTwoName}
          />
          <CounterInput
            control={control}
            name="teamTwoPlayerCount"
            label={t("playerCountTeamB")}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full">
        <CounterInput
          control={control}
          name="time200"
          label={t("time-200")}
          showButtons={false}
          allowInput
        />
        <CounterInput
          control={control}
          name="time400"
          label={t("time-400")}
          showButtons={false}
          allowInput
        />
        <CounterInput
          control={control}
          name="time600"
          label={t("time-600")}
          showButtons={false}
          allowInput
        />
      </div>
      <div className="grid grid-cols-2 gap-3 text-[14px] mt-5 w-full">
        <Button
          isOutline={true}
          variant="accent"
          type="submit"
          isLoading={isPending}
          disabled={isKeepGoingPending || isPending}
          className="!whitespace-nowrap"
        >
          {t("startAgain")}
        </Button>
        <Button
          variant="primary"
          onClick={handleKeepGoing}
          isLoading={isKeepGoingPending}
          className="!whitespace-nowrap"
        >
          {t("keepGoing")}
        </Button>
      </div>
    </form>
  );
};

export default RestartGameForm;
