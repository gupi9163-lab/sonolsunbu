# 🚀 Cloudflare Pages Deployment Guide

## Hazırlanma Statusu
✅ Kod GitHub-da: https://github.com/gupi9163-lab/sonolsunbu
✅ Build test edilib və işləyir
✅ Lokal test edilib: https://3000-irftg6pe9ldeanhhk4m93-8f57ffe2.sandbox.novita.ai

## Cloudflare Pages-ə Deploy Etmək Üçün

### Addım 1: Cloudflare API Key Konfiqurasiyası
1. Deploy tabına keçin
2. Cloudflare API token yaradın
3. API key-i saxlayın

### Addım 2: Deployment
Terminalda bu əmrləri işlədin:

```bash
# API key konfiqurasiyasını yoxlayın
setup_cloudflare_api_key

# Cloudflare Pages layihəsi yaradın
npx wrangler pages project create bdu-calculator \
  --production-branch main \
  --compatibility-date 2026-03-01

# Deploy edin
npm run deploy:prod
```

### Addım 3: Environment Variables (Lazım deyil)
Bu layihədə heç bir API key və ya secret environment variable yoxdur.

### Gözlənilən Deployment URL
Production: `https://bdu-calculator.pages.dev`

## Lokal Test

```bash
# Build
npm run build

# Start development server
pm2 start ecosystem.config.cjs

# Test
curl http://localhost:3000
```

## Texniki Detallar

- **Framework**: Hono + Cloudflare Workers
- **PWA**: Service Worker ilə oflayn dəstək
- **Build Output**: `dist/` directory
- **Static Assets**: `public/static/` directory
- **Manifest**: `public/manifest.json`

## PWA Quraşdırma

Deploy edildikdən sonra istifadəçilər:
1. Sayta daxil olacaq
2. "Tətbiqi Quraşdırın" düyməsinə basacaq
3. Ana ekrana əlavə edəcək
4. Oflayn istifadə edə biləcək

## Qeyd

İkonlar (192x192 və 512x512 PNG) əlavə edilməlidir:
- `public/static/icon-192.png`
- `public/static/icon-512.png`

Müvəqqəti olaraq, manifest.json-da bu ikonlara referans var, amma brauzerlər tətbiqi yenə də quraşdıra biləcək.
