import { useState, useEffect } from "react";
import ModalProvider from "@/provider/modal-provider";
import SessionProvider from "@/provider/session-provider";
import RootRoute from "@/root-route";
import IntroPage from "@/components/intro-page";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SessionProvider showIntro={showIntro}>
      <ModalProvider>
        {showIntro ? <IntroPage /> : <RootRoute />}
      </ModalProvider>
    </SessionProvider>
  );
}
