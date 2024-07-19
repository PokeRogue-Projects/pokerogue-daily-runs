import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { FileQuestion, MessageCircleQuestion } from "lucide-react";
import { cn } from "./lib/utils";

export const ReloadAlert: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => (
  <Alert className={cn("bg-neutral-200 dark:bg-slate-800", className)}>
    <MessageCircleQuestion className="w-4 h-4" />
    <AlertTitle>Not Seeing a Run You Expected?</AlertTitle>
    <AlertDescription>Try resetting the cache by pressing Shift + F5</AlertDescription>
  </Alert>
);
