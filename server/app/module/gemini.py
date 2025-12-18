import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

client = genai.GenerativeModel("gemini-2.5-flash")
client_json = genai.GenerativeModel(
    "gemini-2.5-flash", generation_config=genai.GenerationConfig(response_mime_type="application/json"))
