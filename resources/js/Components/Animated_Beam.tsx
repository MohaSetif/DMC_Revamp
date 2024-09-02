"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "../utils/cn";
import { AnimatedBeam } from "../Components/magic.ui/animated-beam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPills, faServer, faUser } from "@fortawesome/free-solid-svg-icons";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full bg-span_slate p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "w-full max-w-md h-64 group isolate flex flex-col rounded-2xl border border-card_border bg-card_bg shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025]",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex h-full w-[75%] ml-auto mr-auto max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div5Ref}>
            <FontAwesomeIcon icon={faUser} color="white" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div4Ref} className="size-16">
            <FontAwesomeIcon icon={faServer} color="white" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <FontAwesomeIcon icon={faPills} color="white" />
          </Circle>
          <Circle ref={div2Ref}>
            <FontAwesomeIcon icon={faPills} color="white" />
          </Circle>
          <Circle ref={div3Ref}>
            <FontAwesomeIcon icon={faPills} color="white" />
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div5Ref}
        duration={3}
      />
    </div>
  );
}