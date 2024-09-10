import React from "react";
import { cn } from "./lib/utils";

type WaveActionTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  action: string;
};

type ReloadActionTextProps = React.HTMLAttributes<HTMLSpanElement>;

type ShopActionTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  shop: string;
  reroll: number;
};

const WaveActionText: React.FC<WaveActionTextProps> = ({
  className,
  action,
}) => <span className={className}>{action}</span>;

const ReloadActionText: React.FC<ReloadActionTextProps> = ({ className }) => (
  <WaveActionText
    className={cn("font-bold text-red-600", className)}
    action={"Reload Your Game (F5)"}
  />
);

const ShopActionText: React.FC<ShopActionTextProps> = ({
  className,
  shop,
  reroll,
}) => (
  <WaveActionText
    className={cn("font-bold", className)}
    action={`Shop: ${reroll > 0 ? `Reroll ${reroll}x, ` : ""}${shop}`}
  />
);

export { ReloadActionText, ShopActionText, WaveActionText };
