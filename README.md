# Analysis of movies in TMDB

This repository contains Python code for analysis of movies data in TMDB


## Movies Notebook

We aimed to use the TMDB dataset to understand successful movies' top characteristics.

-	Based on our word cloud analysis (Figures 1, 2, and 3), movies tend to include primarily positive and neutral wording in their overview, tagline, and title. For instance, words like love, friend, family, and life can be seen at the top of frequency. However, in the same graphs, we still see some negative words, although in less frequency, such as die, fear, and dead. Additionally, we did not see a huge difference when comparing these results with those for movies with high popularity (Figures 1A, 2A, and 3A).

- Additionally, based on word frequency for textual columns, the most popular genres are drama, comedy, thriller, action, adventure, and romance (Figure 6).

- Furthermore, the most frequent combinations (n-grams) of words we found for the textual data (Figure 8, Figure 9) are New York, High School, One Day, Young Woman, New York City, World War II, Must Find Way, and Base True Story.

- Even though plotting Budget and Revenue vs Popularity shows a slight positive correlation between them (Figure 10), this correlation is not evident in the correlation matrix (Figure 12). Considering that the numerical columns had many outliers when the plots were created, it would be required to repeat the plots after removing outliers (step 7).

- LDA topic modeling successfully created different groups of movies based on textual data (Ida_visualization_overview.html). It gave us some words that are distinctive for various groups, which shows us the potential to create a new movie's taxonomy different from the traditional genres. On the other hand, k-means gave us clusters that were highly influenced by the genres.


## Prerequisites

Before you can use this code, you'll need the following:

- Python 3.x installed on your machine.

Please, install the libraries below in your development environment.

- pip install seaborn
- pip install scipy
- pip install numpy
- pip install pandas
- pip install matplotlib
- pip install requests
- pip install nltk
- pip install wordcloud
- pip install -U scikit-learn
- pip install pydantic-settings
- pip install ydata-profiling
- pip install --upgrade gensim
- pip install pyldavis

## Getting Started

Before running this code, you will need to add your API key in the designated code lines. If you're unsure how to do this, don't worry—I've included comments in each line of the code to help you understand where to insert your API key.

## Future Work

- It would be essential to repeat the visualizations after removing outliers to have a solid understanding of the relation between the features.

- We could train a supervised machine learning model using popularity as the target variable. After having a model that performs well with the data, we could proceed with the feature importance analysis to conclude on those variables that influence the most the popularity results.

- As we discovered in this work the potential to group the movies based on textual features, we could add the groups to a new categorical column for training a supervised ML model.


