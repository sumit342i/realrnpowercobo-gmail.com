# 🔧 Hostinger Deployment Troubleshooting Guide

## Quick Diagnostics

### Check 1: Can you access https://yourdomain.com?
- **YES** → Go to Check 2
- **NO** → DNS not propagated yet. Wait 24-48 hours or contact Hostinger support

### Check 2: Do you see a blank page or error?
- **Blank page** → Go to Check 3
- **Error 404** → Files not uploaded to public_html. Re-upload all files
- **Error 500** → PHP error. Check error logs and Check 5

### Check 3: Open Browser Console (F12 → Console)
- **No errors** → Website loaded successfully! Go to Check 4
- **CSS file 404** → styles.css missing or filename wrong. Upload styles.css
- **JS file 404** → script.js missing. Upload script.js
- **Image 404** → Image filename wrong or missing. Re-upload images
- **CORS error** → Hostinger CORS settings. Contact support

### Check 4: Test Form Submission
1. Click "Order Now" button
2. Fill form and click "Place Order"
3. Check result:
   - **Success message appears** → Form working! Check Check 5
   - **Error message** → Go to Check 6
   - **Page refreshes but no message** → JS not loading. Check console in F12

### Check 5: Check Email System
1. Look for 2 emails:
   - Admin confirmation email
   - Customer confirmation email

If emails not received:
- Check spam folder
- Go to Issue #3 "Emails Not Sending"

## Common Issues & Fixes

---

### Issue #1: "Forms Submitted But Emails Not Working"

**Symptoms:**
- Form submits successfully
- Success message appears
- No emails received

**Solutions (in order):**

1. **Check orders.log was created:**
   - File Manager → Navigate to public_html
   - Look for `orders.log` file
   - If exists → PHP is working, email is the problem
   - If missing → File permissions issue

2. **Update email configuration:**
   - Edit submit-order.php
   - Find: `$adminEmail = 'digital.work.3442@gmail.com';`
   - Change to your actual Hostinger email address
   - Example: `$adminEmail = 'info@yourdomain.com';`

3. **Verify Hostinger email was created:**
   - Hostinger → Email accounts
   - Create email: `info@yourdomain.com` (or similar)
   - Use that email in submit-order.php

4. **Test with simple form:**
   - Create test.php file:
   ```php
   <?php
   $to = 'your-email@gmail.com';
   $subject = 'Test Email from Hostinger';
   $message = 'If you received this, email is working!';
   $headers = "From: info@yourdomain.com";
   
   if(mail($to, $subject, $message, $headers)) {
       echo "Email sent successfully!";
   } else {
       echo "Email failed to send";
   }
   ?>
   ```
   - Visit `https://yourdomain.com/test.php`
   - This will tell you if email works at all

5. **Contact Hostinger Support:**
   - Go to Hostinger → Support
   - Ask: "PHP mail() function not sending emails"
   - They can check mail server logs

---

### Issue #2: "Images or Videos Show 404 / Don't Load"

**Symptoms:**
- Images display broken icon
- Videos don't play
- F12 Console shows 404 for image/video files

**Solutions:**

1. **Check file names match exactly:**
   - In browser Console (F12), note the 404 filename
   - Example: Returns `VID-20260405-WA0002 - Copy.mp4` (with space and dash)
   - Match EXACTLY when uploading
   - Linux servers are case-sensitive!

2. **Verify files uploaded to correct folder:**
   - All files should be in `public_html/`
   - NOT in subfolders (unless referenced correctly)
   - Example: `https://yourdomain.com/imagename.jpg` not `https://yourdomain.com/images/imagename.jpg`

3. **Re-upload missing files:**
   - File Manager → public_html
   - Upload again, paying attention to exact filenames
   - Don't rename files

4. **Check file permissions:**
   - Right-click image/video → Permissions
   - Set to: **644** (read/write for owner, read for others)
   - Click Change

