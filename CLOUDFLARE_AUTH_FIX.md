# 🔑 Cloudflare API İcazə Xətası - Həlli

## ❌ Xəta Mesajı
```
A request to the Cloudflare API (/accounts/.../pages/projects/bdu-calculator) failed
```

## 🔍 Problemin Səbəbi

API token-inizdə **Cloudflare Pages** üçün lazımi icazələr yoxdur.

---

## ✅ Həll Yolu 1: Yeni API Token Yaradın (Tövsiyə Edilir)

### Addım 1: Cloudflare Dashboard-a Keçin
1. https://dash.cloudflare.com/profile/api-tokens
2. **Create Token** düyməsinə basın

### Addım 2: Düzgün Şablon Seçin
**"Edit Cloudflare Workers"** şablonunu seçin və ya **Custom Token** yaradın

### Addım 3: İcazələri Konfiqurasiya Edin

#### Minimum Lazımi İcazələr:
```
Account - Cloudflare Pages - Edit
```

#### Tam İcazələr (Tövsiyə Edilir):
```
Account - Cloudflare Pages - Edit
Account - Account Settings - Read
Zone - Workers Routes - Edit (opsional)
```

### Addım 4: Account Resources
- **Include** → **Specific account** → Hesabınızı seçin
- və ya **All accounts** seçin

### Addım 5: Token Yaradın və Kopyalayın
1. **Continue to summary**
2. **Create Token**
3. Token-i **kopyalayın** (bir dəfə göstərilir!)

---

## ✅ Həll Yolu 2: Wrangler Login (Ən Asan)

Bu üsul avtomatik olaraq bütün icazələri verir:

```bash
# 1. Əvvəlki token-i silin
rm -rf ~/.wrangler

# 2. Yenidən login olun
npx wrangler login

# 3. Brauzerdə açılacaq və icazə verəcəksiniz
# "Allow" düyməsinə basın

# 4. Test edin
npx wrangler whoami
```

---

## 📝 Yeni Token-i Əlavə Etmək

### Deploy Tab vasitəsilə:
1. **Deploy** tabına keçin
2. **Cloudflare API Key** bölməsinə yeni token-i yapışdırın
3. **Save** düyməsinə basın

### və ya Manuel (Terminal):
```bash
# Token-i environment variable olaraq əlavə edin
export CLOUDFLARE_API_TOKEN="your-new-token-here"

# Test edin
npx wrangler whoami
```

---

## 🚀 Deploy Əmrlərini Yenidən İşlədin

Token düzəldikdən sonra:

```bash
# 1. Layihə yaradın (əgər yaratmamısınızsa)
npx wrangler pages project create bdu-calculator \
  --production-branch main \
  --compatibility-date 2026-03-01

# 2. Deploy edin
npm run deploy:prod
```

---

## 🔧 Alternativ: Cloudflare Dashboard-dan Deploy

Əgər API problem davam edərsə, Dashboard-dan manual deploy edə bilərsiniz:

### Addım 1: Cloudflare Dashboard
1. https://dash.cloudflare.com
2. **Workers & Pages** → **Create application**
3. **Pages** → **Connect to Git**

### Addım 2: GitHub Repository Bağlayın
1. GitHub hesabınızı bağlayın
2. **sonolsunbu** repository-ni seçin
3. **main** branch seçin

### Addım 3: Build Settings
```
Build command: npm run build
Build output directory: dist
```

### Addım 4: Deploy
**Save and Deploy** düyməsinə basın

---

## ✅ Hansı Üsul Daha Yaxşıdır?

| Üsul | Asanlıq | Tövsiyə |
|------|---------|---------|
| `wrangler login` | ⭐⭐⭐⭐⭐ | ✅ Ən asan və etibarlı |
| Yeni API Token | ⭐⭐⭐ | ✅ Yaxşı |
| Dashboard Deploy | ⭐⭐⭐⭐ | ✅ API problemləri üçün |

---

## 🎯 Tövsiyə

**İlk növbədə `wrangler login` işlədin:**

```bash
# 1. Təmizləyin
rm -rf ~/.wrangler

# 2. Login olun
npx wrangler login

# 3. Deploy edin
npm run deploy:prod
```

Bu üsul avtomatik olaraq bütün icazələri verir və ən az problem yaradır.

---

## ❓ Yenə Xəta Alırsınızsa?

Mənə xəta mesajının tam mətnini göndərin və mən kömək edəcəm.

Ümumi səbəblər:
- ❌ Token vaxtı keçib
- ❌ Account ID səhvdir
- ❌ İcazələr kifayət deyil
- ❌ Cloudflare hesabında Pages aktivləşdirilməyib
