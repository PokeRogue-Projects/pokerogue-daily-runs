import { Card, CardContent } from "@/components/ui/card";
import { Wave } from "@/types";
import React from "react";
import {
  ReloadActionText,
  ShopActionText,
  WaveActionText,
} from "./WaveActionText";

const WaveInfoCard: React.FC<{
  readonly wave: Wave;
  readonly waveIndex: number;
}> = ({ wave, waveIndex }) => (
  <Card className="w-full h-full">
    <CardContent>
      <div className="space-y-4 justify-center my-6">
        {wave.reload && (
          <p className="whitespace-pre-line">
            <ReloadActionText />
          </p>
        )}
        {Array.isArray(wave.actions) ? (
          wave.actions.map((action, index) => (
            <p className="whitespace-pre-line">
              <WaveActionText key={index} action={action} />
            </p>
          ))
        ) : (
          <p>{wave.actions}</p>
        )}
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
