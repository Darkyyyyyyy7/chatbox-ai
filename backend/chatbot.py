import groq
from vector_store import retrieve_data

# Initialize Groq API client
client = groq.Groq(api_key="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")

def chatbot_response(user_query: str) -> str:
    """Retrieves relevant data and generates chatbot response using Groq API."""
    
    # Retrieve relevant context using vector DB
    context = retrieve_data(user_query)

    # Format the prompt
    prompt = f"Using the following context, answer the user's question:\n\nContext: {context}\n\nQ: {user_query}\nA:"

    try:
        response = client.chat.completions.create(  # ✅ Correct method
            model="mixtral-8x7b-32768",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=200
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"
