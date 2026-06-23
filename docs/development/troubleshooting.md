# Troubleshooting Guide

## Error: Cannot read properties of undefined (reading '/_app')

This error typically occurs due to Next.js dev server cache issues. Follow these steps:

### Solution 1: Clear Cache and Restart
```bash
# Stop the dev server (Ctrl+C)
rm -rf .next
npm run dev
```

### Solution 2: Full Clean Install
```bash
# Stop the dev server
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Solution 3: Check for Port Conflicts
If port 3000 is already in use:
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use a different port
npm run dev -- -p 3001
```

### Common Causes:
1. **Hot reload issues** - Next.js sometimes has issues with hot reloading
2. **Corrupted cache** - The `.next` folder can become corrupted
3. **Port conflicts** - Another process might be using port 3000
4. **Node version mismatch** - Ensure you're using Node.js >= 22

### If Error Persists:
1. Check browser console for additional errors
2. Check terminal for full error stack trace
3. Verify all imports are correct
4. Ensure all client components have `"use client"` directive
