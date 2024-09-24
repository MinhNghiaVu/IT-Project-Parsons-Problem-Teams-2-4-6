import nltk
nltk.download('punkt')
nltk.download('stopwords')
text = "The global population is growing rapidly, with significant implications for resources, environment, and infrastructure.  Population growth varies across different regions, with some countries experiencing rapid increases while others are experiencing decline.  Understanding population trends is crucial for policymakers and planners to make informed decisions about resource allocation, urban development, and social services.  Factors influencing population growth include birth rates, death rates, migration patterns, and socioeconomic conditions." 
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
