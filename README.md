# RAGNI BAGS Website
## 1. GitHub Pages
Repo me sab files upload karo → Settings → Pages → Branch `main` / root → Save.
Admin panel: `yoursite/admin.html` (demo password: `ragni123`).

## 2. Settings
`js/config.js` me Instagram, Google profile, siteUrl bharo.

## 3. Image upload (Cloudinary)
cloudinary.com free account → Settings → Upload → "Add upload preset" → Signing Mode **Unsigned**.
`cloudName` aur `uploadPreset` config.js me daalo. Admin me drag & drop se image seedha Cloudinary pe jayegi.

## 4. Products online save (Firebase) - ZARURI
GitHub Pages pe database nahi hota, isliye Firebase free use karo:
1. console.firebase.google.com → project → Web app add → config `firebase:{}` me paste karo.
2. Build → Firestore Database create karo.
3. Build → Authentication → Email/Password ON → apna admin user banao.
4. Firestore Rules:
```
rules_version='2'; service cloud.firestore { match /databases/{d}/documents { match /products/{id} { allow read: if true; allow write: if request.auth!=null; } } }
```
Bina Firebase ke site demo mode me chalti hai (data sirf us browser me save hota hai).

## SEO
Har product ka alag page: `product.html?id=...` (alag title, description, Product schema). Google Search Console me site add karo.
