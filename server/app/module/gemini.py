import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

client = genai.GenerativeModel("gemini-2.5-flash")
