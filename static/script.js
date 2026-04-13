// Funzione che interroga il server
async function richiediOraDalServer() {
    try {
        const risposta = await fetch('/ora');
        const dati = await risposta.json();
        
        const elementoOrario = document.getElementById('orario');
        elementoOrario.innerText = "Il server dice che sono le: " + dati.orario;
        
        // Un tocco di classe: cambiamo colore al testo per mostrare l'aggiornamento
        elementoOrario.style.color = "#00ff88"; 
    } catch (errore) {
        console.error("Errore di connessione:", errore);
    }
}

// Colleghiamo la funzione al click del bottone
document.getElementById('btn-ora').addEventListener('click', richiediOraDalServer);