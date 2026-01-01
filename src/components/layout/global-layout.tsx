import { Link, Outlet } from "react-router";
import img from "@/assets/logo.png";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { SunIcon } from "lucide-react";
import ProfileButton from "./header/profile-button";
import ThemeButton from "./header/theme-button";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full max-w-175 justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="h-6"
              src={img}
              alt="스파게티 로고, 포크로 스파게티를 뜬 모양"
            />
            <div className="font-bold">스파게티</div>
          </Link>
          <div className="flex items-center gap-5">
            <ThemeButton />
            <ProfileButton />
          </div>
        </div>
      </header>
      <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center">
        @Chaehyeon
      </footer>
    </div>
  );
}
