# Secure Print Link

Secure Print Link is a React + Vercel Serverless application for secure document submission and controlled print release, backed by Appwrite Database and Storage.

## Tech Stack

- Frontend: React (CRA), React Router, Axios, Clerk
- Backend: Vercel Serverless Functions (`/api`)
- Storage/DB: Appwrite (`node-appwrite`)
- File handling: Multer + encrypted file payload flow

## Project Structure

```text
Secure-Print-Link-1/
├─ api/
│  ├─ appwrite.js
│  ├─ health.js
│  ├─ jobs.js
│  ├─ printers.js
│  ├─ release.js
│  ├─ upload.js
│  └─ package.json
├─ src/
├─ public/
├─ vercel.json
└─ package.json
```

## Prerequisites

- Node.js `>=16`
- npm `>=8`
- Appwrite project with:
  - Database
  - Jobs collection
  - Storage bucket
- Vercel project connected to this repository

## Environment Variables

Set these in Vercel (`Project -> Settings -> Environment Variables`) and local `.env.local` as needed:

- `APPWRITE_ENDPOINT`
- `APPWRITE_PROJECT_ID`
- `APPWRITE_API_KEY`
- `APPWRITE_DATABASE_ID`
- `APPWRITE_COLLECTION_ID`
- `APPWRITE_BUCKET_ID`
- `APPWRITE_USERS_COLLECTION_ID` (optional, default: `users`)
- `APPWRITE_PRINTERS_COLLECTION_ID` (optional, default: `printers`)
- `APPWRITE_FILES_COLLECTION_ID` (optional, default: `encrypted_files`)
- `PUBLIC_BASE_URL` (recommended in production, e.g. `https://your-domain.vercel.app`)
- `ENCRYPTION_KEY` (strong secret used for encryption key derivation)

## Install and Run

```bash
npm install
npm start
```

Build:

```bash
npm run build
```

## API Routes

Rewrites are configured in `vercel.json`.

- `GET /api/health`
  - Health check

- `GET /api/jobs`
  - List jobs

- `POST /api/jobs`
  - Create a print job (multipart with file)

- `GET /api/jobs/:id`
  - Fetch job details by ID + token

- `GET /api/jobs/:id/content`
  - Fetch decrypted document content by ID + token

- `POST /api/jobs/:id/view`
  - Mark/validate view behavior

- `POST /api/jobs/:id/release`
  - Release print job

- `GET /api/printers`
  - List printers

- `POST /api/release?id=<jobId>`
  - Release endpoint (job + token validation)

- `POST /api/upload`
  - Upload endpoint (if used by UI flow)

## Security Notes

- Tokens should be random and unguessable.
- Appwrite API key must stay server-side only (never expose in frontend).
- Files should be fetched through backend validation only.
- Use a strong `ENCRYPTION_KEY` in production.

## Deployment (Vercel)

1. Push code to your Git provider.
2. Import project in Vercel.
3. Add all required environment variables.
4. Redeploy.
5. Verify:
   - `/api/health`
   - submit job flow
   - release flow
   - `/api/jobs/:id/content?token=...`

## Troubleshooting

- `ERR_REQUIRE_ESM`:
  - Ensure API modules use ESM imports/exports.
  - Keep `api/package.json` with:
    ```json
    { "type": "module" }
    ```

- `Cannot find module ../server/src/...` on Vercel:
  - Import shared Appwrite helpers from `api/appwrite.js` only.

- Link box empty after submit:
  - Ensure `POST /api/jobs` response includes `job.releaseLink`.
  - Ensure `PUBLIC_BASE_URL` is set correctly.

- Upload fails for non-PDF:
  - Check Appwrite bucket extension/MIME restrictions.

- API returns 500 in production:
  - Recheck Vercel environment variables and Appwrite permissions.

## License

Private internal project.

