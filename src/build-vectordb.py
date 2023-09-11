import os
from glob import glob
import streamlit as st
from langchain.chat_models import ChatOpenAI
from langchain.llms import OpenAI
from langchain.callbacks import (
    get_openai_callback,
    StreamlitCallbackHandler
)
from PyPDF2 import PdfReader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Qdrant
from langchain.chains import RetrievalQA

from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
# import apikey

# api keys and qdrant endpoint
os.environ['OPENAI_API_KEY'] = st.secrets.openai_api_key
os.environ['QDRANT_CLOUD_ENDPOINT'] = st.secrets.qdrant_endpoint
os.environ['QDRANT_CLOUD_API_KEY'] = st.secrets.qdrant_api_key
# os.environ['OPENAI_API_KEY'] = apikey.openai_api_key
# os.environ['QDRANT_CLOUD_ENDPOINT'] = apikey.qdrant_endpoint
# os.environ['QDRANT_CLOUD_API_KEY'] = apikey.qdrant_api_key

def get_pdf_text(pdf_file):
    pdf_reader = PdfReader(pdf_file)
    text = '\n\n'.join([page.extract_text() for page in pdf_reader.pages])
    text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
        model_name="text-embedding-ada-002",
        chunk_size=250,
        chunk_overlap=0,
    )
    return text_splitter.split_text(text)



def main():

    # list all pdf files
    dir_path = 'pdf'
    pdf_files = os.listdir(dir_path)
    for pdf_file in pdf_files:
        print(f'\n--> Processing "{pdf_file}"...')

        # collection name
        collection_name = pdf_file.replace('.pdf','')

        # establish client
        client = QdrantClient(
            url=os.environ['QDRANT_CLOUD_ENDPOINT'], 
            api_key=os.environ['QDRANT_CLOUD_API_KEY'],
        )

        # extract all collection names
        collections = client.get_collections().collections
        collection_names = [collection.name for collection in collections]

        # if the collection does not exist, create one
        if collection_name not in collection_names:
            print('Collection does not exist. Creating a collection...')
            pdf_path = os.path.join('pdf',pdf_file)
            pdf_text = get_pdf_text(pdf_path)
            client.create_collection(
                collection_name=collection_name,
                vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
            )
            qdrant = Qdrant(
                            client=client,
                            collection_name=collection_name, 
                            embeddings=OpenAIEmbeddings()
                        )
            qdrant.add_texts(pdf_text)
            print('Collection created!')
        else:
            print('Collection exists')

    print('\n-->> Completed!')


if __name__ == '__main__':
    main()


