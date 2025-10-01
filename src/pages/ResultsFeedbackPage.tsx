import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3,
  Download,
  Clock,
  RotateCcw,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Star,
  Eye,
  MessageSquare,
  RefreshCcw
} from 'lucide-react';

interface SessionMetrics {
  cvrArrivals: number;
  apaReorderings: number;
  misalignAfterCvrApaCount: number;
  realignAfterCvrApaCount: number;
  switchCountTotal: number;
  avgDecisionTime: number;
  decisionTimes: number[];
  valueConsistencyIndex: number;
  performanceComposite: number;
  balanceIndex: number;
  finalAlignmentByScenario: boolean[];
  valueOrderTrajectories: Array<{scenarioId: number, values: string[]}>;
  scenarioDetails: Array<{
    scenarioId: number;
    finalChoice: string;
    aligned: boolean;
    switches: number;
    timeSeconds: number;
    cvrVisited: boolean;
    apaReordered: boolean;
  }>;
}

interface FeedbackData {
  decisionSatisfaction: number;
  processSatisfaction: number;
  perceivedTransparency: number;
  notesFreeText: string;
}

const ResultsFeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<SessionMetrics | null>(null);
  const [feedback, setFeedback] = useState<FeedbackData>({
    decisionSatisfaction: 4,
    processSatisfaction: 4,
    perceivedTransparency: 4,
    notesFreeText: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    calculateMetrics();
  }, []);

  const calculateMetrics = () => {
    try {
      // Get all required data from localStorage
      const simulationOutcomes = JSON.parse(localStorage.getItem('simulationScenarioOutcomes') || '[]');
      const finalMetrics = JSON.parse(localStorage.getItem('finalSimulationMetrics') || 'null');
      const matchedValues = JSON.parse(localStorage.getItem('finalValues') || '[]');
      const moralValuesReorder = localStorage.getItem('MoralValuesReorderList');
      const sessionLogs = JSON.parse(localStorage.getItem('sessionEventLogs') || '[]');

      if (!simulationOutcomes.length || !finalMetrics) {
        console.error('Missing required data for metrics calculation');
        return;
      }

      // Calculate CVR arrivals (times user entered CVR screens)
      const cvrArrivals = sessionLogs.filter((log: any) => log.event === 'cvr_opened').length;

      // Calculate APA reorderings (times user reordered values)
      const apaReorderings = sessionLogs.filter((log: any) => log.event === 'apa_reordered').length;

      // Calculate decision times (mock data for now - would come from actual timing)
      const decisionTimes = simulationOutcomes.map(() => Math.random() * 120 + 30); // 30-150 seconds
      const avgDecisionTime = decisionTimes.reduce((a, b) => a + b, 0) / decisionTimes.length;

      // Calculate alignment for each scenario
      const currentMatchedValues = matchedValues.map((v: any) => v.name.toLowerCase());
      const finalAlignmentByScenario = simulationOutcomes.map((outcome: any) => {
        const optionValue = outcome.decision.label.toLowerCase();
        return currentMatchedValues.includes(optionValue);
      });

      // Calculate value consistency index
      const alignedCount = finalAlignmentByScenario.filter(Boolean).length;
      const valueConsistencyIndex = alignedCount / finalAlignmentByScenario.length;

      // Calculate performance composite (normalized z-score of objectives)
      const performanceComposite = calculatePerformanceComposite(finalMetrics);

      // Calculate balance index (1 - variance of normalized objectives)
      const balanceIndex = calculateBalanceIndex(finalMetrics);

      // Mock switch counts and alignment changes (would come from actual tracking)
      const switchCountTotal = Math.floor(Math.random() * 10) + 2;
      const misalignAfterCvrApaCount = Math.floor(Math.random() * 3);
      const realignAfterCvrApaCount = Math.floor(Math.random() * 2);

      // Create scenario details
      const scenarioDetails = simulationOutcomes.map((outcome: any, index: number) => ({
        scenarioId: outcome.scenarioId,
        finalChoice: outcome.decision.title,
        aligned: finalAlignmentByScenario[index],
        switches: Math.floor(Math.random() * 3),
        timeSeconds: Math.round(decisionTimes[index]),
        cvrVisited: Math.random() > 0.5,
        apaReordered: Math.random() > 0.7
      }));

      // Create value order trajectories
      const valueOrderTrajectories = simulationOutcomes.map((outcome: any) => ({
        scenarioId: outcome.scenarioId,
        values: currentMatchedValues
      }));

      const calculatedMetrics: SessionMetrics = {
        cvrArrivals,
        apaReorderings,
        misalignAfterCvrApaCount,
        realignAfterCvrApaCount,
        switchCountTotal,
        avgDecisionTime,
        decisionTimes,
        valueConsistencyIndex,
        performanceComposite,
        balanceIndex,
        finalAlignmentByScenario,
        valueOrderTrajectories,
        scenarioDetails
      };

      setMetrics(calculatedMetrics);
    } catch (error) {
      console.error('Error calculating metrics:', error);
    }
  };

  const calculatePerformanceComposite = (finalMetrics: any): number => {
    // Normalize each metric (0-1 scale) and calculate z-score average
    const normalized = {
      livesSaved: finalMetrics.livesSaved / 20000, // Assume max 20k lives
      casualties: 1 - (finalMetrics.humanCasualties / 1000), // Reverse scale, max 1k casualties
      firefightingResource: finalMetrics.firefightingResource / 100,
      infrastructureCondition: finalMetrics.infrastructureCondition / 100,
      biodiversityCondition: finalMetrics.biodiversityCondition / 100,
      propertiesCondition: finalMetrics.propertiesCondition / 100,
      nuclearPowerStation: finalMetrics.nuclearPowerStation / 100
    };

    const values = Object.values(normalized);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    return Math.round(mean * 100) / 100;
  };

  const calculateBalanceIndex = (finalMetrics: any): number => {
    const normalized = [
      finalMetrics.livesSaved / 20000,
      1 - (finalMetrics.humanCasualties / 1000),
      finalMetrics.firefightingResource / 100,
      finalMetrics.infrastructureCondition / 100,
      finalMetrics.biodiversityCondition / 100,
      finalMetrics.propertiesCondition / 100,
      finalMetrics.nuclearPowerStation / 100
    ];

    const mean = normalized.reduce((a, b) => a + b, 0) / normalized.length;
    const variance = normalized.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / normalized.length;
    return Math.round((1 - variance) * 100) / 100;
  };

  const handleSliderChange = (key: keyof FeedbackData, value: number) => {
    setFeedback(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmitFeedback = () => {
    if (!metrics) return;

    const finalResults = {
      ...metrics,
      ...feedback,
      submittedAt: new Date().toISOString()
    };

    // Store results
    localStorage.setItem('sessionResults', JSON.stringify(finalResults));
    
    // Emit telemetry event
    const telemetryEvent = {
      event: 'feedback_submitted',
      timestamp: new Date().toISOString(),
      data: finalResults
    };
    
    const existingLogs = JSON.parse(localStorage.getItem('sessionEventLogs') || '[]');
    existingLogs.push(telemetryEvent);
    localStorage.setItem('sessionEventLogs', JSON.stringify(existingLogs));

    setIsSubmitted(true);
    setShowExport(true);
  };

  const handleExportData = (format: 'json' | 'csv') => {
    if (!metrics) return;

    const exportData = {
      ...metrics,
      ...feedback,
      exportedAt: new Date().toISOString()
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `simulation-results-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Convert to CSV format
      const csvData = convertToCSV(exportData);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `simulation-results-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const convertToCSV = (data: any): string => {
    const headers = Object.keys(data).filter(key => typeof data[key] !== 'object');
    const values = headers.map(header => data[header]);
    return [headers.join(','), values.join(',')].join('\n');
  };

  const handleRestart = () => {
    const demographics = localStorage.getItem('userDemographics');
    localStorage.clear();
    if (demographics) {
      localStorage.setItem('userDemographics', demographics);
    }
    navigate('/demographics');
  };

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating session metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Results & Feedback
              </h1>
            </div>
            <div className="flex gap-3">
              {showExport && (
                <>
                  <button
                    onClick={() => handleExportData('json')}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Download size={16} className="mr-2" />
                    Download JSON
                  </button>
                  <button
                    onClick={() => handleExportData('csv')}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Download size={16} className="mr-2" />
                    Download CSV
                  </button>
                </>
              )}
              <button
                onClick={handleRestart}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <RefreshCcw size={16} className="mr-2" />
                New Session
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">CVR Arrivals</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.cvrArrivals}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <RotateCcw className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">APA Reorderings</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.apaReorderings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Switches</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.switchCountTotal}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Decision Time</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(metrics.avgDecisionTime)}s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alignment Changes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Post-CVR/APA Alignment Changes</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-sm text-gray-600">Misalignment Switches</span>
                </div>
                <span className="font-bold text-red-600">{metrics.misalignAfterCvrApaCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">Realignment Switches</span>
                </div>
                <span className="font-bold text-green-600">{metrics.realignAfterCvrApaCount}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Indices</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Value Consistency Index</span>
                <span className="font-bold text-blue-600">{(metrics.valueConsistencyIndex * 100).toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Performance Composite</span>
                <span className="font-bold text-green-600">{metrics.performanceComposite.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Balance Index</span>
                <span className="font-bold text-purple-600">{metrics.balanceIndex.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Details Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Scenario Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scenario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Choice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aligned?</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Switches</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time (s)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CVR Visited?</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">APA Reordered?</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {metrics.scenarioDetails.map((scenario, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Scenario {scenario.scenarioId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {scenario.finalChoice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {scenario.aligned ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {scenario.switches}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {scenario.timeSeconds}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {scenario.cvrVisited ? (
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {scenario.apaReordered ? (
                        <CheckCircle2 className="h-5 w-5 text-purple-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feedback Sliders */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Your Feedback</h3>
          
          <div className="space-y-8">
            {/* Decision Satisfaction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Decision Satisfaction
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">1</span>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={feedback.decisionSatisfaction}
                  onChange={(e) => handleSliderChange('decisionSatisfaction', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-sm text-gray-500">7</span>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{feedback.decisionSatisfaction}</span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Very Dissatisfied</span>
                <span>Very Satisfied</span>
              </div>
            </div>

            {/* Process Satisfaction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Process Satisfaction
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">1</span>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={feedback.processSatisfaction}
                  onChange={(e) => handleSliderChange('processSatisfaction', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-sm text-gray-500">7</span>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">{feedback.processSatisfaction}</span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Very Poor Process</span>
                <span>Excellent Process</span>
              </div>
            </div>

            {/* Perceived Transparency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Perceived Transparency
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">1</span>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={feedback.perceivedTransparency}
                  onChange={(e) => handleSliderChange('perceivedTransparency', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-sm text-gray-500">7</span>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-600">{feedback.perceivedTransparency}</span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Not Transparent</span>
                <span>Very Transparent</span>
              </div>
            </div>

            {/* Free Text Feedback */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments (Optional)
              </label>
              <textarea
                value={feedback.notesFreeText}
                onChange={(e) => setFeedback(prev => ({ ...prev, notesFreeText: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share any additional thoughts about your experience..."
              />
            </div>
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmitFeedback}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Star size={20} className="mr-2" />
              Submit Feedback
            </button>
          ) : (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-800 font-medium">Feedback submitted successfully!</span>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default ResultsFeedbackPage;