import React, { useEffect, useState } from "react";

export default function Preloader({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Auto-end after 5 seconds
    const timer = setTimeout(() => {
      handleFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    setFadeOut(true);
    // Wait for fade-out animation to complete before calling onFinish
    setTimeout(() => {
      onFinish();
    }, 500);
  };

  // Click anywhere to skip
  const handleClick = () => {
    handleFinish();
  };

  return (
    <div
      className={`fixed inset-0 w-full h-full bg-black z-[9999] cursor-pointer transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClick}
    >
      {/* Full screen video */}
      <video
        src="/preloadervideo.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onEnded={handleFinish} // End when video finishes naturally
      />

      {/* Optional: Skip indicator */}
      <div className="absolute bottom-8 right-8 text-white text-sm opacity-70 animate-pulse">
        Click anywhere to skip
      </div>
    </div>
  );
}
