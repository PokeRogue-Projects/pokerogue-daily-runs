import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { AnimatedCollapsible, AnimatedCollapsibleContent, AnimatedCollapsibleTrigger } from "./ui/animatedCollapsible";
import { Checkbox } from "./ui/checkbox";

type FollowAlongWaveProps = React.HTMLAttributes<HTMLDivElement> & {
  wave: Queries.FollowAlongPageQuery["drpdJson"]["waves"][number];
  waveIndex: number;
};

const FollowAlongWave: React.FC<FollowAlongWaveProps> = ({
  className,
  wave,
  waveIndex,
}) => {
  const [waveOpen, setWaveOpen] = useState(true);
  const [actionChecks, setActionChecks] = useState<readonly boolean[]>(
    new Array(wave.actions.length).fill(false)
  );

  const handleActionCheckChange = (checkedIndex: number) => () => {
    const newActionChecks = actionChecks.map((check, index) =>
      index != checkedIndex ? check : !check
    );

    setActionChecks(newActionChecks);
    if (newActionChecks.every(Boolean))
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
      <AnimatedCollapsibleContent>
        <ul className="space-y-1">
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
        {wave.biome && <span className="ml-2 text-sm">({wave.biome})</span>}
      </AnimatedCollapsibleContent>
    </AnimatedCollapsible>
  );
};

export default FollowAlongWave;
