import nltk
nltk.download('punkt')
nltk.download('stopwords')
text = "Koalas are adorable marsupials native to Australia. They are known for their cuddly appearance and their love of eucalyptus leaves. These nocturnal creatures are highly social and live in groups called \"clans.\"  Although koalas are herbivores, they have a unique digestive system that allows them to extract nutrients from eucalyptus leaves, which are low in nutritional value. Koalas are facing threats from habitat loss, bushfires, and disease. Conservation efforts are crucial to protect these beloved animals." 
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
longest_word = max(words, key=len)
print("\nLongest word:")
print(longest_word)
porter_stemmer = nltk.PorterStemmer()
print("\nStemmed words:")
for word in filtered_words:
    print(porter_stemmer.stem(word))