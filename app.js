// Konstansok beállítása és inicializálása
const MIN_DATE = new Date().toISOString().split('T')[0];  // Aktuális dátum (ISO formátumban, pl. 2024-11-15)
const MIN_START_TIME = '08:00'; // A legkorábbi kezdési idő (8:00 reggel)
const entriesList = document.getElementById('entries-list');
const errorMessage = document.getElementById('error-message');

// Oldal betöltéskor futó fő inicializáló
document.addEventListener('DOMContentLoaded', () => {
    // Form beküldésének eseménykezelője
    document.getElementById('entry-form').addEventListener('submit', handleFormSubmit);
    loadEntries();  // Már létező bejegyzések betöltése
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
    entryDiv.innerHTML = 
        <p><strong>Dátum:</strong> ${entry.date}</p>
        <p><strong>Kezdés:</strong> ${entry.start}</p>
        <p><strong>Befejezés:</strong> ${entry.end}</p>
        <p><strong>Leírás:</strong> ${entry.description}</p>
        <p><strong>Címke:</strong> ${entry.category}</p>
    ;
    entriesList.appendChild(entryDiv); // Hozzáadjuk a div-hez
}

