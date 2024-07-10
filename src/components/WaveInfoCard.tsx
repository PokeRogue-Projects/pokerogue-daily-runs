import { Card, CardContent } from "@/components/ui/card";
import { Wave } from "@/types";
import React from "react";

const WaveInfoCard: React.FC<{ readonly wave: Wave; readonly waveIndex: number }> = ({
  wave,
  waveIndex,
}) => (
  <Card className="w-full h-full">
    <CardContent>
      <div className="space-y-4 justify-center my-6">
        {wave.reload && (
          <p className="font-bold text-red-600">Reload Your Game</p>
        )}
        {Array.isArray(wave.actions) ? (
          wave.actions.map((action, index) => (
            <p key={index} className="whitespace-pre-line">
              {action}
            </p>
          ))
        ) : (
          <p>{wave.actions}</p>
        )}
        {wave.shop && (
          <p className="font-bold">Shop: {wave.shop}</p>
        )}
      </div>
    </CardContent>
  </Card>
);

export default WaveInfoCard;
