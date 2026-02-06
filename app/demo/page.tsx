"use client";

import { ShaderAnimation } from "@/components/ui/shader-animation";

export default function DemoPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
            <div className="relative flex h-[650px] w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                <ShaderAnimation />
                <span className="absolute pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white mix-blend-difference">
                    Shader Animation
                </span>
            </div>
        </div>
    )
}