5. **Clear browser cache:**
   - Hold Ctrl and press F5 (Ctrl+Shift+R on Chrome)
   - Or Settings → Clear browsing data → Cached images
   - Try again

6. **Try different browser:**
   - Safari, Firefox, or Edge
   - Some browsers cache more aggressively

---

### Issue #3: "Form Not Submitting / Errors Appear"

**Symptoms:**
- Click "Place Order" but nothing happens
- Error message appears
- Form refreshes but no success message

**Solutions:**

1. **Check browser console (F12):**
   - Look for red error messages
   - Common errors:
     - `"submit-order.php not found"` → upload submit-order.php
     - `"CORS error"` → Hostinger might block requests
     - `"JSON parse error"` → PHP not responding correctly

2. **Verify submit-order.php exists:**
   - File Manager → public_html
   - Look for `submit-order.php`
   - If missing, upload it

3. **Check file permissions:**
   - Right-click `submit-order.php` → Permissions
   - Set to **644** or **755**
   - Click Change

4. **Test PHP manually:**
   - Create test2.php:
   ```php
   <?php
   echo "PHP is working!";
   ?>
   ```
   - Visit `https://yourdomain.com/test2.php`
   - Should see "PHP is working!"
   - If not, PHP is disabled. Contact Hostinger support

5. **Check firewalls/security:**
   - Hostinger might block form submissions
   - Check Security settings in Hostinger
   - Try with simple test data (no special characters)

---

### Issue #4: "Styles Don't Load / Website Looks Broken"

**Symptoms:**
- Layout is messed up
- Text is unstyled
- Colors wrong
- Alignment broken

**Solutions:**

1. **Clear browser cache:**
   - Press Ctrl+Shift+R (or Cmd+Shift+R on Mac)
   - All files will reload fresh

2. **Check CSS file exists:**
   - File Manager → public_html
   - Look for `styles.css`
   - If missing, upload it

3. **Verify CSS referenced correctly:**
   - Open index.html in editor
   - Look for: `<link rel="stylesheet" href="styles.css">`
   - Should be exactly: `styles.css` (not style.css or styles/style.css)
   - Save and re-upload if wrong

4. **Check file permissions:**
   - Right-click `styles.css` → Permissions
   - Set to **644**
   - Click Change

5. **Check for filename typos:**
   - Windows:  filenames are not case-sensitive
   - Linux (Hostinger): filenames ARE case-sensitive
   - `styles.css` ≠ `Styles.css` ≠ `STYLES.CSS`
   - Make sure case matches exactly

6. **Test CSS loading:**
   - F12 → Network tab
   - Refresh page
   - Look for styles.css in the list
   - If status is 200 → CSS loaded
   - If status is 404 → CSS not being served

---

### Issue #5: "JavaScript Errors in Console"

**Symptoms:**
- Red errors in F12 Console
- Features don't work (skeleton loader, videos, etc.)
- Form validation doesn't work

**Solutions:**

1. **Check script.js exists:**
   - File Manager → public_html
   - Look for `script.js`
   - Upload if missing

2. **Check permissions:**
   - Right-click `script.js` → Permissions
   - Set to **644**

3. **Clear cache and reload:**
   - Ctrl+Shift+R
   - Reload page

4. **Check for script tags in HTML:**
   - Open order.html
   - Look for: `<script src="script.js"></script>`
   - Should be near bottom of file
   - Re-upload if missing

5. **Test JS manually:**
   - Open F12 Console
   - Type: `console.log('test')`
   - Press Enter
   - If you see "test" in console → JS engine works

---

### Issue #6: "Website Works on Desktop But Broken on Mobile"

**Symptoms:**
- Layout looks good on computer
- Layout broken on phone/tablet
- Text too small or too large
- Elements overlap

**Solutions:**

