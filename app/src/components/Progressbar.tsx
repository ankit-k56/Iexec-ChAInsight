"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";
interface ProgressbarProps {
  progess: number;
}

const Progressbar: React.FC<ProgressbarProps> = ({ progess }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(progess), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-[80%]" />;
};

export default Progressbar;
