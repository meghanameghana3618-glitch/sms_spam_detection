# sms_spam_detection
A frontend-only SMS spam detection app using TF-IDF, Naive Bayes, and Logistic Regression, with real-time predictions, model evaluation, text analysis, visualizations, and PDF reports.
#  SMS Spam Detection

A **frontend-only machine learning web application** that detects whether an SMS message is **Spam** or **Normal** using **TF-IDF**, **Multinomial Naive Bayes**, and **Logistic Regression**.

The entire machine learning pipeline runs directly in the browser — including data preprocessing, feature extraction, model training, prediction, evaluation, visualization, and PDF report generation.

##  Features

*  **SMS Spam Detection**

  * Enter any SMS message and classify it as Spam or Normal.
  * View the predicted spam probability.

*  **Multiple Machine Learning Models**

  * Multinomial Naive Bayes
  * Logistic Regression
  * Compare model performance on the same test dataset.

*  **TF-IDF Feature Extraction**

  * Text cleaning and tokenization
  * Vocabulary generation
  * Term Frequency–Inverse Document Frequency vectorization
  * Configurable vocabulary size and minimum document frequency

*  **Classification Threshold**

  * Adjust the prediction threshold using a slider.
  * Instantly see how changing the threshold affects the Spam/Normal classification without retraining the model.

*  **Model Performance Dashboard**

  * Accuracy
  * Precision
  * Recall
  * F1 Score
  * Confusion Matrix
  * ROC-AUC

*  **Message Analysis**

  * Character count
  * Word count
  * Sentence count
  * URL count
  * Number count
  * Uppercase character count
  * Special character count
  * Average word length

*  **Vocabulary Analysis**

  * Word frequency by class
  * Spam-associated terms
  * Normal-associated terms
  * Model-derived important terms

*  **Interactive Visualizations**

  * Charts and statistical summaries powered by Recharts.

*  **PDF Reports**

  * Generate downloadable SMS spam detection reports.
  * Includes dataset statistics, model metrics, confusion matrix, prediction details, insights, and charts.

* **Privacy-Friendly Architecture**

  * No backend server
  * No external ML APIs
  * Messages entered into the detector remain in the browser and are not sent to an external service.

---

##  Machine Learning Pipeline

The application follows this workflow:

```text
SMS Dataset
     ↓
Data Cleaning
     ↓
Duplicate & Empty Row Removal
     ↓
Train/Test Split (80/20)
     ↓
Text Cleaning & Tokenization
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
       SMS Prediction
             ↓
   Spam / Normal Result
```

### Text Preprocessing

Messages are processed by:

* Converting text to lowercase
* Removing HTML and URLs
* Removing punctuation
* Tokenizing text
* Building a vocabulary from the training data

Stopword removal is intentionally not used.

### TF-IDF

The application builds its vocabulary using only the training dataset to avoid test-data leakage.

Default configuration:

* Maximum vocabulary size: **3,000 terms**
* Minimum document frequency: **2**
* Smoothed IDF calculation

### Naive Bayes

The project implements Multinomial Naive Bayes from scratch using TF-IDF-weighted features with Laplace smoothing.

### Logistic Regression

Logistic Regression is implemented from scratch using:

* Full-batch gradient descent
* 150 training epochs by default
* L2 regularization
* Sigmoid activation

No TensorFlow.js or external machine-learning framework is required.

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
│   │   ├── ReportButton.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SMSDetails.jsx
│   │   ├── SMSInput.jsx
│   │   ├── SMSTable.jsx
│   │   ├── StatCard.jsx
│   │   └── VocabularyChart.jsx
│   │
│   ├── ml/
│   │   ├── logisticRegression.js
│   │   ├── naiveBayes.js
│   │   ├── preprocessing.js
│   │   ├── modelTraining.js
│   │   └── tfidf.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── MessageAnalysis.jsx
│   │   ├── ModelPerformance.jsx
│   │   └── SMSDetector.jsx
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
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

