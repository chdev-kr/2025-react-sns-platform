import { Navigate, Route, Routes } from "react-router";
import ResetPasswordPage from "./pages/reset-password-page";
import ProfileDetailPage from "./pages/profile-detail-page";
import PostDetailPage from "./pages/post-detail-page";
import ForgetPasswordPage from "./pages/forget-password-page";
import IndexPage from "./pages/index-page";
import SingUpPage from "./pages/sign-up-page";
import SignInPage from "./pages/sign-in-page";
import GlobalLayout from "./components/layout/global-layout";
import GuestOnlyLayout from "./components/layout/guest-only-layout";
import MemberOnlyLayout from "./components/layout/member-only-layout";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route element={<GuestOnlyLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SingUpPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
        </Route>

        <Route element={<MemberOnlyLayout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/post/:postId" element={<PostDetailPage />} />
          <Route path="/profile/:userId" element={<ProfileDetailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}
