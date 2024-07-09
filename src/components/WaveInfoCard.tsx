import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wave } from "@/types";

const WaveInfoCard: React.FC<{ wave: Wave; waveIndex: number }> = ({
  wave,
  waveIndex,
}) => (
  <Card className="h-fit">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">
        Wave {waveIndex + 1}: {wave.action}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <p className="font-semibold">Biome:</p>
          <p>{wave.biome}</p>
        </div>
        <div>
          <p className="font-semibold">Type:</p>
          <p>{wave.type}</p>
        </div>
        {wave.double && (
          <div>
            <p className="font-semibold">Double:</p>
            <p>Yes</p>
          </div>
        )}
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
