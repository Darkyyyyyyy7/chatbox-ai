import requests
from bs4 import BeautifulSoup

def scrape_website(url: str) -> str:
    """Scrapes text content from a single webpage."""
    response = requests.get(url)
    if response.status_code != 200:
        return "Failed to retrieve content."
    
    soup = BeautifulSoup(response.text, "html.parser")
    text = ' '.join(p.get_text() for p in soup.find_all('p'))
    
    return text
