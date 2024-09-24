import nltk
nltk.download('punkt')
nltk.download('stopwords')
text = "The iris is a genus of flowering plants with showy flowers.  They are commonly called \"iris\" after the Greek goddess Iris, a messenger of the gods, as it was thought that the flowers' colors resembled the rainbow.  Irises are native to temperate regions of the Northern Hemisphere, and some species are cultivated worldwide as ornamental plants.  There are many species and varieties of iris, including the bearded iris, the Japanese iris, and the Siberian iris.  The flowers of irises are often used in gardens, bouquets, and floral arrangements." 
sentences = nltk.sent_tokenize(text)
print("Sentences:")
for sentence in sentences:
    print(sentence)
words = nltk.word_tokenize(text)
stop_words = nltk.corpus.stopwords.words('english')
filtered_words = [word for word in words if word.lower() not in stop_words]
print("\nFiltered words:")
print(filtered_words)
fdist = nltk.FreqDist(filtered_words)
print("\nMost frequent words:")
for word, frequency in fdist.most_common(5):
    print(f"{word}: {frequency}")