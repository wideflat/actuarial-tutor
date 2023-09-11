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
from langchain.schema import (
    SystemMessage,
    HumanMessage,
    AIMessage
)
import pyttsx3 # text-to-speech library
import gtts # google text-to-speech library
from playsound import playsound # to play audio file

# import apikey

# api keys and qdrant endpoint
os.environ['OPENAI_API_KEY'] = st.secrets.openai_api_key
os.environ['QDRANT_CLOUD_ENDPOINT'] = st.secrets.qdrant_endpoint
os.environ['QDRANT_CLOUD_API_KEY'] = st.secrets.qdrant_api_key
# os.environ['OPENAI_API_KEY'] = apikey.openai_api_key
# os.environ['QDRANT_CLOUD_ENDPOINT'] = apikey.qdrant_endpoint
# os.environ['QDRANT_CLOUD_API_KEY'] = apikey.qdrant_api_key


# initialize speech recognizer and text-to-speech function
# tts = pyttsx3.init()
# voices = tts.getProperty('voices')
# tts.setProperty("voice", voices[0].id) # 0: English David, 1: English Zira, 2: Japanese Haruka

# text-to-speech function
def text_to_speech(text):
    tts = gtts.gTTS(text)

    # save the audio file
    if os.path.exists("output.mp3"):
        os.remove("output.mp3")
    tts.save("output.mp3")

    # play the audio file
    try:
        playsound('output.mp3', True)
    except:
        print("ERROR: audio file cannot be played because of an error...")


# webpage name and header
def init_page():
    st.set_page_config(
        page_title="Actuarial Tutor",
        page_icon="🤗"
    )
    st.header("Actuarial Tutor")


def select_settings():
    st.sidebar.title("Setting")

    # model
    model_name = "gpt-3.5-turbo"

    # temperatur for GPT. 0.0-2.0. The default is set at 0.0 and interval is set at 0.1
    temperature = st.sidebar.slider("ChatGPT Temperature:", min_value=0.0, max_value=2.0, value=0.0, step=0.01)

    # text-to-speech toggle
    tts_active = st.sidebar.checkbox("Activate text-to-speech", key="activate tts")

    return ChatOpenAI(temperature=temperature, model_name=model_name, streaming=True), tts_active


def select_material():
    st.sidebar.title("Material")
    material = st.sidebar.radio("Choose a material:", ("ASOP 20", "Private Flood Insurance"))
    if material == "ASOP 20":
        st.session_state.material = "6U_ASOP_20"
    elif material == "Private Flood Insurance":
        st.session_state.material = "6U_Horn_Webel_Private_Flood_Ins_and_the_National_Flood_Ins_Prog"

    return material


def init_messages():
    st.session_state.messages = [
        SystemMessage(content="You are actuarial tutor called Nami. You know actuarial subjects very well and answer questions from actuarial students who study for actuarial exams.")
    ]


def ask(qa, query):
    with get_openai_callback() as cb:
        # query / result / source_documents
        answer = qa(query)

    return answer, cb.total_cost



def main():

    init_page()
    llm, st.session_state.tts_active = select_settings()
    material = select_material()
    init_messages()
    
    st.session_state.activated = st.sidebar.checkbox("Activate Chat", key="activate")

    if not st.session_state.activated:
        st.write('Select the material and click "Activate Chat" button.')

    else:

        # messages
        messages = st.session_state.get('messages', [])
        for message in messages:
            if isinstance(message, AIMessage):
                with st.chat_message('assistant'):
                    st.markdown(message.content)
            elif isinstance(message, HumanMessage):
                with st.chat_message('user'):
                    st.markdown(message.content)

        if material:
            # establish client
            client = QdrantClient(
                url=os.environ['QDRANT_CLOUD_ENDPOINT'], 
                api_key=os.environ['QDRANT_CLOUD_API_KEY'],
            )
            qdrant = Qdrant(
                            client=client,
                            collection_name=st.session_state.material, 
                            embeddings=OpenAIEmbeddings()
                        )
            # build Q&A
            retriever = qdrant.as_retriever(
                search_type="similarity",
                search_kwargs={"k":5} # how many documents to retrieve (default: 4)
            )
            qa = RetrievalQA.from_chain_type(
                llm=llm,
                chain_type="stuff", 
                retriever=retriever,
                return_source_documents=True,
                verbose=True
            )

            # initial message
            with st.chat_message('assistant'):
                text = f"I'm your actuarial tutor Nami. Ask me a question about {material}!"
                st.markdown(text)
                # if st.session_state.tts_active:
                #     text_to_speech(text)

            # Q&A
            question = st.chat_input("Ask a question here!")
            if question:
                st.session_state.messages.append(HumanMessage(content=question))
                st.chat_message("user").markdown(question)

                with st.spinner("ChatGPT is typing ..."):
                    # st.chat_message("assistant")
                        
                    # st_callback = StreamlitCallbackHandler(st.container())
                    answer, cost = ask(qa, question)
                    st.chat_message("assistant").markdown(answer['result'])
                    st.session_state.messages.append(AIMessage(content=answer['result']))

                    if st.session_state.tts_active:
                        text_to_speech(answer['result'])



if __name__ == '__main__':
    main()