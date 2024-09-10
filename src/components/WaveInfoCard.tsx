import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wave } from "@/types";
import { getInstructions } from "@/utils/waveUtils";
import React from "react";
import { ReloadActionText, ShopActionText } from "./WaveActionText";

const Step = (props: { text: string; index: number }) => (
  <div
    key={props.index}
    className="mb-4 grid grid-cols-[15px_1fr] items-start pb-2 last:mb-0 last:pb-0"
  >
    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-white" />
    <div className="space-y-1">
      <p className="text-sm font-medium leading-none">{props.text}</p>
    </div>
  </div>
);

const WaveInfoCard: React.FC<{
  readonly wave: Wave;
  readonly waveIndex: number;
}> = ({ wave, waveIndex }) => {
  const { reload, actions, shop, reroll } = getInstructions(wave);

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Wave {wave.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8 justify-center">
          {reload && (
            <p className="whitespace-pre-line">
              <ReloadActionText />
            </p>
          )}
          <div>
            {actions.map((action, index) => (
              <Step key={index} text={action} index={index} />
            ))}
          </div>
          {shop && (
            <p className="whitespace-pre-line">
              <ShopActionText shop={shop} reroll={reroll} />
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WaveInfoCard;
