# SMS Spam Detection

Frontend-only ML app. React + Vite + Tailwind + from-scratch TF-IDF/Naive Bayes/Logistic Regression +
Recharts + PapaParse + jsPDF + html2canvas. No backend, no external APIs. Text cleaning, vocabulary
building, TF-IDF vectorization, training, evaluation, prediction, and PDF report all run in the browser
— nothing you enter into the detector is sent anywhere or stored.

Sibling project to the Spam Email Detection app, adapted for short SMS-style text: same from-scratch
TF-IDF / Naive Bayes / Logistic Regression pipeline (no TensorFlow.js needed — Logistic Regression trains
by plain gradient descent, 150 epochs in well under a second even in-browser), plus a live **classification
threshold slider** that re-labels the current prediction instantly without retraining.

## Run it

npm install
npm run dev

Open the printed local URL. First load: dataset loads, messages are cleaned and tokenized, a vocabulary
is built from the training split, TF-IDF features are computed, then both models train before the
dashboard is ready.

## Structure

- public/data/sms_messages.csv — 847 unique synthetic SMS messages (~14% spam, matching real SMS spam
  datasets' typical rate), built from parameterized template fragments, with a handful of duplicate and
  empty rows intentionally left in to exercise the cleaning step
- src/ml/preprocessing.js — text cleaning (HTML/URL stripping, lowercasing, punctuation removal — no
  stopword removal) + tokenization + train/test split
- src/ml/tfidf.js — vocabulary building (capped at 3,000 terms, min document frequency 2) and TF-IDF
  vectorization, fit on the training split only
- src/ml/naiveBayes.js — Multinomial Naive Bayes over TF-IDF-weighted features (Laplace smoothing)
- src/ml/logisticRegression.js — from-scratch gradient descent with L2 regularization
- src/utils/metrics.js — accuracy, precision, recall, F1, confusion matrix, ROC-AUC (rank-sum formula)
- src/utils/vocabulary.js — word frequency by class, and model-derived spam/normal-associated terms
- src/utils/textAnalysis.js — per-message stats (char/word/sentence/URL/number/uppercase/special-char
  counts, average word length) computed on the raw, uncleaned text
- src/pages/ — Dashboard, SMS Detector, Message Analysis, Model Performance
- src/components/ — Sidebar, Header, StatCard, ChartCard, SMSInput, PredictionResult, SMSTable,
  SMSDetails, ConfusionMatrix, ModelMetrics, VocabularyChart, ReportButton
- src/utils/reportGenerator.js — builds the downloadable PDF (jsPDF + html2canvas)

Swap in your own data by replacing public/data/sms_messages.csv, keeping the same column names (label,
message). Labels are normalized internally — spam/1/true → spam, ham/normal/0/false → ham (displayed
as "Normal").

## Detector + threshold

On the SMS Detector page, pick a model, enter a message, and click Detect Spam (disabled until the model
is ready and there's text to check). The result shows spam probability, a text-statistics breakdown, and
model-associated terms shown as analysis only. A **threshold slider** lets you move the classification
cutoff and see the Spam/Normal label update immediately — this only re-derives the label from the
already-computed probability, it never retrains the model.

## Report download

"Download Report" generates sms_spam_detection_report.pdf with the dataset summary, both models'
metrics, confusion matrix, current SMS prediction (word/char counts and probability only — no raw
message text embedded), dynamic insights, and a chart image. Blocks with the spec'd messages if the
dataset/model aren't ready or no message was entered.
