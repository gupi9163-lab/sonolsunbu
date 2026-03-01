import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))
app.use('/manifest.json', serveStatic({ path: './manifest.json' }))
app.use('/sw.js', serveStatic({ path: './sw.js' }))

// Main page
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="az">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="BDU tələbələri üçün hesablama və məlumat platforması">
    <meta name="theme-color" content="#4F46E5">
    <title>BDU Hesablama Platforması</title>
    
    <!-- PWA -->
    <link rel="manifest" href="/manifest.json">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="BDU Hesablama">
    
    <!-- CSS -->
    <link rel="stylesheet" href="/static/style.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Top Banner -->
    <div class="top-banner">
        <div class="banner-text">🎓 Ən ucuz sərbəst iş hazırlanması</div>
        <a href="https://wa.me/994559406018" class="whatsapp-btn" target="_blank">
            <i class="fab fa-whatsapp"></i> Əlaqə
        </a>
    </div>

    <div class="container">
        <!-- Install Button -->
        <div id="installContainer" class="install-container">
            <h3 style="margin-bottom: 15px;">📱 Tətbiqi Quraşdırın</h3>
            <p style="margin-bottom: 15px; color: #666;">Oflayn istifadə üçün tətbiqi ana ekrana əlavə edin</p>
            <button id="installBtn" class="install-btn">
                <i class="fas fa-download"></i>
                Quraşdır
            </button>
        </div>

        <!-- Main Menu -->
        <div id="mainMenu">
            <div class="menu-grid">
                <div class="menu-item" onclick="showPage('semesterPage')">
                    <div class="menu-icon">📊</div>
                    <div class="menu-content">
                        <h3>Semestr Bal Hesablama</h3>
                        <p>Seminar, kollokvium və davamiyyət</p>
                    </div>
                </div>

                <div class="menu-item" onclick="showPage('uomgPage')">
                    <div class="menu-icon">📈</div>
                    <div class="menu-content">
                        <h3>ÜOMG Hesablama</h3>
                        <p>Ümumi orta məzuniyyət göstəricisi</p>
                    </div>
                </div>

                <div class="menu-item" onclick="showPage('examFeePage')">
                    <div class="menu-icon">💰</div>
                    <div class="menu-content">
                        <h3>25% İmtahan Pulu</h3>
                        <p>Kəsr pulu hesablama</p>
                    </div>
                </div>

                <div class="menu-item" onclick="showPage('agePage')">
                    <div class="menu-icon">🎂</div>
                    <div class="menu-content">
                        <h3>Yaş Hesablayıcı</h3>
                        <p>Yaşınızı və növbəti ad gününüzü öyrənin</p>
                    </div>
                </div>

                <div class="menu-item" onclick="showPage('dictionaryPage')">
                    <div class="menu-icon">📚</div>
                    <div class="menu-content">
                        <h3>Lüğət</h3>
                        <p>Akademik terminlər lüğəti</p>
                    </div>
                </div>

                <div class="menu-item" onclick="showPage('infoPage')">
                    <div class="menu-icon">ℹ️</div>
                    <div class="menu-content">
                        <h3>Məlumat</h3>
                        <p>Faydalı məlumatlar</p>
                    </div>
                </div>

                <div class="menu-item" onclick="showPage('linksPage')">
                    <div class="menu-icon">🔗</div>
                    <div class="menu-content">
                        <h3>Sürətli Linklər</h3>
                        <p>Faydalı linklər toplusu</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Semestr Bal Hesablama Page -->
        <div id="semesterPage" class="calculator-page">
            <button class="back-btn" onclick="showMenu()">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2>📊 Semestr Bal Hesablama</h2>
            
            <div class="form-group">
                <label>Seminar sayı (maksimum 9):</label>
                <input type="number" id="seminarCountInput" min="1" max="9" required>
            </div>
            
            <div id="seminarGrades" class="grade-inputs"></div>
            
            <div class="form-group">
                <label>Kollokvium sayı (maksimum 4):</label>
                <input type="number" id="kollokviumCountInput" min="1" max="4" required>
            </div>
            
            <div id="kollokviumGrades" class="grade-inputs"></div>
            
            <div class="form-group">
                <label>Sərbəst iş balı (0-10):</label>
                <input type="number" id="serbestInput" min="0" max="10" step="0.1" required>
            </div>
            
            <div class="form-group">
                <label>Saat seçin:</label>
                <select id="attendanceHours" required>
                    <option value="">Seçin</option>
                    <option value="30">30 saat</option>
                    <option value="45">45 saat</option>
                    <option value="60">60 saat</option>
                    <option value="75">75 saat</option>
                    <option value="90">90 saat</option>
                    <option value="105">105 saat</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Qayıb sayı:</label>
                <input type="number" id="absencesInput" min="0" required>
            </div>
            
            <button class="calculate-btn" id="calculateSemester">Hesabla</button>
            
            <div id="semesterResult" class="result">
                <h3>Nəticə</h3>
                <div class="score" id="semesterScore">0</div>
                <div class="status" id="semesterStatus"></div>
            </div>
        </div>

        <!-- ÜOMG Page -->
        <div id="uomgPage" class="calculator-page">
            <button class="back-btn" onclick="showMenu()">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2>📈 ÜOMG Hesablama</h2>
            
            <div class="form-group">
                <label>Fənn sayı:</label>
                <input type="number" id="subjectCountInput" min="1" required>
            </div>
            
            <div id="subjectsContainer" class="grade-inputs"></div>
            
            <button class="calculate-btn" id="calculateUomg">Hesabla</button>
            
            <div id="uomgResult" class="result">
                <h3>ÜOMG</h3>
                <div class="score" id="uomgScore">0</div>
                <div class="status" id="uomgStatus"></div>
            </div>
        </div>

        <!-- Exam Fee Page -->
        <div id="examFeePage" class="calculator-page">
            <button class="back-btn" onclick="showMenu()">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2>💰 25% İmtahan Pulu Hesablama</h2>
            
            <div class="form-group">
                <label>İllik ödəniş (₼):</label>
                <input type="number" id="tuitionInput" min="0" step="0.01" required>
            </div>
            
            <div class="form-group">
                <label>Fənnin kredit sayı:</label>
                <input type="number" id="creditInput" min="1" required>
            </div>
            
            <button class="calculate-btn" id="calculateExamFee">Hesabla</button>
            
            <div id="examFeeResult" class="result">
                <h3>Ödəniş Məbləği</h3>
                <div class="score" id="examFeeScore">0 ₼</div>
            </div>
        </div>

        <!-- Age Calculator Page -->
        <div id="agePage" class="calculator-page">
            <button class="back-btn" onclick="showMenu()">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2>🎂 Yaş Hesablayıcı</h2>
            
            <div class="form-group">
                <label>Doğum tarixi (GG.AA.IIII):</label>
                <input type="text" id="birthDateInput" placeholder="01.01.2000" required>
            </div>
            
            <button class="calculate-btn" id="calculateAge">Hesabla</button>
            
            <div id="ageResult" class="result">
                <h3>Sizin Yaşınız</h3>
                <div class="score" id="ageYears">0</div>
                <p style="font-size: 18px; margin-top: 15px;">
                    Siz <strong id="ageDays">0</strong> gün yaşamısınız
                </p>
                <p style="font-size: 18px; margin-top: 10px;">
                    Növbəti ad gününüzə <strong id="ageNextBirthday">0</strong> gün qalıb
                </p>
            </div>
        </div>

        <!-- Dictionary Page -->
        <div id="dictionaryPage" class="calculator-page">
            <button class="back-btn" onclick="showMenu()">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2>📚 Akademik Lüğət</h2>
            
            <ul class="info-list">
                <li>
                    <strong>Mühazirə</strong>
                    Müəllimin keçdiyi dərs
                </li>
            </ul>
        </div>

        <!-- Info Page -->
        <div id="infoPage" class="calculator-page">
            <button class="back-btn" onclick="showMenu()">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2>ℹ️ Faydalı Məlumatlar</h2>
            
            <ul class="info-list">
                <li>
                    <strong>Əlaçı olmaq üçün</strong>
                    Bütün fənnlər 91+ bal olmalıdır
                </li>
            </ul>
        </div>

        <!-- Links Page -->
        <div id="linksPage" class="calculator-page">
            <button class="back-btn" onclick="showMenu()">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2>🔗 Sürətli Linklər</h2>
            
            <div class="links-grid">
                <a href="https://bdu.edu.az" class="link-item" target="_blank">
                    <div class="link-icon">🌐</div>
                    <div>BDU Rəsmi Sayt</div>
                </a>
                
                <a href="https://sems.bdu.edu.az" class="link-item" target="_blank">
                    <div class="link-icon">🎓</div>
                    <div>SemsLogin (Akademik Portal)</div>
                </a>
                
                <a href="https://whatsapp.com/channel/0029Va85Ls85q08WyYoGeJ3r" class="link-item" target="_blank">
                    <div class="link-icon">💬</div>
                    <div>BDU WhatsApp Kanal</div>
                </a>
                
                <a href="https://www.instagram.com/bdu_eduaz" class="link-item" target="_blank">
                    <div class="link-icon">📸</div>
                    <div>BDU Instagram</div>
                </a>
                
                <a href="https://t.me/bdu_eduaz" class="link-item" target="_blank">
                    <div class="link-icon">✈️</div>
                    <div>BDU Telegram</div>
                </a>
                
                <a href="https://www.instagram.com/desespere_etoile" class="link-item" target="_blank">
                    <div class="link-icon">👤</div>
                    <div>Sayt Sahibi Instagram</div>
                </a>
                
                <a href="https://t.me/+WUKxtnDjo2E5YTcy" class="link-item" target="_blank">
                    <div class="link-icon">👥</div>
                    <div>Tələbə Chat Qrupu</div>
                </a>
            </div>
        </div>
    </div>

    <!-- Info Button -->
    <button id="infoBtn" class="info-btn">i</button>
    <div id="infoMessage" class="info-message">
        O, boşluq yaradır.
    </div>

    <script src="/static/app.js"></script>
</body>
</html>
  `)
})

export default app
