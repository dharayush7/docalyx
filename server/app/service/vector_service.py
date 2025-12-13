from langchain_qdrant import QdrantVectorStore
from langchain_core.documents import Document
from app.module import constant
from app.module import embedding_model


def create_vector_store(docs: list[Document], name: str):
    QdrantVectorStore.from_documents(
        documents=docs,
        embedding=embedding_model,
        url=constant.VECTOR_STORE_URL,
        collection_name=name
    )
