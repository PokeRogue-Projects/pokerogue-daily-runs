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
        {wave.reload && (
          <div>
            <p className="font-semibold">Reload:</p>
            <p>Yes</p>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export default WaveInfoCard;
