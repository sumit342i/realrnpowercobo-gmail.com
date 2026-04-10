# 🚀 Hostinger Deployment Guide - RN Herbal Stone-Go Website

## ✅ Pre-Deployment Checklist

- ✅ All HTML files (index.html, order.html)
- ✅ Stylesheet (styles.css)
- ✅ JavaScript (script.js)
- ✅ PHP form handler (submit-order.php)
- ✅ All images (.jpeg, .png, .webp)
- ✅ All videos (.mp4)

## 📋 Files to Upload to Hostinger

```
public_html/
├── index.html                    (Main website homepage)
├── order.html                    (Order form page)
├── styles.css                    (Main stylesheet)
├── script.js                     (JavaScript functionality)
├── submit-order.php              (Form handler - processes orders)
├── orders.log                    (Auto-created - order logs)
├── rnherbalcarecombo.jpeg        (Product combo image)
├── rnherbal-logo.png             (Logo image)
├── VID-20260405-WA0002 - Copy.mp4 (Video testimonial 1)
├── VID-20260405-WA0003 - Copy.mp4 (Video testimonial 2)
├── VID-20260405-WA0004.mp4       (Video testimonial 3)
└── [All other images]            (Symptom  cards, before-after, etc.)
```

## 🔑 Step-by-Step Deployment

### Step 1: Access Hostinger Control Panel

1. Go to https://hpanel.hostinger.com
2. Log in to your Hostinger account
3. Select your domain from the list
4. Click "Manage"

### Step 2: Access File Manager

1. In the dashboard, find **"Website"** section
2. Click **"File Manager"** (or **"Files"**)
3. You'll see your **public_html** folder
4. Open the **public_html** folder

### Step 3: Upload Website Files

#### Method A: Direct Upload (Easiest)

1. Click **"Upload"** button in File Manager
2. Select all files from your project folder:
   - index.html
   - order.html
   - styles.css
   - script.js
   - submit-order.php
   - All image files
   - All video files
3. Click **"Open"** to upload everything
4. Wait for files to upload (may take 5-10 minutes for videos)

#### Method B: ZIP Upload

1. On your computer:
   - Create a folder named `website-backup`
   - Copy all project files into it
   - Right-click → **Send to** → **Compressed (zipped) folder**
   - Rename to `rn-herbal.zip`

2. In Hostinger File Manager:
   - Click **"Upload"**
   - Select `rn-herbal.zip`
   - Wait for upload
   - Right-click on `rn-herbal.zip` → **Extract**
   - Delete the .zip file after extraction

### Step 4: Verify File Permissions

1. In File Manager, select **submit-order.php**
2. Right-click → **Permissions**
3. Set to: **644** (or **rw-r--r--**)
4. Click **"Change"**

### Step 5: Configure Email Settings

For order emails to work on Hostinger:

1. Email will be sent via Hostinger's server
2. Edit **submit-order.php**:
   - Find: `$adminEmail = 'digital.work.3442@gmail.com';`
   - Change to your Hostinger email or contact email
   - Keep recipient as customer email from form

### Step 6: Test Your Website

1. Go to your domain: **https://yourdomain.com**
   - You should see the homepage with all images/videos loaded
   - No console errors or 404s

2. Test the order form:
   - Click **"Order Now"** button
   - Fill the form with test data
   - Click **"Place Order"**
   - You should see a success message
   - Check your email for order confirmation

## ✅ Verification Checklist

After deployment, verify:

- [ ] Homepage loads without errors
- [ ] All images display correctly
- [ ] All videos load and play
- [ ] Navigation links work
- [ ] Order form opens without issues
- [ ] Form submission shows success message
- [ ] Confirmation email received
- [ ] No console errors (F12 → Console)
- [ ] Mobile responsive (test on phone)

## 🐛 Common Issues & Solutions

### Issue 1: Images/Videos Show 404

**Solution:**
- Verify files are in public_html folder
- Check file names match exactly (case-sensitive on Linux servers)
- Re-upload the missing files

### Issue 2: Form Not Submitting

**Solution:**
- Check **submit-order.php** permissions (644)
- Verify PHP is enabled (should be by default)
- Check browser console (F12) for error messages
- Test email configuration

### Issue 3: Emails Not Sending

**Solution:**
- Check email configuration in submit-order.php
- Verify sender email exists (use Hostinger-created email)
- Check spam folder
- Contact Hostinger support if issue persists

### Issue 4: CSS Not Loading / Broken Layout

**Solution:**
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check if styles.css is in public_html
- Verify no typos in filenames
- Update index.html reference if needed

### Issue 5: JSON Parsing Errors in Console

**Solution:**
- Clear browser cache
- Logout and log back in
- Refresh page multiple times
- Try different browser

## 📱 Mobile Testing

Test on mobile phone:
1. Visit your domain on mobile browser
2. Check layout is responsive
3. Test form submission
4. Verify images load on mobile

## 🔒 Security Notes

1. **Protect Your Email:**
   - Change email in submit-order.php before going live
   - Use a separate admin email

2. **Form Validation:**
   - PHP script validates all inputs
   - Email and phone are sanitized
   - HTML special characters escaped

3. **Log Files:**
   - orders.log keeps records  
   - No sensitive data stored
   - Regular backups recommended

## 🎯 Post-Deployment

### Set Up Custom Domain

1. In Hostinger → **Domain Settings**
2. Point domain to Hostinger servers
3. Update nameservers at registrar if needed
4. Wait 24-48 hours for DNS propagation

### SSL Certificate

1. Hostinger usually provides free SSL
2. Enable in **Security** → **SSL Certificate**
3. Your site becomes **https://**

### Performance Optimization

1. **Images:**
   - Already optimized for web
   - Videos are pre-compressed

2. **Caching:**
   - Hostinger cache can help
   - Enable in Performance settings

3. **CDN:**
   - Optional but improves video loading
   - Configure in Hostinger dashboard

## 📞 Support

**If you need help:**

1. **Hostinger Support:** https://support.hostinger.com
2. **Check Error Logs:** File Manager → Right-click public_html → View Error Log
3. **Contact:** digital.work.3442@gmail.com

## 📦 Backup Instructions

Before going live:

1. File Manager → Select all files
2. Right-click → **Download**
3. Save locally as backup

## ✨ Final Notes

- Website is fully functional and tested
- No Node.js/backend required
- Works on all Hostinger plans
- PHP forms work on basic shared hosting
- Videos optimized for web delivery
- Mobile responsive design included

**Everything is ready to deploy! Upload files and your site will be live in minutes.** 🚀

---

**Deployment Date:** April 10, 2026  
**Version:** Production Ready  
**Status:** ✅ All tests passed