1. **Check viewport meta tag:**
   - Open index.html
   - Look for: `<meta name="viewport" content="width=device-width, initial-scale=1">`
   - If missing, add before closing `</head>` tag

2. **Test on actual phone:**
   - Don't rely on desktop browser's mobile view
   - Use real phone to test
   - Note specific screen size for testing

3. **Check media queries:**
   - styles.css has breakpoints at:
     - 480px (phones)
     - 768px (tablets)
     - 1920px (large screens)
   - These should handle mobile view

4. **Clear phone browser cache:**
   - Phone Settings → App manager → Browser → Clear cache
   - Or: Use private/incognito mode
   - Try accessing website again

5. **Check image sizes:**
   - Mobile might load large images slowly
   - Wait 10+ seconds for page to fully load
   - Check if images eventually appear

---

### Issue #7: "Getting 'Error 500' or 'Internal Server Error'"

**Symptoms:**
- Blank page or error message
- Server error 500
- Cannot access website at all

**Solutions:**

1. **Check error logs:**
   - File Manager → Right-click public_html
   - Click "Error Logs" or "View Logs"
   - Read the actual error message
   - Note the error for Hostinger support

2. **Check submit-order.php syntax:**
   - Open submit-order.php in editor
   - Look for syntax errors (missing semicolons, etc.)
   - If no errors visible, re-upload fresh copy

3. **Check PHP version:**
   - Hostinger Settings → PHP version
   - Should be PHP 7.4+ or PHP 8.0+
   - If very old (5.6), ask Hostinger to upgrade

4. **Disable problematic features:**
   - Temporarily remove/comment out PHP mail() function
   - Replace with simple echo test
   - See if error goes away

5. **Contact Hostinger support:**
   - Provide error message from logs
   - Ask them to check server PHP error logs
   - Usually resolved in 24 hours

---

### Issue #8: "Domain Not Working / DNS Issues"

**Symptoms:**
- Website address not reachable
- "Cannot find server"
- "ERR_DOMIAN_NOT_FOUND"

**Solutions:**

1. **Wait for DNS propagation:**
   - DNS changes take 24-48 hours globally
   - Check status at: https://www.whatsmydns.net/
   - Enter your domain
   - Wait until all green checks appear

2. **Verify domain in Hostinger:**
   - Hostinger dashboard
   - Go to Domains
   - Check domain is listed and active
   - If not, add it

3. **Check nameserver setup:**
   - If domain not registered with Hostinger:
     - Get Hostinger nameservers (usually in email)
     - Update nameservers at your registrar
     - Wait 24-48 hours

4. **Test nameservers:**
   - Go to: https://www.nslookup.io/
   - Enter your domain
   - Should show Hostinger's nameservers

5. **Reset DNS cache:**
   - Windows: Open Command Prompt and type: `ipconfig /flushdns`
   - Mac: Open Terminal and type: `sudo dscacheutil -flushcache`
   - Then try accessing domain again

---

## Emergency Quick Fixes

### If Website is Completely Broken:

**Step 1:** Download all files from Hostinger as backup
**Step 2:** Delete all files from public_html
**Step 3:** Re-upload ONLY these essential files:
- index.html
- styles.css  
- script.js
- submit-order.php
- rnherbalcarecombo.jpeg (main product image)
- rnherbal-logo.png

**Step 4:** Test in browser
**Step 5:** If working, upload remaining files gradually

---

## Getting Help

**Hostinger Support:** https://support.hostinger.com
**Response time:** Usually 24-48 hours

**Provide Hostinger support with:**
1. Domain name
2. Exact error message or symptoms
3. Screenshot if possible
4. Steps you've already tried

---

## Prevention Tips

✅ Always backup files before making changes
✅ Test locally before deploying
✅ Keep file names consistent (no spaces, use dashes instead)
✅ Document any custom configurations
✅ Monitor error logs weekly
✅ Test after every update

---

**Still stuck?** Check the main [HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md) for detailed instructions.
