import nltk
nltk.download('punkt')
nltk.download('stopwords')
text = "Kangaroos are large marsupials native to Australia. They are known for their powerful hind legs and their ability to hop at great speeds. Kangaroos are herbivores and primarily feed on grasses and other vegetation. These social animals live in groups called \"mobs.\"  They play a vital role in the Australian ecosystem, helping to disperse seeds and control vegetation.  Kangaroos are facing threats from habitat loss, drought, and predation by introduced species like foxes and feral cats." 
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