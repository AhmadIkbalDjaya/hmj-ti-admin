# Walkthrough: Business CRUD Endpoints

## Summary
Implemented full CRUD UI for the **Business** resource in the admin panel, following the established Article pattern. **15 files** were created or modified.

## Changes Made

### Service Layer
- [businessService.js](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/services/businessService.js) — `getBusinesses`, `getBusiness`, `createBusiness`, `updateBusiness`, `deleteBusiness` with multipart form-data handling

### Hook Layer
- [useBusiness.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/hooks/modules/useBusiness.jsx) — `useGetBusinesses`, `useGetBusiness`, `useCreateBusiness`, `useEditBusiness`, `useDeleteBusiness` with snackbar notifications

### Page Hooks (5 files)
| File | Purpose |
|------|---------|
| [useIndex.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/hooks/useIndex.jsx) | List page state (pagination, search, delete) |
| [useCreate.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/hooks/useCreate.jsx) | Create form state + submit |
| [useEdit.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/hooks/useEdit.jsx) | Fetch existing data + edit form |
| [useShow.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/hooks/useShow.jsx) | Detail view state + delete |
| [useDelete.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/hooks/useDelete.jsx) | Delete confirmation modal state |

### Page Components (3 files)
| File | Purpose |
|------|---------|
| [BusinessTable.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/components/BusinessTable.jsx) | Table with columns: No, Nama Usaha, Harga, Status, Aksi |
| [BusinessTableRow.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/components/BusinessTableRow.jsx) | Row with IDR price formatting + action icons |
| [BusinessForm.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/components/BusinessForm.jsx) | Form: title, slug, description (textarea), price, whatsapp, is_active |

### Pages (4 files)
| File | Purpose |
|------|---------|
| [Index.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/Index.jsx) | List page (replaced placeholder) |
| [Create.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/Create.jsx) | Create with form + image upload |
| [Edit.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/Edit.jsx) | Edit with pre-populated form |
| [Show.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/Show.jsx) | Detail view with all fields |

### Modified Shared Files

```diff:Index.jsx
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/Index";
import { ArticlePage } from "../pages/article/Index";
import { CreateArticlePage } from "../pages/article/Create";
import { BusinessPage } from "../pages/business/Index";
import { MemberPage } from "../pages/member/Index";
import { ComplaintPage } from "../pages/complaint/Index";
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
        <Route path="/members" element={<MemberPage />} />
        <Route path="/complaints" element={<ComplaintPage />} />
      </Route>
    </Routes>
  );
}
===
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
      </Route>
    </Routes>
  );
}
```

```diff:ShowPageHeader.jsx
import { Box, Button, Stack, Typography } from "@mui/material";
import { MdDelete, MdModeEdit } from "react-icons/md";

export default function ShowPageHeader({
  title,
  onDelete = null,
  articleId = null,
  loading = false,
}) {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      my={1}
      alignItems={"center"}
    >
      <Typography variant="h5" fontWeight={"600"}>
        {title}
      </Typography>
      {!loading && (
        <Stack direction={"row"} spacing={1}>
          {articleId && (
            <Button
              variant="contained"
              size="small"
              startIcon={<MdModeEdit />}
              sx={{
                textTransform: "none",
                display: {
                  xs: "none",
                  sm: "inherit",
                },
              }}
              href={`/articles/${articleId}/edit`}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="contained"
              startIcon={<MdDelete />}
              size="small"
              sx={{
                textTransform: "none",
                display: {
                  xs: "none",
                  sm: "inherit",
                },
              }}
              onClick={() => onDelete(articleId)}
            >
              Delete
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
}
===
import { Box, Button, Stack, Typography } from "@mui/material";
import { MdDelete, MdModeEdit } from "react-icons/md";

export default function ShowPageHeader({
  title,
  onDelete = null,
  articleId = null,
  itemId = null,
  editPath = null,
  loading = false,
}) {
  const resolvedId = itemId ?? articleId;
  const resolvedEditPath = editPath ?? (articleId ? `/articles/${articleId}/edit` : null);

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      my={1}
      alignItems={"center"}
    >
      <Typography variant="h5" fontWeight={"600"}>
        {title}
      </Typography>
      {!loading && (
        <Stack direction={"row"} spacing={1}>
          {resolvedEditPath && (
            <Button
              variant="contained"
              size="small"
              startIcon={<MdModeEdit />}
              sx={{
                textTransform: "none",
                display: {
                  xs: "none",
                  sm: "inherit",
                },
              }}
              href={resolvedEditPath}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="contained"
              startIcon={<MdDelete />}
              size="small"
              sx={{
                textTransform: "none",
                display: {
                  xs: "none",
                  sm: "inherit",
                },
              }}
              onClick={() => onDelete(resolvedId)}
            >
              Delete
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
}
```

## Key Design Decisions
- **`ShowPageHeader` generalized** — Added `itemId` and `editPath` props while keeping `articleId` backward-compatible via fallback
- **IDR price formatting** — Used `Intl.NumberFormat` with `id-ID` locale for consistent currency display
- **No rich text editor for description** — Business description uses a simple multiline `TextField` (3 rows) since the API accepts plain text, unlike article content

## Verification
- ✅ Vite production build passes (exit code 0)

## Routes Added
| Route | Page |
|-------|------|
| `/businesses` | List |
| `/businesses/create` | Create |
| `/businesses/:id` | Show |
| `/businesses/:id/edit` | Edit |
