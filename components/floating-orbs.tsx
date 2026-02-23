"use client";

export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large indigo orb — top left */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-float-slow opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
        }}
      />
      {/* Violet orb — top right */}
      <div
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full animate-float-medium opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
        }}
      />
      {/* Small cyan orb — center right */}
      <div
        className="absolute top-1/3 right-10 w-[250px] h-[250px] rounded-full animate-float-fast opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)",
        }}
      />
      {/* Tiny accent orb — bottom left */}
      <div
        className="absolute bottom-20 left-1/4 w-[200px] h-[200px] rounded-full animate-pulse-glow opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
