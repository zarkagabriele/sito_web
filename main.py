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