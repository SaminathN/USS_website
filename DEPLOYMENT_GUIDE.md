# USS Website - Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Environment Verification
- [x] All asset paths are relative (`./images/`, `./css/`, `./js/`)
- [x] Internal anchor links use hash navigation (`#services`, `#projects`)
- [x] External CDN resources load via HTTPS
- [x] Mobile menu and carousels function correctly
- [x] Video fallback poster image configured

### 2. File Optimization Status

**Current State:**
- **CSS**: Minimal custom CSS (< 1KB) - No build process needed
- **JavaScript**: Carousel logic (~5KB) - Already production-ready
- **Tailwind CSS**: Served via CDN (optimized by default)
- **Images**: 
  - Logo: `uss_logo1.png` (27KB) ✅
  - Certification: `certification.png` (1.95MB) ⚠️ *Could be optimized*
  - Project Images: 77KB - 198KB ✅
- **Video**: `hero-video.mp4` - *Check file size, compress if > 10MB*

**Optional Optimizations** (before deployment):
```bash
# If you have ImageMagick or similar tools:
# Compress certification.png
magick convert certification.png -quality 85 -define png:compression-level=9 certification_optimized.png

# If you have ffmpeg for video:
ffmpeg -i hero-video.mp4 -vcodec h264 -crf 28 hero-video_compressed.mp4
```

---

## 🚀 GitHub + Vercel Deployment

### Step 1: Initialize Git Repository

Open PowerShell in the `USS_website` directory and run:

```powershell
# Navigate to project directory
cd C:\Users\admin\USS_website

# Initialize Git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: USS website with dark carousels and video hero"
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon (top right) → **New repository**
3. Configure:
   - **Repository name**: `uss-website` (or your preference)
   - **Description**: "Uitenhage Super Steel official website"
   - **Visibility**: Public or Private
   - **DO NOT** initialize with README (we already have one)
4. Click **Create repository**

### Step 3: Push to GitHub

GitHub will show you commands. Use these:

```powershell
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/uss-website.git

# Verify remote was added
git remote -v

# Push to GitHub (main branch)
git branch -M main
git push -u origin main
```

**Authentication:** You'll be prompted for credentials. Use a Personal Access Token (not password):
- Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token with `repo` scope
- Use token as password when pushing

### Step 4: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **Add New** → **Project**
3. **Import Git Repository**:
   - Connect your GitHub account (if first time)
   - Select `uss-website` repository
4. **Configure Project**:
   - **Framework Preset**: Other (it's a static site)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: Leave empty
5. Click **Deploy**

#### Option B: Via Vercel CLI

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project
cd C:\Users\admin\USS_website

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (Choose your account)
# - Link to existing project? N
# - Project name? uss-website
# - Directory? ./
# - Want to override settings? N

# Deploy to production
vercel --prod
```

### Step 5: Configure Custom Domain (Optional)

1. In Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your custom domain (e.g., `www.usswebsite.com`)
3. Follow DNS configuration instructions
4. Vercel automatically provisions SSL certificate

---

## 🔄 Future Updates Workflow

When you make changes to the website:

```powershell
# 1. Stage changes
git add .

# 2. Commit with descriptive message
git commit -m "Update: Added new project to carousel"

# 3. Push to GitHub
git push

# Vercel automatically redeploys on every push to main branch
```

---

## 🌐 Important URLs After Deployment

- **GitHub Repo**: `https://github.com/YOUR_USERNAME/uss-website`
- **Vercel Dashboard**: `https://vercel.com/YOUR_USERNAME/uss-website`
- **Live Site**: `https://uss-website.vercel.app` (auto-generated)
- **Custom Domain**: `https://your-custom-domain.com` (if configured)

---

## 🛠️ Troubleshooting

### Issue: Images not loading
**Solution**: Verify paths in `index.html`:
- Should be `./images/filename.jpg` (relative)
- NOT `C:\Users\admin\USS_website\images\` (absolute)

### Issue: Video not playing
**Solution**: 
1. Check `hero-video.mp4` is in `media/` folder
2. Verify `<video>` tag has `autoplay muted playsinline` attributes
3. Ensure video codec is H.264 (widely supported)

### Issue: Carousels not working
**Solution**:
1. Check browser console for JavaScript errors
2. Verify `./js/script.js` is loaded
3. Ensure element IDs match (`servicesTrack`, `carouselTrack`)

### Issue: Vercel build fails
**Solution**: Since this is a static site:
- Build Command: Leave **blank**
- Output Directory: Leave **blank** or set to `./`
- Install Command: Leave **blank**

---

## 📊 Performance Optimization Tips

After deployment, test with:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

**Common improvements:**
1. **Image optimization**: Convert PNG to WebP for smaller sizes
2. **Video compression**: Use H.264 codec with CRF 28
3. **Lazy loading**: Add `loading="lazy"` to `<img>` tags below the fold
4. **CDN**: Vercel automatically uses global edge network

---

## 📞 Support

For deployment issues:
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub**: [docs.github.com](https://docs.github.com)

---

**Last Updated**: 2026-02-05
