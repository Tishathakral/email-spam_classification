// utils/index.js
import nltk from "nltk";
import { stopwords } from "nltk.corpus";
import { PorterStemmer } from "nltk.stem";
import { string } from "nltk.tokenize";

const ps = new PorterStemmer();

export function transformText(text) {
  text = text.toLowerCase();
  const tokens = nltk.word_tokenize(text);

  // Remove non-alphanumeric tokens
  const alphanumericTokens = tokens.filter((token) => token.match(/^\w+$/));

  // Remove stopwords and punctuation
  const filteredTokens = alphanumericTokens.filter(
    (token) => !stopwords.words("english").includes(token) && !string.punctuation.includes(token)
  );

  // Apply stemming
  const stemmedTokens = filteredTokens.map((token) => ps.stem(token));

  return stemmedTokens.join(" ");
}
