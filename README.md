# BDU Hesablama Platforması

## Layihə Haqqında
**Ad**: BDU Hesablama Platforması  
**Məqsəd**: Bakı Dövlət Universiteti tələbələri üçün akademik hesablamalar və faydalı məlumatlar təqdim edən PWA (Progressive Web App) platforması  

## Əsas Xüsusiyyətlər
✅ **PWA Dəstəyi**: Oflayn işləyə bilən, ana ekrana əlavə edilə bilən tətbiq  
✅ **Semestr Bal Hesablama**: Seminar, kollokvium, davamiyyət və sərbəst iş ballarının hesablanması  
✅ **ÜOMG Hesablama**: Ümumi Orta Məzuniyyət Göstəricisinin hesablanması  
✅ **25% İmtahan Pulu**: Kəsr pulunun hesablanması  
✅ **Yaş Hesablayıcı**: Yaş və ad günü məlumatları  
✅ **Akademik Lüğət**: Tez-tez qarşılaşılan terminlər  
✅ **Faydalı Məlumatlar**: Akademik həyatla bağlı məlumatlar  
✅ **Sürətli Linklər**: BDU rəsmi səhifələri və sosial media linklər  

## Texnologiyalar
- **Framework**: Hono (Cloudflare Workers)
- **Frontend**: Vanilla JavaScript + CSS
- **PWA**: Service Worker ilə oflayn dəstək
- **Hosting**: Cloudflare Pages
- **Icons**: Font Awesome

## Quraşdırma və İstifadə

### Lokal Development
```bash
# Dependencies yüklə
npm install

# Build et
npm run build

# Development server başlat (PM2 ilə)
pm2 start ecosystem.config.cjs

# Test et
npm run test
```

### Cloudflare Pages-ə Deploy

1. **Cloudflare API açarını konfiqurasiya et**:
```bash
setup_cloudflare_api_key
```

2. **Build və Deploy**:
```bash
npm run deploy:prod
```

## Hazırda Tamamlanmış Funksiyalar
1. ✅ PWA quraşdırma funksiyası
2. ✅ Semestr bal hesablama (seminar, kollokvium, davamiyyət, sərbəst iş)
3. ✅ ÜOMG hesablama
4. ✅ 25% imtahan pulu hesablama
5. ✅ Yaş hesablayıcı
6. ✅ Akademik lüğət bölməsi
7. ✅ Məlumat bölməsi
8. ✅ Sürətli linklər bölməsi
9. ✅ WhatsApp əlaqə banner-i
10. ✅ Responsive dizayn
11. ✅ Oflayn istifadə dəstəyi

## İstifadəçi Təlimatı

### PWA Quraşdırma
1. Sayta daxil olun
2. "Tətbiqi Quraşdırın" düyməsinə basın
3. Təsdiq edin
4. Ana ekranda tətbiq ikonu görünəcək
5. İnternetiniz olmasa belə istifadə edə bilərsiniz

### Hesablama Apletləri
- **Semestr Bal**: Seminar və kollokvium sayını, qiymətləri, sərbəst iş balını və davamiyyət məlumatlarını daxil edin
- **ÜOMG**: Fənn sayını, hər fənnin balını və kreditini daxil edin
- **İmtahan Pulu**: İllik ödənişi və fənnin kreditini daxil edin
- **Yaş**: Doğum tarixinizi GG.AA.İİİİ formatında daxil edin

## URLs
- **🌐 Production (CANLI)**: https://bdu-calculator.pages.dev
- **📦 Preview**: https://31a8cb8a.bdu-calculator.pages.dev
- **💻 Lokal Test**: https://3000-irftg6pe9ldeanhhk4m93-8f57ffe2.sandbox.novita.ai
- **📂 GitHub Repository**: https://github.com/gupi9163-lab/sonolsunbu
- **💾 Backup**: https://www.genspark.ai/api/files/s/bzOJMUgI

## Deployment Status
- **Platform**: Cloudflare Pages ✅
- **Status**: 🎉 **CANLI VƏ İŞLƏYİR!**
- **Production URL**: https://bdu-calculator.pages.dev
- **Son Deploy**: 2026-03-01
- **Project Name**: bdu-calculator

## Növbəti Addımlar
1. İkonları (192x192 və 512x512 PNG) əlavə edin
2. Lüğət və məlumat bölmələrinə daha çox məzmun əlavə edin
3. GitHub-a push edin
4. Cloudflare Pages-ə deploy edin
5. Real URL test edin

## Əlaqə
WhatsApp: +994559406018  
Instagram: @desespere_etoile
