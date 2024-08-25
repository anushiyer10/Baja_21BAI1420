from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BFHLRequest(BaseModel):
    data: List[str]

@app.post("/bfhl")
async def process_bfhl_data(request: BFHLRequest):
    data = request.data
    numbers = [item for item in data if item.isdigit()]
    alphabets = [item for item in data if item.isalpha()]
    lowercase_alphabets = [char for char in alphabets if char.islower()]
    highest_lowercase = [max(lowercase_alphabets)] if lowercase_alphabets else []

    return {
        "is_success": True,
        "user_id": "john_doe_17091999",
        "email": "john@xyz.com",
        "roll_number": "ABCD123",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highest_lowercase
    }

@app.get("/bfhl")
async def get_operation_code():
    return {"operation_code": 1}
