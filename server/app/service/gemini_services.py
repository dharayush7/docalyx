import json
from app.module.gemini import client, client_json


def get_generated_title(context: str):
    response = client.generate_content(f"""
            You are power full ai agent how undestand the context and generate the title for the document the context will provided by reading a document. You have to first understand the context(context is first 4 chunks of document) and analyze it and generate the title for the document. The title should be 5 words long. The title is used to be named the chat to the ai agent about the document. The title should be able to represent the chat in a way that it can be used to search for the chat. 
            
            context - {context}                   
    """)
    return response.text.replace("*", "")


def understand_query(query: str):
    response = client_json.generate_content(f"""
        You are a powerfull AI assistant that helps to understand user query. User can ask any thing. You filltaded out the information by analyzing the query. You are generate two things. One is query and another instration. In user query they provide this in a single string. You have to seperate out the orginal query and the instration the user provide.
        
        Output:
                {{"query": "The orginal query", "instraction": "The instaction user provide"}}

        Rules:
                - Maintain the output format strictly
                - properly Analyze the user query 
                - Query and Instaction must be valid and short
        
        Eaxmple:
                1. Tell me about nodejs in 300 words.
                
                output: {{
                        "query": "Tell me about the node js",
                        "instraction": "In 300 words"
                }}
                
                2. What is pip in python? Can you descriped it in short with code example.
                
                output: {{
                        "query": "What is pip in python",
                        "instraction": "in shrot and code example"
                }}
        
        User query: {query}
    """)
    return json.loads(response.text)


def get_summary(context: str):
    response = client.generate_content(f"""
        You are a powerful AI assistant that summarizes the context provided of a conversation between user and AI. You have to understand the conversation flow and provide a concise summary. Summary should include all the key points and information from the conversation. Summary should be helpful to understand the conversation at a glance. Summary should be at least 5 sentences but not more than 10 sentences.
        
        Input type: 
         - user: The user query and instruction provided by the user and the context provided by the system
         - assistant: The previous responses and analysis from the AI
        
        Rules:
        - Provide a concise and accurate summary
        - Focus on the main points and key information
        - Keep it within 5-10 sentences
        
        Context: {context}
    """)
    return response.text
