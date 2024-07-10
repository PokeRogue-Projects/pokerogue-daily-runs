import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wave } from "@/types";

const WaveInfoCard: React.FC<{ wave: Wave; waveIndex: number }> = ({
  wave,
  waveIndex,
}) => (
  <Card className="h-fit">
    <CardContent>
      <div className="space-y-4">
        {wave.reload && (
          <p className="font-bold text-red-600">Reload Your Game</p>
        )}
        <div>
          {Array.isArray(wave.action) ? (
            wave.action.map((action, index) => (
              <p key={index} className="whitespace-pre-line">
                {action}
              </p>
            ))
          ) : (
            <p>{wave.action}</p>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default WaveInfoCard;
