import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { AnimatedCollapsible, AnimatedCollapsibleContent, AnimatedCollapsibleTrigger } from "./ui/animatedCollapsible";

type FollowAlongWaveProps = React.HTMLAttributes<HTMLDivElement> & {
  wave: Queries.FollowAlongPageQuery["drpdJson"]["waves"][number];
  waveIndex: number;
};

const FollowAlongWave: React.FC<FollowAlongWaveProps> = ({
  wave,
  waveIndex,
}) => {
  const [waveOpen, setWaveOpen] = useState(true);
  const [actionChecks, setActionChecks] = useState(
    new Array(wave.actions.length).fill(false)
  );

  const handleActionCheckChange = (checkedIndex: number) => () => {
    setActionChecks(
      actionChecks.map((check, index) =>
        index != checkedIndex ? check : !check
      )
    );
  };

  return (
    <AnimatedCollapsible
      open={waveOpen}
      onOpenChange={setWaveOpen}
    >
      <AnimatedCollapsibleTrigger asChild>
        <button>
          <h3 className="font-bold py-1">Wave {waveIndex + 1}</h3>
        </button>
      </AnimatedCollapsibleTrigger>
      <AnimatedCollapsibleContent>
        <ul className="space-y-1">
          {wave.actions.map((action, actionIndex) => (
            <li key={actionIndex}>
              <input
                type="checkbox"
                id={`checkbox-${wave.id}-${actionIndex}`}
                className="mr-3"
              />
              <label htmlFor={`checkbox-${wave.id}-${actionIndex}`}>
                <span className="font-bold">{action}</span>
              </label>
            </li>
          ))}
        </ul>
        {wave.biome && <span className="ml-2 text-sm">({wave.biome})</span>}
        {(waveIndex + 1) % 10 == 0 && <Separator className="mt-4" />}
      </AnimatedCollapsibleContent>
    </AnimatedCollapsible>
  );
};

export default FollowAlongWave;
