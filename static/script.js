// Funzione che interroga il server
async function richiediOraDalServer() {
    try {
        const risposta = await fetch('/ora');
        const dati = await risposta.json();
        
        const elementoOrario = document.getElementById('orario');
        elementoOrario.innerText = "Il server dice che sono le: " + dati.orario;
        
        elementoOrario.style.color = "#00ff88"; 
    } catch (errore) {
        console.error("Errore di connessione:", errore);
    }
}

// Funzione alternativa per l'ora
async function aggiornaOra() {
    const res = await fetch('/ora');
    const json = await res.json();
    document.getElementById('orario').innerText = "Ora del server: " + json.orario;
}

// NUOVA FUNZIONE: Saluto
async function inviaSaluto() {
    const nomeUmano = document.getElementById('input-nome').value;

    if (nomeUmano === "") {
        alert("Ehi, inserisci un nome!");
        return;
    }

    const res = await fetch(`/saluta?nome=${nomeUmano}`);
    const json = await res.json();

    document.getElementById('risposta-saluto').innerText = json.messaggio;
}

//////////////////////////////
// ➕ NUOVA FUNZIONE SOMMA
//////////////////////////////
async function faiSomma() {
    const a = document.getElementById('num1').value;
    const b = document.getElementById('num2').value;

    if (a === "" || b === "") {
        alert("Inserisci entrambi i numeri!");
        return;
    }

    const res = await fetch(`/somma?a=${a}&b=${b}`);
    const json = await res.json();

    document.getElementById('risultato-somma').innerText =
        "Risultato: " + json.risultato;
}

//////////////////////////////
// EVENTI BOTTONI
//////////////////////////////

document.getElementById('btn-ora').addEventListener('click', aggiornaOra);
document.getElementById('btn-saluto').addEventListener('click', inviaSaluto);
document.getElementById('btn-somma').addEventListener('click', faiSomma);