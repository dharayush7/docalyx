from app.module.gemini import client


def get_generated_title(context: str):
    response = client.generate_content(f"""
            You are power full ai agent how undestand the context and generate the title for the document the context will provided by reading a document. You have to first understand the context(context is first 4 chunks of document) and analyze it and generate the title for the document. The title should be 5 words long. The title is used to be named the chat to the ai agent about the document. The title should be able to represent the chat in a way that it can be used to search for the chat. 
            
            context - {context}                   
    """)
    return response.text.replace("*", "")
