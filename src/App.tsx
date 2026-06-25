import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { ResourcesPage } from "@/pages/ResourcesPage";
import { PhasePage } from "@/pages/PhasePage";
import { AdminPage } from "@/pages/AdminPage";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ContentProvider } from "@/lib/content-store";

export function App() {
  return (
    <ContentProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="discover" element={<PhasePage phaseId="discover" />} />
          <Route path="validate" element={<PhasePage phaseId="validate" />} />
          <Route path="build" element={<PhasePage phaseId="build" />} />
          <Route path="pre-launch" element={<PhasePage phaseId="pre-launch" />} />
          <Route path="launch" element={<PhasePage phaseId="launch" />} />
          <Route path="marketing-sales" element={<PhasePage phaseId="marketing-sales" />} />
        </Route>
        <Route path="admin" element={<AdminPage />} />
      </Routes>
    </ContentProvider>
  );
}