##  Technologies Used

### Frontend

* **React 18**
* **Vite**
* **Tailwind CSS**

### Machine Learning

* TF-IDF
* Multinomial Naive Bayes
* Logistic Regression
* Gradient Descent
* L2 Regularization

### Data & Visualization

* PapaParse
* Recharts

### Report Generation

* jsPDF
* html2canvas

---

##  Dataset

The application includes an SMS dataset located at:

```text
public/data/sms_messages.csv
```

The dataset uses two columns:

```csv
label,message
```

Supported labels include:

```text
spam
ham
normal
1
0
true
false
```

Internally, messages are normalized into:

* `spam`
* `ham` (displayed as **Normal**)

Duplicate messages and empty/invalid records are removed during dataset loading.

### Using Your Own Dataset

You can replace:

```text
public/data/sms_messages.csv
```

with your own dataset, provided it contains the same:

```text
label,message
```

column structure.

---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/sms-spam-detection.git
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

Vite will display a local development URL in the terminal.

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

---

##  Application Pages

### Dashboard

Provides an overview of:

* Dataset statistics
* Spam vs Normal distribution
* Vocabulary information
* Model insights
* General dataset characteristics

### SMS Detector

Allows users to:

1. Select a machine learning model.
2. Enter an SMS message.
3. Run spam detection.
4. View spam probability.
5. Adjust the classification threshold.
6. Inspect relevant message statistics.
7. Generate a PDF report.

### Message Analysis

Provides detailed statistics about individual SMS messages and helps understand the characteristics of the text.

### Model Performance

Displays evaluation results for the trained models, including classification metrics and confusion matrices.

---

##  Evaluation Metrics

The application calculates:

| Metric           | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| Accuracy         | Overall percentage of correct predictions                            |
| Precision        | How many predicted spam messages were actually spam                  |
| Recall           | How many actual spam messages were detected                          |
| F1 Score         | Harmonic mean of precision and recall                                |
| ROC-AUC          | Ability of the model to distinguish between spam and normal messages |
| Confusion Matrix | Breakdown of correct and incorrect classifications                   |

---

##  Classification Threshold

By default, a message is classified as Spam when:

```text
Spam Probability >= 0.5
```

The application includes a threshold slider that allows the user to change this cutoff.

Changing the threshold **does not retrain the model**. It simply applies a different decision boundary to the already calculated spam probability.

This makes it easy to explore the trade-off between detecting more spam messages and reducing false positives.

---

##  Privacy

This project is designed as a browser-based application.

There is:

* ❌ No backend server
* ❌ No external machine-learning API
* ❌ No database
* ❌ No cloud inference service

The dataset, preprocessing, model training, and prediction run locally in the browser.

---

##  PDF Reports

The application can generate a PDF report containing:

* Dataset summary
* Model performance
* Classification metrics
* Confusion matrix
* Current prediction
* Message statistics
* Spam probability
* Dynamic insights
* Visualization

The raw SMS message itself is not embedded in the generated report.

---

##  Why This Project?

This project demonstrates how common machine learning techniques can be implemented **from scratch in JavaScript** and executed entirely in the browser.

It is useful for learning:

* Natural Language Processing (NLP)
* Text classification
* Feature engineering
* TF-IDF
* Naive Bayes
* Logistic Regression
* Model evaluation
* React application development
* Data visualization
* Client-side machine learning

---

## 🚧 Future Improvements

Possible future enhancements include:

* Add more machine learning algorithms
* Add model hyperparameter controls
* Add cross-validation
* Improve dataset diversity
* Add multilingual SMS classification
* Add model persistence
* Add more NLP preprocessing techniques
* Add explainable AI visualizations
* Add PWA/offline support
* Deploy the application using GitHub Pages or Vercel

---

## 👩‍💻 Author

**Your Name**

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📜 License

This project is available for educational and personal use. Add an appropriate open-source license such as MIT if you intend to distribute the project under that license.
