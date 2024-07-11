import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

type FollowAlongWaveProps = React.HTMLAttributes<HTMLDivElement> & {
  wave: Queries.FollowAlongPageQuery["drpdJson"]["waves"][number];
  waveIndex: number;
};

const FollowAlongWave: React.FC<FollowAlongWaveProps> = ({
  wave,
  waveIndex,
}) => {
  const [waveOpen, setWaveOpen] = useState(true);

  return (
    <Collapsible
      open={waveOpen}
      onOpenChange={setWaveOpen}
    >
      <CollapsibleTrigger asChild>
        <button>
          <h2 className="font-bold py-1">Wave {waveIndex + 1}</h2>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
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
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FollowAlongWave;
