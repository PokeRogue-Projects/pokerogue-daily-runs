import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wave } from "@/types";
import React from "react";
import {
  ReloadActionText,
  ShopActionText,
  WaveActionText,
} from "./WaveActionText";

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
}> = ({ wave, waveIndex }) => (
  <Card className="w-full h-full flex flex-col">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">Wave {wave.id}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-8 justify-center">
        {wave.reload && (
          <p className="whitespace-pre-line">
            <ReloadActionText />
          </p>
        )}
        <div>
          {wave.actions.map((action, index) =>
            action !== "" ? (
              <Step key={index} text={action} index={index} />
            ) : (
              <></>
            ),
          )}
        </div>
        {wave.shop && (
          <p className="whitespace-pre-line">
            <ShopActionText shop={wave.shop} />
          </p>
        )}
      </div>
    </CardContent>
  </Card>
);

export default WaveInfoCard;
