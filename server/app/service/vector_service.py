from langchain_qdrant import QdrantVectorStore
from langchain_core.documents import Document
from app.module import constant
from app.module.embedding_model import embedding_model
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance


def get_qdrant_client():
    client = QdrantClient(
        url=constant.VECTOR_STORE_URL,
        api_key=constant.VECTOR_STORE_API_KEY,
        timeout=180,
        check_compatibility=False
    )
    return client


def ensure_collection(client, name: str, vector_size: int):
    client.recreate_collection(
        collection_name=name,
        vectors_config=VectorParams(
            size=vector_size,
            distance=Distance.COSINE
        )
    )


def create_vector_store(docs: list[Document], name: str):
    client = get_qdrant_client()
    vector_size = len(embedding_model.embed_query("dimension test"))
    ensure_collection(client, name, vector_size)
    vector_store = QdrantVectorStore(
        client=client,
        collection_name=name,
        embedding=embedding_model,
    )

    BATCH = 10   # safe for large PDFs / Qdrant Cloud

    for i in range(0, len(docs), BATCH):
        batch = docs[i:i+BATCH]
        vector_store.add_documents(
            batch,
            wait=False   # ⬅️ do not block on indexing
        )


def search_vector_store(query: str, name: str):
    vector_store = QdrantVectorStore.from_existing_collection(
        collection_name=name,
        embedding=embedding_model,
        url=constant.VECTOR_STORE_URL,
        api_key=constant.VECTOR_STORE_API_KEY,
    )
    return vector_store.similarity_search(query)
