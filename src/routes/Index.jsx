import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/Index";
import { ArticlePage } from "../pages/article/Index";
import { CreateArticlePage } from "../pages/article/Create";
import { BusinessPage } from "../pages/business/Index";
import { CreateBusinessPage } from "../pages/business/Create";
import EditBusinessPage from "../pages/business/Edit";
import ShowBusinessPage from "../pages/business/Show";
import { PositionPage } from "../pages/position/Index";
import { CreatePositionPage } from "../pages/position/Create";
import EditPositionPage from "../pages/position/Edit";
import ShowPositionPage from "../pages/position/Show";
import { MemberPage } from "../pages/member/Index";
import { CreateMemberPage } from "../pages/member/Create";
import EditMemberPage from "../pages/member/Edit";
import ShowMemberPage from "../pages/member/Show";
import { ComplaintPage } from "../pages/complaint/Index";
import ShowComplaintPage from "../pages/complaint/Show";
import BaseLayout from "../components/base_layout/BaseLayout";
import EditArticlePage from "../pages/article/Edit";
import ShowArticlePage from "../pages/article/Show";
import LoginPage from "../pages/login/Index";
import NotFoundPage from "../pages/errors/NotFound";
import AuthMiddleware from "../components/middleware/AuthMiddleware";
import GuestMiddleware from "../components/middleware/GuestMiddleware";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Guest-only routes */}
      <Route element={<GuestMiddleware />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Authenticated routes */}
      <Route element={<AuthMiddleware />}>
        <Route path="" element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlePage />} />
          <Route path="/articles/:id" element={<ShowArticlePage />} />
          <Route path="/articles/create" element={<CreateArticlePage />} />
          <Route path="/articles/:id/edit" element={<EditArticlePage />} />
          <Route path="/businesses" element={<BusinessPage />} />
          <Route path="/businesses/:id" element={<ShowBusinessPage />} />
          <Route path="/businesses/create" element={<CreateBusinessPage />} />
          <Route path="/businesses/:id/edit" element={<EditBusinessPage />} />
          <Route path="/positions" element={<PositionPage />} />
          <Route path="/positions/:id" element={<ShowPositionPage />} />
          <Route path="/positions/create" element={<CreatePositionPage />} />
          <Route path="/positions/:id/edit" element={<EditPositionPage />} />
          <Route path="/members" element={<MemberPage />} />
          <Route path="/members/:id" element={<ShowMemberPage />} />
          <Route path="/members/create" element={<CreateMemberPage />} />
          <Route path="/members/:id/edit" element={<EditMemberPage />} />
          <Route path="/complaints" element={<ComplaintPage />} />
          <Route path="/complaints/:id" element={<ShowComplaintPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
