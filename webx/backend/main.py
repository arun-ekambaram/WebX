
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


#Allow cross-origin requests for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the WebX API"}


import json

@app.post("/submit")
async def submit_data(request: Request):
    data = await request.json()
    
    with open("data_log.json", "a") as f:
        f.write(json.dumps(data) + "\n")
    
    return {"status": "success", "received": data}
