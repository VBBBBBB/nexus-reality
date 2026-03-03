"use client";

import React, { useState, useEffect } from "react";
import { GlowingEffect } from "./glowing-effect";
import { cn } from "../../lib/utils";

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

export function GlowCard({ children, className, containerClassName }: GlowCardProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className={cn("relative h-full w-full", containerClassName)}>
            <GlowingEffect
                spread={40}
                glow={true}
                disabled={isMobile}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
            />
            <div className={cn("relative h-full w-full z-10", className)}>
                {children}
            </div>
        </div>
    );
}
