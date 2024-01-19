import streamlit as st
import pickle 
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import string

ps= PorterStemmer()

def transform_text(text):
    text = text.lower()
    tokens = nltk.word_tokenize(text)
    
    # Remove non-alphanumeric tokens
    alphanumeric_tokens = [token for token in tokens if token.isalnum()]
    
    # Remove stopwords and punctuation
    filtered_tokens = [token for token in alphanumeric_tokens if token not in stopwords.words('english') and token not in string.punctuation]
    
    # Apply stemming
    ps = PorterStemmer()
    stemmed_tokens = [ps.stem(token) for token in filtered_tokens]
    
    return " ".join(stemmed_tokens)


tf= pickle.load(open('vectorizer.pkl','rb'))
model= pickle.load(open('model.pkl','rb'))

st.title("Email/SMS Spam Classifier")

input_sms= st.text_input("Enter the text here")

if st.button("Predict"):
    transformed_sms= transform_text(input_sms)
    vector_input= tf.transform([transformed_sms])
    result= model.predict(vector_input)[0]
    if result==1:
        st.header("This is a Spam")
    else:
        st.header("This is not a Spam")