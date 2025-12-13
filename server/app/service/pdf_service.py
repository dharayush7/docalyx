import tempfile
import requests
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter


def pdf_to_spilatted_docs(pdf_path: str):
    response = requests.get(pdf_path)
    response.raise_for_status()

    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
        temp_file.write(response.content)
        temp_file_path = temp_file.name

    loader = PyPDFLoader(temp_file_path)

    docs = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=10000,
        chunk_overlap=400
    )

    split_docs = text_splitter.split_documents(docs)

    return split_docs
