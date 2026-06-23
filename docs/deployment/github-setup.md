# GitHub setup (one-time)

Create the backend repository on GitHub and push:

```bash
# 1. Create repo on GitHub: undash-cop/hiring-journey-backend (empty, no README)

# 2. Push from local clone
cd hiring-journey-backend
git push -u origin main

# 3. Update frontend submodule pointer (from hiring-journey-website)
cd ../hiring-journey-website
git add backend .gitmodules
git commit -m "Link backend submodule to hiring-journey-backend"
git push
```

After the backend repo exists, clones use:

```bash
git clone --recurse-submodules https://github.com/undash-cop/hiring-journey-website.git
```

## Archive old Vite repo

The legacy `undash-cop/hiring-journey-app` repository can be archived on GitHub (Settings → Archive). It is no longer used.
