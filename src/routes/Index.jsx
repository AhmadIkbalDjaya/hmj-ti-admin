import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/Index";
import { ArticlePage } from "../pages/article/Index";
import { CreateArticlePage } from "../pages/article/Create";
import { BusinessPage } from "../pages/business/Index";
import { CreateBusinessPage } from "../pages/business/Create";
import EditBusinessPage from "../pages/business/Edit";
import ShowBusinessPage from "../pages/business/Show";
import { MemberPage } from "../pages/member/Index";
import { ComplaintPage } from "../pages/complaint/Index";
import ShowComplaintPage from "../pages/complaint/Show";
import BaseLayout from "../components/base_layout/BaseLayout";
import EditArticlePage from "../pages/article/Edit";
import ShowArticlePage from "../pages/article/Show";

export default function AppRoutes() {
  return (
    <Routes>
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
        <Route path="/members" element={<MemberPage />} />
        <Route path="/complaints" element={<ComplaintPage />} />
        <Route path="/complaints/:id" element={<ShowComplaintPage />} />
      </Route>
    </Routes>
  );
}
