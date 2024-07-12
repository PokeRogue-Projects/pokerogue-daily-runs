import React from "react";
import { cn } from "./lib/utils";

type WaveActionTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  action: string;
};

type ReloadActionTextProps = React.HTMLAttributes<HTMLSpanElement>;

type ShopActionTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  shop: string;
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

const ShopActionText: React.FC<ShopActionTextProps> = ({ className, shop }) => (
  <WaveActionText
    className={cn("font-bold", className)}
    action={`Shop: ${shop}`}
  />
);

export { WaveActionText, ReloadActionText, ShopActionText };
