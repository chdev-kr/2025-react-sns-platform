import GlobalLoader from "@/components/global-loader";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import supabase from "@/lib/supabase";
import { useIsSessionLoaded, useSession, useSetSession } from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({
  children,
  showIntro = false
}: {
  children: ReactNode;
  showIntro?: boolean;
}) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  const {
    data: profile,
    isLoading: isProfileLoading,
    isPending,
  } = useProfileData(session?.user.id);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  // 인트로 표시 중에는 GlobalLoader를 표시하지 않음
  if (showIntro) return children;

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfileLoading) return <GlobalLoader />;

  return children;
}
