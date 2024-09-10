import React, { useState } from "react";
import {
  AnimatedCollapsible,
  AnimatedCollapsibleContent,
  AnimatedCollapsibleTrigger,
} from "./ui/animatedCollapsible";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import {
  ReloadActionText,
  ShopActionText,
  WaveActionText,
} from "./WaveActionText";
import { CheckedState } from "@radix-ui/react-checkbox";
import { cn } from "./lib/utils";

type FollowAlongWaveProps = React.HTMLAttributes<HTMLDivElement> & {
  wave: Queries.FollowAlongPageQuery["drpdJson"]["waves"][number];
  waveIndex: number;
  waveOpen: boolean;
  setWaveOpen: (value: boolean) => void;
};

type FollowAlongWaveGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  waves: Queries.FollowAlongPageQuery["drpdJson"]["waves"];
  startIndex: number;
};

const FollowAlongWave: React.FC<FollowAlongWaveProps> = ({
  className,
  wave,
  waveIndex,
  waveOpen,
  setWaveOpen,
}) => {
  const [actionChecks, setActionChecks] = useState<readonly boolean[]>(
    new Array(wave.actions.length).fill(false),
  );
  const [reloadCheck, setReloadCheck] = useState<boolean>(false);
  const [shopCheck, setShopCheck] = useState<boolean>(false);

  const handleActionCheckChange =
    (changeIndex: number) => (newCheck: CheckedState) => {
      console.log(newCheck);
      const newActionChecks: readonly boolean[] = actionChecks.map(
        (check, index) => (index != changeIndex ? check : newCheck === true),
      );

      updateWaveOpen(newActionChecks, reloadCheck, shopCheck);
      setActionChecks(newActionChecks);
    };

  const handleReloadCheckChange = (newCheck: CheckedState) => {
    const newReloadCheck = newCheck === true;

    updateWaveOpen(actionChecks, newReloadCheck, shopCheck);
    setReloadCheck(newReloadCheck);
  };

  const handleShopCheckChange = (newCheck: CheckedState) => {
    const newShopCheck = newCheck === true;

    updateWaveOpen(actionChecks, reloadCheck, newShopCheck);
    setShopCheck(newShopCheck);
  };

  const updateWaveOpen = (
    newActionChecks: readonly boolean[],
    newReloadCheck: boolean,
    newShopCheck: boolean,
  ) => {
    if (
      newActionChecks.every(Boolean) &&
      (!wave.reload || newReloadCheck) &&
      (wave.shop === "" || newShopCheck)
    )
      setWaveOpen(false);
  };

  return (
    <AnimatedCollapsible
      className={className}
      open={waveOpen}
      onOpenChange={setWaveOpen}
    >
      <AnimatedCollapsibleTrigger asChild>
        <button>
          <h3 className="font-bold py-1">Wave {waveIndex + 1}</h3>
        </button>
      </AnimatedCollapsibleTrigger>
      <AnimatedCollapsibleContent className="className=data-[state=closed]:animate-[0.2s_50ms_collapsible-up_ease-out]">
        <ul className="space-y-1 my-2 ml-1">
          {wave.reload && (
            <li className="ml-1 space-x-2">
              <Checkbox
                id={`checkbox-${wave.id}-reload`}
                checked={reloadCheck}
                onCheckedChange={handleReloadCheckChange}
              />
              <label htmlFor={`checkbox-${wave.id}-reload`}>
                <ReloadActionText />
              </label>
            </li>
          )}
          {wave.actions.map((action, actionIndex) =>
            action !== "" ? (
              <li key={actionIndex} className="ml-1 space-x-2">
                <Checkbox
                  id={`checkbox-${wave.id}-${actionIndex}`}
                  checked={actionChecks[actionIndex]}
                  onCheckedChange={handleActionCheckChange(actionIndex)}
                />
                <label htmlFor={`checkbox-${wave.id}-${actionIndex}`}>
                  <WaveActionText className="font-semibold" action={action} />
                </label>
              </li>
            ) : (
              <></>
            ),
          )}
          {wave.shop !== "" && (
            <li className="ml-1 space-x-2">
              <Checkbox
                id={`checkbox-${wave.id}-shop`}
                checked={shopCheck}
                onCheckedChange={handleShopCheckChange}
              />
              <label htmlFor={`checkbox-${wave.id}-shop`}>
                <ShopActionText shop={wave.shop} />
              </label>
            </li>
          )}
        </ul>
      </AnimatedCollapsibleContent>
    </AnimatedCollapsible>
  );
};

const FollowAlongWaveGroup: React.FC<FollowAlongWaveGroupProps> = ({
  className,
  waves,
  startIndex,
}) => {
  const [waveGroupOpen, setWaveGroupOpen] = useState(true);
  const [waveOpens, setWaveOpens] = useState<readonly boolean[]>(
    new Array(waves.length).fill(true),
  );

  const handleWaveOpenChange = (changeIndex: number) => () => {
    const newWaveOpens = waveOpens.map((waveOpen, index) =>
      index != changeIndex ? waveOpen : !waveOpen,
    );

    setWaveOpens(newWaveOpens);
    if (newWaveOpens.every((waveOpen) => !waveOpen))
      setTimeout(() => setWaveGroupOpen(false), 300);
  };

  return (
    waves.length != 0 && (
      <AnimatedCollapsible
        className={className}
        open={waveGroupOpen}
        onOpenChange={setWaveGroupOpen}
      >
        <AnimatedCollapsibleTrigger asChild>
          <button>
            <h2 className="text-xl font-bold mb-3">
              Wave {startIndex + 1} - {startIndex + waves.length}
              <span className="ml-2 font-medium text-sm">
                ({waves[0].biome})
              </span>
            </h2>
          </button>
        </AnimatedCollapsibleTrigger>
        <AnimatedCollapsibleContent className="data-[state=closed]:animate-[0.4s_50ms_collapsible-up]">
          <ul className="space-y-1 ml-1">
            {waves.map((wave, waveIndex) => (
              <li key={waveIndex} className="items-center">
                <FollowAlongWave
                  className="ml-1"
                  wave={wave}
                  waveIndex={startIndex + waveIndex}
                  waveOpen={waveOpens[waveIndex]}
                  setWaveOpen={handleWaveOpenChange(waveIndex)}
                />
              </li>
            ))}
          </ul>
          <div className="py-2" />
        </AnimatedCollapsibleContent>
      </AnimatedCollapsible>
    )
  );
};

export { FollowAlongWave, FollowAlongWaveGroup };
