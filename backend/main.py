from fastapi import FastAPI
from pydantic import BaseModel
from chatbot import chatbot_response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend access
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str

@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    try:
        response = chatbot_response(request.query)
        return {"response": response}  # ✅ Ensure response is always in a valid format
    except Exception as e:
        return {"response": f"Error: {str(e)}"}  # ✅ Prevents frontend from crashing
