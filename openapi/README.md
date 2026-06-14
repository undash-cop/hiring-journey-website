# OpenAPI Artifacts

`hiring-journey-api.openapi.json` is the backend API contract exported from the FastAPI service.

## Refresh flow

```bash
npm run api:spec:download
npm run api:client:generate
```

Or run both:

```bash
npm run api:sync
```
