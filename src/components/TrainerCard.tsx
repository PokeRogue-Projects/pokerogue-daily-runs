import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TrainerCard: React.FC<{
  trainerId: string;
  trainerType: string;
  name?: string;
  waveNumber?: number;
}> = ({ trainerId, trainerType, name, waveNumber }) => {
  return (
    <Card className="w-full max-w-sm mx-auto relative">
      {waveNumber !== undefined && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {waveNumber}
        </div>
      )}
      <CardContent className="flex flex-col items-center p-6">
        <p className="text-lg font-semibold mb-2">
          {trainerType.includes("Gym") ? "Gym Leader" : "Trainer"}
        </p>
        <p className="text-xl font-bold mb-4">{name || trainerId}</p>
        <div
          className={`rounded-lg p-4 ${
            trainerType.includes("Gym") ? "bg-purple-100" : "bg-blue-100"
          }`}
        >
          <img
            src={`https://wiki.pokerogue.net/_media/trainers:${trainerId}.png`}
            onError={(e) =>
              (e.currentTarget.src =
                "https://raw.githubusercontent.com/pagefaultgames/pokerogue/main/public/images/trainer/unknown_m.png")
            }
            alt={name || trainerId}
            className="h-32 w-32 object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainerCard;
