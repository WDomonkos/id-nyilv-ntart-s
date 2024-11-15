// Konstansok beállítása és inicializálása
const MIN_DATE = new Date().toISOString().split('T')[0];  // Aktuális dátum (ISO formátumban, pl. 2024-11-15)
const MIN_START_TIME = '08:00'; // A legkorábbi kezdési idő (8:00 reggel)
const entriesList = document.getElementById('entries-list');
const errorMessage = document.getElementById('error-message');

document.addEventListener('DOMContentLoaded', () => {
    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');

    // Figyeljük az év mezőt
    yearInput.addEventListener('input', (event) => {
        if (event.target.value.length === 4) {
            monthInput.focus();  // Ha az év 4 karakter, akkor lépjen a hónap mezőre
        }
    });

    // Figyeljük a hónap mezőt
    monthInput.addEventListener('input', (event) => {
        if (event.target.value.length === 2) {
            dayInput.focus();  // Ha a hónap 2 karakter, akkor lépjen a nap mezőre
        }
    });
});


// Bejegyzések betöltése localStorage-ból
function loadEntries() {
    // Üres lista esetén is működjön
    entriesList.innerHTML = '';  // A lista törlése, ha újratöltjük
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    // Minden bejegyzés kiírása
    entries.forEach(entry => displayEntry(entry));
}

// Bejegyzés megjelenítése
function displayEntry(entry) {
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

    const date = document.getElementById('date').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    // Dátum és idő validálása
    if (!isDateValid(date) || !isStartTimeValid(start) || !isTimeValid(start, end)) return;

    // Új bejegyzés létrehozása és mentése
    const entry = { date, start, end, description, category };
    saveEntry(entry);
    displayEntry(entry);  // Azonnal megjelenítjük az új bejegyzést
    document.getElementById('entry-form').reset();
}

// Dátum validálása
function isDateValid(date) {
    const now = new Date().toISOString().split('T')[0];  // Aktuális dátum
    if (date < MIN_DATE || date > now) {
        showError('Érvénytelen dátum. Csak 2023 utáni dátumokat adhat meg.');
        return false;
    }
    hideError();
    return true;
}

// Kezdési idő validálása
function isStartTimeValid(start) {
    // Ha a kezdési idő korábban van, mint 8:00, akkor hiba
    if (start < MIN_START_TIME) {
        showError('A kezdési idő nem lehet korábban, mint 8:00!');
        return false;
    }
    hideError();
    return true;
}

// Befejezési idő validálása
function isTimeValid(start, end) {
    // Ha a befejezési idő nem későbbi, mint a kezdési idő, akkor hiba
    if (end <= start) {
        showError('A befejezési idő későbbi kell legyen, mint a kezdési idő.');
        return false;
    }
    hideError();
    return true;
}

// Hibaüzenet megjelenítése
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Hibaüzenet eltüntetése
function hideError() {
    errorMessage.classList.add('hidden');
}

// Bejegyzés mentése localStorage-ba
function saveEntry(entry) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
}
