import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DemographicPage from './pages/DemographicPage';
import ExplicitValuesPage from './pages/ExplicitValuesPage';
import PreferencesPage from './implicit_value_pages/PreferencesPage';
import CompletionPage from './implicit_value_pages/CompletionPage';
import ValuesPage from './implicit_value_pages/ValuesPage';
import TutorialPage from './pages/TutorialPage';
import SimulationPage from './SimulationMainPage';
import ThankYouPage from './pages/ThankYouPage';
import FeedbackPage from './pages/FeedbackPage';
import FinalAnalysisPage from './pages/FinalAnalysisPage';
import ViewResultsPage from './pages/ViewResultsPage';
import ResultsFeedbackPage from './pages/ResultsFeedbackPage';
import StudyCompletePage from './pages/StudyCompletePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/demographics" replace />} />
        <Route path="/demographics" element={<DemographicPage />} />
        <Route path="/explicitvaluepage" element={<ExplicitValuesPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/completion" element={<CompletionPage />} />
        <Route path="/values" element={<ValuesPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/simulation" element={<SimulationPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/final-analysis" element={<FinalAnalysisPage />} />
        <Route path="/view-results" element={<ViewResultsPage />} />
        <Route path="/results-feedback" element={<ResultsFeedbackPage />} />
        <Route path="/study-complete" element={<StudyCompletePage />} />
      </Routes>
    </Router>
  );
}

export default App;