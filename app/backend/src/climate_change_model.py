from joblib import load
import pandas as pd
import re

class ClimateChangeModel():

    def __init__(self) -> None:
        
        print("Initializing...")

        # Load Pipeline
        self.app_preprocessor = load('bin/preprocessor.joblib')
        self.app_features = self.app_preprocessor.get_feature_names_out()

        # Load TF-IDF
        self.tfidf = load('bin/tfidf_vectorizer.joblib')

        # Load Model
        self.app_model = load('bin/gb_clf.pkl')

        print("Models loaded...")
        
    def predict(self, input_data: pd.DataFrame) -> int:

        print("Execuring preprocessor...")
        transformed_data = self.app_preprocessor.transform(input_data)
        print("Cleaning text...")
        cleaned_text = self.clean_text(input_data)

        print("Executing TF-IDF...")
        tfidf_result = self.tfidf.transform(cleaned_text).toarray()
        tfidf_df = pd.DataFrame(tfidf_result, columns=self.tfidf.get_feature_names_out())

        print("Creating input dataframe...")
        input = pd.concat([pd.DataFrame(transformed_data), tfidf_df], axis=1)

        print("Generating prediction...")
        app_result = self.app_model.predict(input.to_numpy())

        print("Result: ", app_result[0])
        
        return app_result[0].item()

    # function to process textual data
    def clean_text(self, data, column_name='Title'):
        """
        Preprocesses text data and returns a TF-IDF matrix.
        """
        corpus = []
        for i in range(len(data)):
            print(data[column_name].iloc[i])
            text = re.sub(r'\W', ' ', str(data[column_name].iloc[i]))
            text = text.lower()
            text = re.sub(r'^br$', ' ', text)
            text = re.sub(r'\s+br\s+',' ', text)
            text = re.sub(r'\s+[a-z]\s+', ' ', text)
            text = re.sub(r'^b\s+', '', text)
            text = re.sub(r'\s+', ' ', text)
            corpus.append(text)
        return corpus
    