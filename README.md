# RAGNI BAGS Website
## 1. GitHub Pages
Repo me sab files upload karo → Settings → Pages → Branch `main` / root → Save.
Admin panel: `yoursite/admin.html` (demo password: `ragni123`).

## 2. Settings
`js/config.js` me Instagram, Google profile, siteUrl bharo.

## 3. Image upload (AceCloud S3 on Vercel)
`api/upload.js` Vercel function hai. Vercel dashboard > Project > Settings > Environment Variables me ye add karo, phir Redeploy:
S3_KEY, S3_SECRET, S3_ENDPOINT (https://s3-noi.aces3.ai), S3_BUCKET, S3_FOLDER (ragni-bags), S3_PUBLIC_BASE (https://s3-noi.aces3.ai/noxhub), S3_REGIONS (ap-south-noi-1,us-east-1), S3_ACL_PUBLIC (false ya true), ADMIN_PASS.
Keys kabhi code ya GitHub me mat likhna.

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
