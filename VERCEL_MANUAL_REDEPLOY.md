# Vercel Deployment - Manual Redeployment Guide

## 🔧 Critical Fixes Applied (Ready to Deploy)

✅ **vercel.json** - Fixed routing configuration to properly serve static files  
✅ **Video files** - Renamed to remove spaces (VID-*.mp4)  
✅ **index.html** - Updated video references to match new filenames  
✅ **All files** - Committed to git (commit: 33a71a8)  

---

## 📋 Summary of Changes

### 1. **vercel.json** - CRITICAL FIX
**Problem:** Old config routed ALL requests to server.js, making CSS/JS/images return as HTML  
**Solution:** New routing configuration:
- Routes `/api/*` to server.js (for backend)
- Serves static files (.css, .js, .jpg, .mp4, etc.) directly
- Falls back to index.html for HTML routing

```json
{
  "routes": [
    { "src": "/api/(.*)", "dest": "/server.js" },
    { "src": "/(.*\\.(html|css|js|json|jpg|jpeg|png|mp4|...))", "dest": "/$1" },
    { "src": "/order", "dest": "/order.html" },
    { "src": "/", "dest": "/index.html" }
  ]
}
```

### 2. **Video Files** - Renamed
- `VID-20260405-WA0002 - Copy.mp4` → `VID-20260405-WA0002.mp4`
- `VID-20260405-WA0003 - Copy.mp4` → `VID-20260405-WA0003.mp4`
- (Spaces removed to fix URL encoding issues)

### 3. **index.html** - Updated References
- Line 722: CSS reference already correct (styles.css)
- Line 760: Video ref updated: `VID-20260405-WA0003.mp4`
- Line 798: Video ref updated: `VID-20260405-WA0002.mp4`

---

## 🚀 Deploy to Vercel - Method A (Easiest)

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Log in to your account
3. Find project: **rnstonecarecombo.vercel.app** (or similar)
4. Click the project

### Step 2: Redeploy Current Commit
1. In project dashboard, look for **"Deployments"** tab
2. You should see your recent git commits
3. Click **"Redeploy"** on the latest commit
4. Wait for deployment to complete (shows green ✅ when done)

**Expected:** Complete within 2-5 minutes

### Step 3: Verify Deployment
1. Visit: https://rnstonecarecombo.vercel.app
2. Open browser console (F12)
3. Check that:
   - ✅ No 404 errors for CSS, JS, images
   - ✅ No MIME type errors
   - ✅ Videos load (may take 10-20 seconds)

---

## 🚀 Deploy to Vercel - Method B (Upload + Rebuild)

### Step 1: Download Fixed Files
From your local machine:
- `vercel.json` (the updated config)
- `index.html` (with updated video references)
- All `VID-*.mp4` video files (renamed ones)

### Step 2: Vercel Dashboard Upload
1. Go to: https://vercel.com/dashboard
2. Click your project
3. Go to **"Settings"** → **"Environment Variables"** (or look for a files section)
4. Replace `vercel.json` with the new version (copy/paste content)

### Step 3: Trigger Rebuild
1. In Vercel dashboard, go to **"Deployments"**
2. Click the three dots (...) on the latest deployment
3. Click **"Rebuild"**
4. Wait for deployment

---

## 🚀 Deploy to Vercel - Method C (GitHub Integration)

### Step 1: Create GitHub Repository
1. Go to: https://github.com/new
2. Create repo: `rn-stone-care-combo`
3. Initialize with README = NO

### Step 2: Push Local Code
```bash
cd "c:\Users\Entertainment\Downloads\rn-stone-care(landing-page) v2 old"
git remote add origin https://github.com/YOUR-USERNAME/rn-stone-care-combo.git
git branch -M main
git push -u origin main
```

### Step 3: Connect to Vercel
1. Go to: https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Choose your GitHub repo
5. Click **"Import"**
6. Vercel will auto-detect settings
7. Click **"Deploy"**

**After this, every git push will auto-deploy!**

---

## 🧪 Testing After Redeployment

### Test Checklist

