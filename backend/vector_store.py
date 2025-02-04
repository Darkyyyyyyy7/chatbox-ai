import chromadb

client = chromadb.PersistentClient(path="chroma_db")

def store_data(url: str, content: str):
    """Stores scraped content into vector database."""
    collection = client.get_or_create_collection(name="scraped_data")
    collection.add(documents=[content], ids=[url])

def retrieve_data(query: str) -> str:
    """Retrieves relevant content from vector DB based on query."""
    collection = client.get_collection(name="scraped_data")
    results = collection.query(query_texts=[query], n_results=1)
    return results["documents"][0] if results["documents"] else "No relevant data found."
