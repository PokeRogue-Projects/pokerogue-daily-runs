import React, { useState } from "react";
import {
  AnimatedCollapsible,
  AnimatedCollapsibleContent,
  AnimatedCollapsibleTrigger,
} from "./ui/animatedCollapsible";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

type FollowAlongWaveProps = React.HTMLAttributes<HTMLDivElement> & {
  wave: Queries.FollowAlongPageQuery["drpdJson"]["waves"][number];
  waveIndex: number;
  waveOpen: boolean;
  setWaveOpen: (value: boolean) => void;
};

const FollowAlongWave: React.FC<FollowAlongWaveProps> = ({
  className,
  wave,
  waveIndex,
  waveOpen,
  setWaveOpen,
}) => {
  const [actionChecks, setActionChecks] = useState<readonly boolean[]>(
    new Array(wave.actions.length).fill(false)
  );

  const handleActionCheckChange = (changeIndex: number) => () => {
    const newActionChecks = actionChecks.map((check, index) =>
      index != changeIndex ? check : !check
    );

    setActionChecks(newActionChecks);
    if (newActionChecks.every(Boolean)) setWaveOpen(false);
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
      <AnimatedCollapsibleContent>
        <ul className="space-y-1 my-2 ml-1">
          {wave.actions.map((action, actionIndex) => (
            <li key={actionIndex} className="ml-1 space-x-2">
              <Checkbox
                id={`checkbox-${wave.id}-${actionIndex}`}
                checked={actionChecks[actionIndex]}
                onCheckedChange={handleActionCheckChange(actionIndex)}
              />
              <label htmlFor={`checkbox-${wave.id}-${actionIndex}`}>
                <span className="font-bold">{action}</span>
              </label>
            </li>
          ))}
        </ul>
      </AnimatedCollapsibleContent>
    </AnimatedCollapsible>
  );
};

type FollowAlongWaveGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  waves: Queries.FollowAlongPageQuery["drpdJson"]["waves"];
  startIndex: number;
};

const FollowAlongWaveGroup: React.FC<FollowAlongWaveGroupProps> = ({
  className,
  waves,
  startIndex,
}) => {
  const [waveGroupOpen, setWaveGroupOpen] = useState(true);
  const [waveOpens, setWaveOpens] = useState<readonly boolean[]>(
    new Array(waves.length).fill(true)
  );

  const handleWaveOpenChange = (changeIndex: number) => () => {
    const newWaveOpens = waveOpens.map((waveOpen, index) =>
      index != changeIndex ? waveOpen : !waveOpen
    );

    setWaveOpens(newWaveOpens);
    if (newWaveOpens.every(waveOpen => !waveOpen)) setWaveGroupOpen(false);
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
        <AnimatedCollapsibleContent>
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
        </AnimatedCollapsibleContent>
        {waveGroupOpen ? <Separator  className="my-6" /> : <div className="my-1"/>}
      </AnimatedCollapsible>
    )
  );
};

export { FollowAlongWave, FollowAlongWaveGroup };
