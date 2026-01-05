import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/auth/use-sign-in-with-password";
import { useState } from "react";
import { Link } from "react-router";
import { useSignInWithOAuth } from "@/hooks/mutations/auth/use-sign-in-with-oauth";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";
import { GitHubIcon, KakaoIcon } from "@/components/social/social-icons";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });

        setPassword("");
      },
    });
  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth({
      onError: (error) => {
        const messsage = generateErrorMessage(error);
        toast.error(messsage, {
          position: "top-center",
        });
      },
    });

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignInWithPasswordClick();
  };

  const handleSignInWithGitHubClick = () => {
    signInWithOAuth("github");
  };

  const handleSignInWithKakaoClick = () => {
    signInWithOAuth("kakao");
  };

  const handleGuestLogin = () => {
    signInWithPassword({
      email: "test@test.com",
      password: "test1234",
    });
  };
  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

  return (
    <div className="mx-auto my-auto flex w-full max-w-md flex-col gap-8 pt-6">
      <div className="sr-only text-xl font-bold">로그인</div>
      <img
        src="/logo.png"
        className="mx-auto w-70"
        alt="아스키코드로 표현한 스파게티 모습"
      />
      <div className="mx-auto text-lg font-bold">엮이고, 이어지는 공간</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <Input
            disabled={isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-6"
            type="email"
            placeholder="example@spaghetti.com"
          />
          <Input
            disabled={isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-6"
            type="password"
            placeholder="password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            disabled={isPending}
            onClick={handleSubmit}
            className="w-full py-6"
          >
            로그인
          </Button>
          <Button
            disabled={isPending}
            onClick={handleGuestLogin}
            variant="outline"
            className="w-full py-6"
          >
            게스트로 접속
          </Button>
        </div>
      </form>
      <div className="flex justify-center gap-2">
        <Link
          className="text-muted-foreground underline hover:underline"
          to={"/sign-up"}
        >
          회원가입
        </Link>
        <div className="text-muted-foreground"> | </div>
        <Link
          className="text-muted-foreground underline hover:underline"
          to={"/forget-password"}
        >
          비밀번호 찾기
        </Link>
      </div>

      {/* 소셜 로그인 */}
      <div className="flex flex-col gap-4">
        <div className="text-muted-foreground text-md relative text-center">
          <span className="bg-background relative z-10 px-4">간편 로그인</span>
          <div className="bg-border absolute top-1/2 right-0 left-0 h-px -translate-y-1/2"></div>
        </div>

        <div className="flex justify-center gap-4">
          {/* GitHub 로그인 */}
          <button
            disabled={isPending}
            className="flex h-13 w-13 cursor-pointer items-center justify-center rounded-xl bg-[#24292e] text-white transition-colors hover:bg-[#24292e]/80 disabled:opacity-50"
            onClick={handleSignInWithGitHubClick}
          >
            <GitHubIcon className="h-6 w-6" />
          </button>

          {/* Kakao 로그인 */}
          <button
            disabled={isPending}
            className="flex h-13 w-13 cursor-pointer items-center justify-center rounded-xl bg-[#FEE500] text-[#191919] transition-colors hover:bg-[#FEE500]/80 disabled:opacity-50"
            onClick={handleSignInWithKakaoClick}
          >
            <KakaoIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
