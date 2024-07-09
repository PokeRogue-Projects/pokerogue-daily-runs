import * as React from "react";

const TrainerCard: React.FC<{
  trainerId: string;
  trainerType: string;
  name?: string;
}> = ({ trainerId, trainerType, name }) => {
  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {trainerType.includes("Trainer") && <p>Trainer</p>}
        {trainerType.includes("Gym") && <p>Gym Leader</p>}
        {name || trainerId}
        <div
          className={
            trainerType.includes("Trainer") ? "trainer-card" : "leader-card"
          }
        >
          <div>
            <img
              src={`https://wiki.pokerogue.net/_media/trainers:${trainerId}.png`}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://raw.githubusercontent.com/pagefaultgames/pokerogue/main/public/images/trainer/unknown_m.png")
              }
              alt={name || trainerId}
              style={{ height: "100px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
