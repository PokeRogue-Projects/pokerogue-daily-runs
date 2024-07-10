import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WaveData } from "@/types";

const WaveInfoCard: React.FC<{ wave: WaveData; waveIndex: number }> = ({
  wave,
  waveIndex,
}) => (
  <Card className="w-full h-full">
    <CardContent>
      <div className="space-y-4 justify-center my-6">
        {wave.reload && (
          <p className="font-bold text-red-600">Reload Your Game</p>
        )}
        {Array.isArray(wave.action) ? (
          wave.action.map((action, index) => (
            <p key={index} className="whitespace-pre-line">
              {action}
            </p>
          ))
        ) : (
          <p>{wave.action}</p>
        )}
        {wave.shop && (
          <p className="font-bold">Shop: {wave.shop}</p>
        )}
      </div>
    </CardContent>
  </Card>
);

export default WaveInfoCard;
