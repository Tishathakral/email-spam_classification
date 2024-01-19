from flask import Flask, request, jsonify
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
from joblib import load
import string

app = Flask(__name__)

ps = PorterStemmer()

def transform_text(text):
    text = text.lower()
    tokens = word_tokenize(text)

    # Remove non-alphanumeric tokens
    alphanumeric_tokens = [token for token in tokens if token.isalnum()]

    # Remove stopwords and punctuation
    filtered_tokens = [token for token in alphanumeric_tokens if token not in stopwords.words('english') and token not in string.punctuation]

    # Apply stemming
    stemmed_tokens = [ps.stem(token) for token in filtered_tokens]

    return " ".join(stemmed_tokens)

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_sms = data.get('text', '')

        transformed_sms = transform_text(input_sms)
        vector_input = tf.transform([transformed_sms])
        result = model.predict(vector_input)[0]

        return jsonify({'result': 'Spam' if result == 1 else 'Not Spam'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    # Load your models
    tf = load('vectorizer.pkl')
    model = load('model.pkl')

    app.run(debug=True)
