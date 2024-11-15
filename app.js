// Konstansok beállítása és inicializálása
const MIN_DATE = new Date().toISOString().split('T')[0];  // Aktuális dátum (ISO formátumban, pl. 2024-11-15)
const MIN_START_TIME = '08:00'; // A legkorábbi kezdési idő (8:00 reggel)
const entriesList = document.getElementById('entries-list');
const errorMessage = document.getElementById('error-message');

document.addEventListener('DOMContentLoaded', () => {
    // Form beküldésének eseménykezelője
    document.getElementById('entry-form').addEventListener('submit', handleFormSubmit);
    loadEntries();  // Bejegyzések betöltése oldal betöltésekor
});

// Bejegyzések betöltése localStorage-ból
function loadEntries() {
    const entriesList = document.getElementById('entries-list');
    entriesList.innerHTML = '';  // Üresítjük a listát újratöltés előtt
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(entry => displayEntry(entry));
}

// Bejegyzés megjelenítése
function displayEntry(entry) {
    const entriesList = document.getElementById('entries-list');
    const entryDiv = document.createElement('div');
    entryDiv.className = 'border-b border-gray-300 py-2';
    entryDiv.innerHTML = `
        <p><strong>Dátum:</strong> ${entry.date}</p>
        <p><strong>Kezdés:</strong> ${entry.start}</p>
        <p><strong>Befejezés:</strong> ${entry.end}</p>
        <p><strong>Leírás:</strong> ${entry.description}</p>
        <p><strong>Címke:</strong> ${entry.category}</p>
    `;
    entriesList.appendChild(entryDiv); // Hozzáadjuk a div-hez
}

// Form submit eseménykezelője
function handleFormSubmit(event) {
    event.preventDefault();  // Ne töltsük újra az oldalt

    // Adatok lekérése a form mezőkből
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    // Dátum validálása
    if (!isDateValid(year, month, day) || !isStartTimeValid(start) || !isTimeValid(start, end)) return;

    const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Dátum formázása YYYY-MM-DD

    // Új bejegyzés létrehozása és mentése
    const entry = { date, start, end, description, category };
    saveEntry(entry);
    displayEntry(entry);  // Azonnali megjelenítés
    document.getElementById('entry-form').reset(); // Form ürítése
}

// Dátum validálása
function isDateValid(year, month, day) {
    // Év, hónap és nap megfelelő értékeinek ellenőrzése
    if (month < 1 || month > 12) {
        showError('A hónapnak 1 és 12 között kell lennie!');
        return false;
    }
    if (day < 1 || day > 31) {
        showError('A napnak 1 és 31 között kell lennie!');
        return false;
    }

    // Ha a hónap február, és a nap nagyobb 28-nál, akkor hiba
    if (month == 2 && day > 28) {
        showError('Februárban a nap nem haladhatja meg a 28-at!');
        return false;
    }

    // A többi hónap (30 vagy 31 napos) ellenőrzése
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) {
        showError('A hónapnak 30 napja van!');
        return false;
    }

    hideError();
    return true;
}

// Kezdési idő validálása
function isStartTimeValid(start) {
    const MIN_START_TIME = '08:00'; // A legkorábbi kezdési idő
    if (start < MIN_START_TIME) {
        showError('A kezdési idő nem lehet korábban, mint 8:00!');
        return false;
    }
    hideError();
    return true;
}

// Befejezési idő validálása
function isTimeValid(start, end) {
    if (end <= start) {
        showError('A befejezési idő későbbi kell legyen, mint a kezdési idő.');
        return false;
    }
    hideError();
    return true;
}

// Hibaüzenet megjelenítése
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Hibaüzenet eltüntetése
function hideError() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.classList.add('hidden');
}

// Bejegyzés mentése localStorage-ba
function saveEntry(entry) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('

