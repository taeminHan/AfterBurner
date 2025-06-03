"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Welcome to AfterBurner",
    description: "빠르고 가볍게, 아이디어를 불태우세요.",
  },
  {
    title: "Spark & Chamber",
    description: "노트는 Spark, 폴더는 Chamber로 불립니다.",
  },
  {
    title: "Start",
    description: "첫 Spark를 만들어보세요!",
  },
];

export default function OnboardingDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const alreadySeen = localStorage.getItem("afterburner:onboarding");
    if (!alreadySeen) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("afterburner:onboarding", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{steps[step].title}</DialogTitle>
          <DialogDescription>{steps[step].description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-between mt-4">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              이전
            </Button>
          ) : <div />}
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>다음</Button>
          ) : (
            <Button onClick={handleClose}>시작하기</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
