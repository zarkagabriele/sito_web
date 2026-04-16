// --- 1. INIZIALIZZAZIONE MAPPA ---
// Centriamo la mappa su Milano (Coordinate 45.4642, 9.1900)
var map = L.map('map').setView([45.4642, 9.1900], 12);

// Carichiamo lo sfondo della mappa da OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Gruppo di marker: ci permette di cancellare i vecchi segnalini a ogni nuova ricerca
var markersGroup = L.layerGroup().addTo(map);

// Funzione per l'ora (già vista)
async function aggiornaOra() {
    const res = await fetch('/ora');
    const json = await res.json();
    document.getElementById('orario').innerText = "Ora del server: " + json.orario;
}

// NUOVA FUNZIONE: Saluto
async function inviaSaluto() {
    // 1. Prendiamo quello che l'utente ha scritto
    const nomeUmano = document.getElementById('input-nome').value;

    if (nomeUmano === "") {
        alert("Ehi, inserisci un nome!");
        return;
    }

    // 2. Chiamiamo il server passando il nome nell'URL (?nome=...)
    const res = await fetch(`/saluta?nome=${nomeUmano}`);
    const json = await res.json();

    // 3. Mostriamo la risposta del server nella pagina
    document.getElementById('risposta-saluto').innerText = json.messaggio;
}


async function operazioni() {
    const num1 = document.getElementById('input-num1').value;
    const num2 = document.getElementById('input-num2').value;
    const op = document.querySelector('input[name="op"]:checked').value;

    if (num1 === "") {
        alert("Ehi, inserisci un il numero");
        return;
    }


    if (num2 === "") {
        alert("Ehi, inserisci un il numero");
        return;
    }


    
    const res = await fetch(`/calc?num1=${num1}&num2=${num2}&op=${op}`);
    const json = await res.json();


    document.getElementById('risposta').innerText = json.messaggio2
}



// --- 3. FUNZIONE RICERCA FONTANELLE (TABELLA + MAPPA) ---

async function cercaFontanelle() {
    const quartiere = document.getElementById('input-nil').value.trim().toUpperCase();
    if (!quartiere) return alert("Inserisci un quartiere!");

    const res = await fetch(`/cerca_fontanelle?quartiere=${quartiere}`);
    const dati = await res.json();

    const info = document.getElementById('info-risultati');
    const corpoTabella = document.getElementById('corpo-tabella');
    const tabella = document.getElementById('tabella-fontanelle');

    // Pulizia precedente
    info.innerText = dati.messaggio;
    corpoTabella.innerHTML = "";
    markersGroup.clearLayers();

    if (dati.fontanelle.length > 0) {
        tabella.style.display = "table";

        dati.fontanelle.forEach(f => {
            // 1. Aggiungi riga alla tabella
            const riga = `<tr>
                <td>${f.objectID}</td>
                <td>${f.NIL}</td>
                <td>${f.MUNICIPIO}</td>
            </tr>`;
            corpoTabella.innerHTML += riga;

            // 2. Aggiungi marker alla mappa
            // Usiamo i nomi delle colonne del CSV: LAT_Y_4326 e LONG_X_4326
            if (f.LAT_Y_4326 && f.LONG_X_4326) {
                L.marker([f.LAT_Y_4326, f.LONG_X_4326])
                 .addTo(markersGroup)
                 .bindPopup(`<b>Fontanella ID: ${f.objectID}</b><br>Quartiere: ${f.NIL}`);
            }
        });

        // Spostiamo la vista della mappa sulla prima fontanella trovata
        const prima = dati.fontanelle[0];
        map.setView([prima.LAT_Y_4326, prima.LONG_X_4326], 14);

    } else {
        tabella.style.display = "none";
    }
}




// Colleghiamo i bottoni alle funzioni
document.getElementById('btn-calc').addEventListener('click', operazioni);
document.getElementById('btn-ora').addEventListener('click', aggiornaOra);
document.getElementById('btn-saluto').addEventListener('click', inviaSaluto);
document.getElementById('btn-cerca').addEventListener('click', cercaFontanelle);