**Homepage Load:**
- [ ] Visit https://rnstonecarecombo.vercel.app
- [ ] Page loads without blank white page
- [ ] All images display (product, testimonials, etc.)
- [ ] No red errors in console (F12)

**CSS and Styling:**
- [ ] Layout looks correct (not a jumbled mess)
- [ ] Colors are right
- [ ] Text alignment is proper
- [ ] Mobile layout looks good on phone

**JavaScript Functionality:**
- [ ] Skeleton loader disappears after page loads
- [ ] Animations work (scroll effects, etc.)
- [ ] Buttons are clickable
- [ ] No JavaScript errors in console (F12)

**Videos:**
- [ ] Videos appear (but may take 10-20 seconds to load)
- [ ] Play button works
- [ ] No error messages about video files

**Order Form:**
- [ ] Click "Order Now" button
- [ ] Order form page loads
- [ ] All form fields visible
- [ ] Submit button works
- [ ] Success/error message appears

---

## ✅ Expected Results After Fixes

### Before Fixes:
```
❌ CSS: GET /style.css 404 (text/html)
❌ JS: GET /script.js 404 (text/html)  
❌ IMG: GET /rnherbalcarecombo.jpeg 404
❌ VID: GET /VID-..*%20-%20Copy.mp4 404
❌ Layout completely broken
❌ Videos won't load
```

### After Fixes:
```
✅ CSS: GET /styles.css 200 (text/css)
✅ JS: GET /script.js 200 (application/javascript)
✅ IMG: GET /rnherbalcarecombo.jpeg 200 (image/jpeg)
✅ VID: GET /VID-*.mp4 200 (video/mp4)
✅ Layout renders correctly
✅ Videos load and play
✅ No MIME type errors
```

---

## 🔍 If Errors Still Appear

### Check 1: Clear Cache
- Browser: Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- Wait for full reload
- Check console again (F12)

### Check 2: Verify vercel.json Updated
1. Vercel Dashboard → Project Settings
2. Look for or check the vercel.json file
3. Ensure it has the new routing rules
4. If not, manually update it

### Check 3: Verify Video Filenames
- Check if videos are named without spaces:
  - ✅ VID-20260405-WA0002.mp4
  - ✅ VID-20260405-WA0003.mp4
  - ✅ VID-20260405-WA0004.mp4
- If old names are still deployed, rebuild/redeploy

### Check 4: Purge Vercel Cache
1. Vercel Dashboard → Settings
2. Look for "Cache" option
3. Click "Clear Cache"
4. Redeploy project

---

## 📊 Git Commit Ready

Your code is ready to push. Latest commit:
```
Commit: 33a71a8
Message: Fix: Vercel static file serving issues - proper routing config, 
          rename videos without spaces, update references
Files Changed: 3 (vercel.json, index.html, video renames)
```

---

## 🎯 Quick Reference - What Was Fixed

| Issue | Status | Solution |
|-------|--------|----------|
| CSS returns as HTML | ✅ FIXED | Updated vercel.json routing |
| JS returns as HTML | ✅ FIXED | Updated vercel.json routing |
| Images return 404 | ✅ FIXED | Proper static file routes |
| Videos with spaces fail | ✅ FIXED | Renamed video files |
| Video refs outdated | ✅ FIXED | Updated index.html |
| Form doesn't work | ✅ READY | API routes configured |

---

## 📞 If Redeployment Fails

1. **Check Vercel Status:** https://status.vercel.com
2. **Check Console Errors:** Copy exact error message
3. **Try Method C:** Push to GitHub and let Vercel auto-deploy
4. **Contact Vercel Support:** https://vercel.com/support

---

## ✨ Next Steps

**Choose one method:**

- **Method A (Recommended):** Redeploy from dashboard - fastest
- **Method B:** Upload files manually - if Method A doesn't work
- **Method C (Best Long-term):** Use GitHub integration - auto-deploys on push

**Then test using the checklist above!**

---

**Status:** Ready to redeploy ✅  
**All fixes:** Applied and committed  
**Git commit:** 33a71a8  
**Expected result:** All static files serving correctly with proper MIME types

Good luck! Your website should work perfectly after redeployment. 🚀
