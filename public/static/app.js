// PWA Installation
let deferredPrompt;
const installContainer = document.getElementById('installContainer');
const installBtn = document.getElementById('installBtn');

// Always show install container
installContainer.classList.add('show');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installContainer.classList.add('show');
  installBtn.textContent = '📱 Tətbiqi Quraşdır';
});

installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      installContainer.classList.remove('show');
    }
    deferredPrompt = null;
  } else {
    // Manual install instructions
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS) {
      alert('iOS Quraşdırma:\n\n1. Safari brauzerdə açın\n2. Aşağıda "Paylaş" düyməsinə basın (⬆️)\n3. "Ana Ekrana Əlavə Et" seçin\n4. "Əlavə et" düyməsinə basın');
    } else if (isAndroid) {
      alert('Android Quraşdırma:\n\n1. Chrome brauzerdə açın\n2. Yuxarı sağ küncdə 3 nöqtəyə basın (⋮)\n3. "Ana ekrana əlavə et" seçin\n4. "Quraşdır" düyməsinə basın');
    } else {
      alert('Tətbiq Quraşdırma:\n\n1. Brauzer menyusunu açın\n2. "Quraşdır" və ya "Ana ekrana əlavə et" seçin\n\nVə ya:\n- Chrome: Ünvan sətrində quraşdırma ikonuna basın\n- Safari: Paylaş düyməsi > Ana ekrana əlavə et');
    }
  }
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.log('Service Worker registration failed'));
  });
}

// Navigation
function showPage(pageId) {
  document.getElementById('mainMenu').style.display = 'none';
  document.querySelectorAll('.calculator-page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}

function showMenu() {
  document.getElementById('mainMenu').style.display = 'block';
  document.querySelectorAll('.calculator-page').forEach(page => {
    page.classList.remove('active');
  });
  // Show info button only on main menu
  document.getElementById('infoBtn').style.display = 'block';
}

// Info Button
document.getElementById('infoBtn').addEventListener('click', () => {
  const infoMsg = document.getElementById('infoMessage');
  infoMsg.classList.toggle('show');
});

// Hide info message when navigating
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    document.getElementById('infoMessage').classList.remove('show');
    document.getElementById('infoBtn').style.display = 'none';
  });
});

// 1. Semestr Bal Hesablama
document.getElementById('seminarCountInput').addEventListener('change', function() {
  const count = parseInt(this.value);
  const container = document.getElementById('seminarGrades');
  container.innerHTML = '';
  
  for (let i = 1; i <= count; i++) {
    const div = document.createElement('div');
    div.className = 'grade-item';
    div.innerHTML = `
      <label>Seminar ${i}:</label>
      <input type="number" min="0" max="10" step="0.1" class="seminar-grade" required>
    `;
    container.appendChild(div);
  }
});

document.getElementById('kollokviumCountInput').addEventListener('change', function() {
  const count = parseInt(this.value);
  const container = document.getElementById('kollokviumGrades');
  container.innerHTML = '';
  
  for (let i = 1; i <= count; i++) {
    const div = document.createElement('div');
    div.className = 'grade-item';
    div.innerHTML = `
      <label>Kollokvium ${i}:</label>
      <input type="number" min="0" max="10" step="0.1" class="kollokvium-grade" required>
    `;
    container.appendChild(div);
  }
});

function calculateAttendance() {
  const hours = parseInt(document.getElementById('attendanceHours').value);
  const absences = parseInt(document.getElementById('absencesInput').value);
  
  const rules = {
    30: [[1, 2, 9], [3, 3, 8], [4, Infinity, 0]],
    45: [[1, 1, 10], [2, 3, 9], [4, 5, 8], [6, Infinity, 0]],
    60: [[1, 1, 10], [2, 4, 9], [5, 7, 8], [8, Infinity, 0]],
    75: [[1, 1, 10], [2, 5, 9], [6, 9, 8], [10, Infinity, 0]],
    90: [[1, 2, 10], [3, 6, 9], [7, 11, 8], [12, Infinity, 0]],
    105: [[1, 2, 10], [3, 7, 9], [8, 13, 8], [14, Infinity, 0]]
  };
  
  const rule = rules[hours];
  for (let [min, max, score] of rule) {
    if (absences >= min && absences <= max) {
      return score;
    }
  }
  return 0;
}

function getGradeStatus(score) {
  if (score === 0) return '⚠️ 0 BAL ⚠️';
  if (score >= 50) return '🎉 MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ! ✅';
  if (score >= 45) return '🔥 ÇOX YAXŞI 📊';
  if (score >= 41) return '💣 YAXŞI 📈';
  if (score >= 36) return '🫂 KAFİ 📉';
  if (score >= 26) return '🎭 ZƏİF 📴';
  return '🗿 YAXŞI OLACAQ 🆒';
}

