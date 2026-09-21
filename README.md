# sms_spam_detection
A browser-based SMS spam detection app using TF-IDF, Multinomial Naive Bayes, and Logistic Regression with interactive analytics, model evaluation, and PDF reporting.
#  SMS Spam Detection

A **browser-based machine learning application** that detects whether an SMS message is **Spam** or **Normal (Ham)** using Natural Language Processing and machine learning.

The application implements the complete machine learning pipeline directly in the browser — including text preprocessing, vocabulary generation, TF-IDF feature extraction, model training, evaluation, prediction, visualization, and PDF report generation.

No backend server or external API is required.

---

##  Features

* **SMS Spam Detection**

  * Enter any SMS message and classify it as Spam or Normal.
  * Displays the predicted spam probability.

*  **Multiple Machine Learning Models**

  * Multinomial Naive Bayes
  * Logistic Regression
  * Both models are implemented from scratch in JavaScript.

*  **Text Preprocessing**

  * HTML tag removal
  * URL removal
  * Lowercase conversion
  * Punctuation removal
  * Whitespace normalization
  * Tokenization

* **TF-IDF Feature Extraction**

  * Builds vocabulary from the training data.
  * Removes rare terms.
  * Limits vocabulary to 3,000 terms for efficient browser execution.
  * Calculates TF-IDF representations for SMS messages.

  **Model Evaluation**

  * Accuracy
  * Precision
  * Recall
  * F1 Score
  * ROC-AUC
  * Confusion Matrix

*  **Interactive Dashboard**

  * Dataset statistics
  * Spam vs Normal distribution
  * Vocabulary information
  * Model metrics
  * Visual charts

*  **Message Analysis**

  * Character count
  * Word count
  * Sentence count
  * URL count
  * Number count
  * Uppercase character count
  * Special character count
  * Average word length

*  **Classification Threshold**

  * Adjust the classification threshold using a slider.
  * See how the Spam/Normal classification changes without retraining the model.

*  **PDF Report**

  * Generate a downloadable SMS Spam Detection report.
  * Includes dataset statistics, model performance, confusion matrix, prediction information, insights, and charts.

*  **Browser-Based Processing**

  * No backend
  * No external APIs
  * SMS messages entered into the detector remain in the browser.

---

##  Machine Learning Pipeline

The application follows this pipeline:

```text
SMS Dataset
     ↓
Data Cleaning
     ↓
Text Tokenization
     ↓
Train/Test Split
     ↓
Vocabulary Building
     ↓
TF-IDF Vectorization
     ↓
 ┌───────────────────────┐
 │                       │
 ▼                       ▼
Naive Bayes       Logistic Regression
 │                       │
 └───────────┬───────────┘
             ↓
      Model Evaluation
             ↓
     Spam Classification
```

### 1. Data Preprocessing

Raw SMS messages are cleaned before being used for machine learning.

The preprocessing pipeline:

```text
Raw SMS
  ↓
Remove HTML
  ↓
Remove URLs
  ↓
Convert to lowercase
  ↓
Remove punctuation
  ↓
Normalize whitespace
  ↓
Tokenization
```

Stopword removal is intentionally not used so potentially important spam-related words are retained.

---

##  TF-IDF

The project converts SMS messages into numerical feature vectors using **Term Frequency–Inverse Document Frequency (TF-IDF)**.

The vocabulary:

* Removes terms appearing in fewer than 2 documents.
* Keeps a maximum of 3,000 terms.
* Is built using only the training dataset to avoid test-data leakage.

The smoothed IDF calculation is:

```text
IDF = log(N / DF) + 1
```

where:

* `N` = number of training documents
* `DF` = number of documents containing the term

---

##  Machine Learning Models

### Multinomial Naive Bayes

The project implements Multinomial Naive Bayes using TF-IDF-weighted features.

It uses:

* Class priors
* Feature likelihoods
* Laplace smoothing
* Log-probability scoring
* Softmax conversion for spam probability

### Logistic Regression

Logistic Regression is implemented from scratch without TensorFlow.js.

Training uses:

* Full-batch gradient descent
* 150 training epochs
* L2 regularization
* Sigmoid activation
* Configurable learning rate and regularization

This keeps the application lightweight while allowing model training directly inside the browser.

---

##  Model Evaluation

The application evaluates both models on the same held-out test set.

The following metrics are calculated:

| Metric           | Description                                         |
| ---------------- | --------------------------------------------------- |
| Accuracy         | Overall percentage of correct predictions           |
| Precision        | How many predicted spam messages were actually spam |
| Recall           | How many actual spam messages were detected         |
| F1 Score         | Harmonic mean of precision and recall               |
| ROC-AUC          | Ranking-based classification performance            |
| Confusion Matrix | Breakdown of correct and incorrect predictions      |

