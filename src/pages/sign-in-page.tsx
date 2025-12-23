import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-with-password";
import { useSignInWithOAuth } from "@/hooks/mutations/use-sign-in-with-oauth";
import { Link } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword } = useSignInWithPassword();
  const { mutate: signInWithOAuth } = useSignInWithOAuth();

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  };

  const handleSignInWithOAuthClick = () => {
    signInWithOAuth("github");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          className="py-6"
          type="email"
          placeholder="example@spaghetti.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="py-6"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={handleSignInWithPasswordClick} className="w-full">
          로그인
        </Button>
        <Button
          onClick={handleSignInWithOAuthClick}
          className="w-full"
          variant={"outline"}
        >
          <img src={gitHubLogo} className="h-4 w-4" alt="" />
          GitHub 계정으로 로그인
        </Button>
      </div>
      <div className="text-center text-sm">
        <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
          계정이 없다면?
        </Link>
      </div>
    </div>
  );
}
