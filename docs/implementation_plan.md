# User Business Endpoints Feature

Implement full CRUD UI for the Business resource in the admin panel, mirroring the existing Article pattern from the OpenAPI spec (`/user/businesses`).

## OpenAPI Summary

The business endpoints include:
- **GET `/user/businesses`** — List businesses with pagination, search, `is_active` filter
- **POST `/user/businesses`** — Create business (multipart: title, slug, description, price, image, whatsapp, is_active)
- **GET `/user/businesses/{id}`** — Get business detail
- **PUT `/user/businesses/{id}`** — Update business (multipart, image optional)
- **DELETE `/user/businesses/{id}`** — Delete business

## Proposed Changes

### Service Layer
#### [NEW] [businessService.js](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/services/businessService.js)
- CRUD functions: `getBusinesses`, `getBusiness`, `createBusiness`, `updateBusiness`, `deleteBusiness`
- Follows the same `buildFormData`, `filterNullParams`, `handleApiError` pattern from `articleService.js`

---

### Hook Layer
#### [NEW] [useBusiness.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/hooks/modules/useBusiness.jsx)
- `useGetBusinesses`, `useGetBusiness`, `useCreateBusiness`, `useEditBusiness`, `useDeleteBusiness`
- Same pattern as `useArticle.jsx`

---

### Page Hooks
#### [NEW] `src/pages/business/hooks/useIndex.jsx`
#### [NEW] `src/pages/business/hooks/useCreate.jsx`
#### [NEW] `src/pages/business/hooks/useEdit.jsx`
#### [NEW] `src/pages/business/hooks/useShow.jsx`
#### [NEW] `src/pages/business/hooks/useDelete.jsx`

---

### Page Components
#### [NEW] `src/pages/business/components/BusinessTable.jsx`
#### [NEW] `src/pages/business/components/BusinessTableRow.jsx`
#### [NEW] `src/pages/business/components/BusinessForm.jsx`
- Fields: title, slug, description (textarea), price (number), whatsapp, is_active (select)

---

### Pages
#### [MODIFY] [Index.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/pages/business/Index.jsx) — Replace placeholder with full list page
#### [NEW] `src/pages/business/Create.jsx`
#### [NEW] `src/pages/business/Edit.jsx`
#### [NEW] `src/pages/business/Show.jsx`

---

### Routing & Shared Components
#### [MODIFY] [Index.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/routes/Index.jsx) — Add business CRUD routes
#### [MODIFY] [ShowPageHeader.jsx](file:///c:/Penyimpanan%20Utama/Code/React/hmj-ti-admin-panel/src/components/ShowPageHeader.jsx) — Generalize `articleId` → `itemId` + `editPath` props so it works for both articles and businesses

## User Review Required

> [!IMPORTANT]
> The `ShowPageHeader` component currently hardcodes `articleId` and the edit link path to `/articles/${articleId}/edit`. I'll generalize it to accept `itemId` and `editPath` props, keeping backward compatibility with the `articleId` prop.

## Verification Plan

### Manual Verification
- Run the dev server and navigate to `/businesses` to verify list, create, show, edit, and delete pages render correctly.