The dataset is split deterministically using an **80/20 train-test split** with a fixed seed.

---

##  SMS Detector

The SMS Detector page allows users to:

1. Select a machine learning model.
2. Enter an SMS message.
3. Run the spam detection model.
4. View the spam probability.
5. View message statistics.
6. Adjust the classification threshold.

The threshold slider changes the final Spam/Normal label based on the already-calculated probability and **does not retrain the model**.

---

##  Message Analysis

The application also provides detailed analysis of SMS messages.

It calculates:

* Character count
* Word count
* Sentence count
* URL count
* Number count
* Uppercase character count
* Special character count
* Average word length

The application also provides vocabulary-based insights about words associated with Spam and Normal messages.

---

##  Dataset

The project includes:

```text
public/data/sms_messages.csv
```

The dataset uses two columns:

```text
label,message
```

Example:

```csv
label,message
ham,Running 16 mins late, sorry!
ham,Did Tom finish the assignment yet?
spam,"FINAL NOTICE: your prize expires today, call now."
```

The application normalizes different label formats internally.

Supported spam labels include:

```text
spam
1
true
```

Supported normal labels include:

```text
ham
normal
not spam
0
false
```

Duplicate messages and invalid/empty records are removed during dataset loading.

### Dataset statistics

The bundled CSV contains:

* **1,638 raw records**
* **1,401 Ham records**
* **237 Spam records**
* **847 valid unique messages after cleaning**

---

##  Tech Stack

### Frontend

* React 18
* Vite
* Tailwind CSS

### Machine Learning

* JavaScript
* TF-IDF
* Multinomial Naive Bayes
* Logistic Regression
* Gradient Descent
* L2 Regularization

### Data Processing

* PapaParse

### Visualization

* Recharts

### Report Generation

* jsPDF
* html2canvas

---

##  Project Structure

```text
sms-spam-detection/
│
├── public/
│   └── data/
│       └── sms_messages.csv
│
├── src/
│   ├── components/
│   │   ├── ChartCard.jsx
│   │   ├── ConfusionMatrix.jsx
│   │   ├── Header.jsx
│   │   ├── ModelMetrics.jsx
│   │   ├── PredictionResult.jsx
│   │   ├── SMSDetails.jsx
│   │   ├── SMSInput.jsx
│   │   ├── SMSTable.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   └── VocabularyChart.jsx
│   │
│   ├── ml/
│   │   ├── logisticRegression.js
│   │   ├── naiveBayes.js
│   │   ├── preprocessing.js
│   │   ├── tfidf.js
│   │   └── modelTraining.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── SMSDetector.jsx
│   │   ├── MessageAnalysis.jsx
│   │   └── ModelPerformance.jsx
│   │
│   ├── services/
│   │   └── dataset.js
│   │
│   ├── utils/
│   │   ├── insights.js
│   │   ├── metrics.js
│   │   ├── reportGenerator.js
│   │   ├── textAnalysis.js
│   │   └── vocabulary.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

---

##  Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/sms-spam-detection.git
```

### 2. Navigate to the project

```bash
cd sms-spam-detection
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Vite will display a local development URL, typically:

```text
http://localhost:5173
```

---

##  Build for Production

Create a production build with:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

##  Using Your Own Dataset

You can replace:

```text
public/data/sms_messages.csv
```

with your own SMS dataset.

The CSV must contain:

```text
label,message
```

For example:

```csv
label,message
ham,Are you coming to class today?
spam,Congratulations! You have won a prize!
```

The application automatically normalizes supported label values and removes duplicate or invalid messages.

---

##  Privacy

This application is designed to run entirely in the browser.

There is:

* No backend server
* No external machine-learning API
* No cloud prediction service

Messages entered into the detector are processed locally by the browser.

---

##  Project Goals

This project demonstrates how a complete NLP and machine-learning workflow can be implemented without a Python backend or cloud ML service.

It is particularly useful for learning:

* Natural Language Processing
* Text classification
* TF-IDF
* Naive Bayes
* Logistic Regression
* Gradient Descent
* Model evaluation
* React-based ML applications
* Browser-based machine learning

---

## Future Improvements

Possible improvements include:

* Add additional classification algorithms such as SVM and Random Forest.
* Add cross-validation.
* Experiment with n-grams.
* Add stemming or lemmatization.
* Improve dataset diversity.
* Add model comparison charts.
* Support importing custom CSV datasets through the UI.
* Add persistent model configuration.
* Deploy the application using GitHub Pages, Vercel, or Netlify.




