import { useState, useEffect } from "react";
import ModalProvider from "@/provider/modal-provider";
import SessionProvider from "@/provider/session-provider";
import RootRoute from "@/root-route";
import IntroPage from "@/components/intro-page";

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    return hasSeenIntro !== "true";
  });

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
        localStorage.setItem("hasSeenIntro", "true");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <SessionProvider showIntro={showIntro}>
      <ModalProvider>
        {showIntro ? <IntroPage /> : <RootRoute />}
      </ModalProvider>
    </SessionProvider>
  );
}
