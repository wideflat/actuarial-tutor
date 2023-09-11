# About Actuarial Tutor
[Actuarial Tutor](https://actuarial-tutor.streamlit.app/) is a chatbot powered by ChatGPT API and LangChain that answers user questions in chat format about actuarial-related documents such as Actuarial Standards of Practice (ASOP). Moreover, if text-to-speech is turned on, the response will be spoken!
This app is an entry for the [2023 CAS Hacktuary Challenge](https://www.casact.org/article/2023-cas-hacktuary-challenge-hack-back).

When you have a question about regulations related to actuarial work, you would have to read through very long documents to find the answer or search around by keywords to find the relevant part of what you want to know.

This app can meet such needs, provide a summary of the content without having to bother reading long documents, or by searching and compiling answers to questions. Furthermore, it can answer to a variety of complex requests like summarizing the document in 20 words or explain the content to 10-year-old.
This repository holds the code behind the app, Actuarial Tutor. It is an entry for the 2023 CAS Hacktuary Challenge. 

Examples:
<p align="center">
  <kbd>
<img align="center" src="https://github.com/wideflat/actuarial-tutor/blob/main/images/image1.png">
  </kbd>
</p>

<p align="center">
  <kbd>
<img align="center" src="https://github.com/wideflat/actuarial-tutor/blob/main/images/image2.png">
  </kbd>
</p>


## Potential Expansion
Although this app deals with actuarial-related documents, it could be extended to other job areas, and the efficiency and time-saving effects of doing so would be tremendous.

Claims adjusters:
Extract necessary information from the large volume of documents handled in damage assessment (accident conditions, injury conditions) and answer questions from damage assessors in a chat format.

Underwriters
Search for necessary information from reports from government agencies and other sources on various risks, such as natural disaster risk and theft risk, for properties being considered for underwriting.


## How To Use
* First, configure the various settings on the left side of the screen, and check the box “Activate Chat”
  * ChatGPT temperature
    * Low temperature: more focused, coherent output
    * High temperature: highly creative and diverse output
  * Activate text-to-speech – check the box if you want to get an audio response
  * Material – choose the material that you want to ask a question about
* Next, type in your question on the bottom of the screen and enter. That’s it!
<p align="center">
  <kbd>
<img align="center" src="https://github.com/wideflat/actuarial-tutor/blob/main/images/image3.png">
  </kbd>
</p>


## How It Works
The process is divided in two steps. The first step is to store the document information as Embeddings in the cloud. The second step is a question and answering.

#### 1.	Preparation
<p align="center">
  <kbd>
<img align="center" src="https://github.com/wideflat/actuarial-tutor/blob/main/images/image4.png">
  </kbd>
</p>
<p align="center">
(Image source: https://zenn.dev/ml_bear/books/d1f060a3f166a5/viewer/e1085f)  
</p>

  1.	Extracting text from pdf files
  2.	Split text into chunks in LangChain
  3.	Convert chunks of text into Embeddings with OpenAI Embeddings API
  4.	Store Embeddings in Qdrant Vectorstore in the cloud database (Qdrant)


#### 2.	Question and Answering
 <p align="center">
  <kbd>
<img align="center" src="https://github.com/wideflat/actuarial-tutor/blob/main/images/image5.png">
  </kbd>
</p>
<p align="center">
(Image source: https://zenn.dev/ml_bear/books/d1f060a3f166a5/viewer/e1085f)  
</p>

  1.	User writes a question (Query) to the app hosted by Streamlit
  2.	Streamlit passes the question to LangChain
  3.	Question is passed to OpenAI Embeddings API
  4.	Embedded questions are returned.
  5.	Search for similar documents (chunks) from the vector DB based on the Embeddings obtained in 4.
  6.	Similar documents are returned from the vector DB.
  7.	Create a Prompt by assigning the content obtained in step 6 to the Prompt
  8.	Throw the Prompt to ChatGPT API and ask a question
  9.	ChatGPT API returns an answer
  10.	Display the answer in the app


## Reference
I referred to the content of the following webpage to create the app. I’m deeply grateful to ML_Bear([@MLBear2](https://twitter.com/MLBear2)) for publishing such a useful content!

URL: [https://zenn.dev/ml_bear/books/d1f060a3f166a5](https://zenn.dev/ml_bear/books/d1f060a3f166a5)


## Disclaimer
It is a very small, but every time a question is fed, it costs me with ChatGPT API. I am currently paying for this myself, but after a certain period of time, I plan to maintain the app in a way that users enter their own API Key.


## ...END
