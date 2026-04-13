from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Spieghiamo a FastAPI che i file dentro "static" sono accessibili
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")  #Endpoint
def home():
    # Restituisce direttamente il file HTML
    return FileResponse('static/index.html')

from datetime import datetime

@app.get("/ora")
def dammi_ora():
    # Restituiamo un dizionario (JSON)
    return {"orario": datetime.now().strftime("%H:%M:%S")}

    # Serve per rendere accessibili CSS e JS
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def home():
    return FileResponse('static/index.html')

@app.get("/ora")
def dammi_ora():
    return {"orario": datetime.now().strftime("%H:%M:%S")}

# NUOVO: Endpoint con parametro di query
@app.get("/saluta")
def saluta_utente(nome: str):
    return {"messaggio": f"Ciao {nome}, benvenuto nel server di Terza!"}

@app.get("/somma")
def somma(a: int, b: int):
    return {"risultato": a + b}