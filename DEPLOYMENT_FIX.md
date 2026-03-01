# 🔧 Cloudflare Pages Deployment - Düzəltmə

## ❌ Xəta İzahı

Siz bu əmri işlətmisiniz:
```bash
wrangler deploy
```

Bu əmr **Cloudflare Workers** üçündür, **Pages** üçün deyil!

## ✅ Düzgün Əmr

Cloudflare Pages üçün düzgün əmr:

```bash
wrangler pages deploy dist --project-name bdu-calculator
```

və ya

```bash
npm run deploy:prod
```

## 📝 Addım-addım Deployment

### 1. Cloudflare API Key Konfiqurasiyası
Əgər hələ etməmisinizsə, əvvəlcə API key konfiqurasiya edin:
- Deploy tabına keçin
- Cloudflare API token yaradın və saxlayın

### 2. API Key Test
```bash
npx wrangler whoami
```

Əgər xəta verərsə, yenidən API key konfiqurasiya edin.

### 3. Layihə Yarat (İlk dəfə)
```bash
npx wrangler pages project create bdu-calculator \
  --production-branch main \
  --compatibility-date 2026-03-01
```

### 4. Deploy Et
```bash
npm run deploy:prod
```

və ya

```bash
npm run build
npx wrangler pages deploy dist --project-name bdu-calculator
```

## 🎯 Gözlənilən Nəticə

Uğurlu deployment sonrası:
```
✨ Deployment complete! Take a peek over at https://xxxxxxx.bdu-calculator.pages.dev
```

## ⚠️ Əhəmiyyətli Qeydlər

1. **Heç vaxt `wrangler deploy` işlətməyin** - bu Workers üçündür
2. **Həmişə `wrangler pages deploy` işlədin** - bu Pages üçündür
3. **`dist` folder dəqiq göstərin** - build output directory
4. **`--project-name` dəqiq olmalıdır** - bdu-calculator

## 🔍 Xəta Həlli

### Əgər "Missing entry-point" xətası alırsınızsa:
- `wrangler deploy` əvəzinə `wrangler pages deploy` işlədin
- `dist` folder-in olduğundan əmin olun: `ls dist/`

### Əgər "Project not found" xətası alırsınızsa:
- Əvvəlcə layihəni yaradın: `npx wrangler pages project create bdu-calculator`

### Əgər "Unauthorized" xətası alırsınızsa:
- API key-i yenidən konfiqurasiya edin (Deploy tab)