document.getElementById('calculateSemester').addEventListener('click', function() {
  const seminarGrades = Array.from(document.querySelectorAll('.seminar-grade')).map(el => parseFloat(el.value) || 0);
  const kollokviumGrades = Array.from(document.querySelectorAll('.kollokvium-grade')).map(el => parseFloat(el.value) || 0);
  const serbest = parseFloat(document.getElementById('serbestInput').value) || 0;
  const attendance = calculateAttendance();
  
  if (seminarGrades.length === 0 || kollokviumGrades.length === 0) {
    alert('Zəhmət olmasa bütün qiymətləri daxil edin');
    return;
  }
  
  const seminarAvg = seminarGrades.reduce((a, b) => a + b, 0) / seminarGrades.length;
  const kollokviumAvg = kollokviumGrades.reduce((a, b) => a + b, 0) / kollokviumGrades.length;
  
  const total = (seminarAvg * 0.4 + kollokviumAvg * 0.6) * 3 + attendance + serbest;
  const status = getGradeStatus(total);
  
  document.getElementById('semesterScore').textContent = total.toFixed(2);
  document.getElementById('semesterStatus').textContent = status;
  document.getElementById('semesterResult').classList.add('show');
});

// 2. ÜOMG Hesablama
document.getElementById('subjectCountInput').addEventListener('change', function() {
  const count = parseInt(this.value);
  const container = document.getElementById('subjectsContainer');
  container.innerHTML = '';
  
  for (let i = 1; i <= count; i++) {
    const div = document.createElement('div');
    div.className = 'grade-item';
    div.innerHTML = `
      <label>Fənn ${i}:</label>
      <input type="number" min="0" max="100" class="subject-grade" placeholder="Bal" required>
      <input type="number" min="1" max="10" class="subject-credit" placeholder="Kredit" required>
    `;
    container.appendChild(div);
  }
});

document.getElementById('calculateUomg').addEventListener('click', function() {
  const grades = Array.from(document.querySelectorAll('.subject-grade')).map(el => parseFloat(el.value) || 0);
  const credits = Array.from(document.querySelectorAll('.subject-credit')).map(el => parseFloat(el.value) || 0);
  
  if (grades.length === 0 || credits.length === 0) {
    alert('Zəhmət olmasa bütün məlumatları daxil edin');
    return;
  }
  
  let totalWeighted = 0;
  let totalCredits = 0;
  
  for (let i = 0; i < grades.length; i++) {
    totalWeighted += grades[i] * credits[i];
    totalCredits += credits[i];
  }
  
  const uomg = totalWeighted / totalCredits;
  const status = getGradeStatus(uomg);
  
  document.getElementById('uomgScore').textContent = uomg.toFixed(2);
  document.getElementById('uomgStatus').textContent = status;
  document.getElementById('uomgResult').classList.add('show');
});

// 3. 25% İmtahan Pulu Hesablama
document.getElementById('calculateExamFee').addEventListener('click', function() {
  const tuition = parseFloat(document.getElementById('tuitionInput').value) || 0;
  const credit = parseFloat(document.getElementById('creditInput').value) || 0;
  
  if (tuition === 0 || credit === 0) {
    alert('Zəhmət olmasa bütün məlumatları daxil edin');
    return;
  }
  
  const fee = ((tuition / 60) * credit) / 4 + 1;
  
  document.getElementById('examFeeScore').textContent = fee.toFixed(2) + ' ₼';
  document.getElementById('examFeeResult').classList.add('show');
});

// 4. Yaş Hesablayıcı
document.getElementById('calculateAge').addEventListener('click', function() {
  const birthInput = document.getElementById('birthDateInput').value;
  
  if (!birthInput) {
    alert('Zəhmət olmasa doğum tarixinizi daxil edin');
    return;
  }
  
  const [day, month, year] = birthInput.split('.').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  
  // Age calculation
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  // Days lived
  const timeDiff = today - birthDate;
  const daysLived = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  // Next birthday
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);
  if (nextBirthday < today) {
    nextBirthday = new Date(today.getFullYear() + 1, month - 1, day);
  }
  const daysToNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
  
  document.getElementById('ageYears').textContent = age;
  document.getElementById('ageDays').textContent = daysLived;
  document.getElementById('ageNextBirthday').textContent = daysToNextBirthday;
  document.getElementById('ageResult').classList.add('show');
});
