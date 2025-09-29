import React from 'react';
import { X, Shield, Zap, Leaf, Scale, Ban, ThumbsUp, ThumbsDown, Users, Skull, Droplets, Building, Trees as Tree, Factory } from 'lucide-react';
import { DecisionOption } from '../types';

interface ExpertAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: DecisionOption;
  onKeepChoice: () => void;
  onReviewAlternatives: () => void;
  isAligned: boolean;
}

const ExpertAnalysisModal: React.FC<ExpertAnalysisModalProps> = ({
  isOpen,
  onClose,
  option,
  onKeepChoice,
  onReviewAlternatives,
  isAligned
}) => {
  if (!isOpen) return null;

  const getExpertIcon = (expertType: string) => {
    switch (expertType) {
      case 'safety':
        return <Shield className="text-red-500" size={16} />;
      case 'efficiency':
        return <Zap className="text-yellow-500" size={16} />;
      case 'sustainability':
        return <Leaf className="text-green-500" size={16} />;
      case 'fairness':
        return <Scale className="text-blue-500" size={16} />;
      case 'nonmaleficence':
        return <Ban className="text-purple-500" size={16} />;
      default:
        return null;
    }
  };

  const getRecommendationIcon = (recommendation: "Accept" | "Reject") => {
    return recommendation === "Accept" ? 
      <ThumbsUp className="text-green-500" size={16} /> : 
      <ThumbsDown className="text-red-500" size={16} />;
  };

  const getExpertTitle = (expertType: string) => {
    return expertType.charAt(0).toUpperCase() + expertType.slice(1) + ' Expert';
  };

  const formatImpactValue = (value: number, isLivesSaved: boolean = false, isCasualties: boolean = false) => {
    if (isLivesSaved) {
      return `+${value}`;
    }
    if (isCasualties) {
      return `+${value}`;
    }
    return `${value}%`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-gray-800">{option.title}</h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              Crisis Management
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              isAligned 
                ? 'bg-green-100 text-green-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              {isAligned ? 'Aligned' : 'Not Aligned'}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expert Recommendations */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Expert Recommendations</h4>
              <div className="space-y-4">
                {Object.entries(option.expertOpinions).map(([expertType, opinion]) => (
                  <div key={expertType} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getExpertIcon(expertType)}
                        <h5 className="font-medium text-gray-700">{getExpertTitle(expertType)}</h5>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          opinion.recommendation === "Accept" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {opinion.recommendation}
                        </span>
                        {getRecommendationIcon(opinion.recommendation)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Analysis:</span> {opinion.summary}
                    </p>
                    <p className="text-sm text-blue-900 bg-blue-50 p-2 rounded">
                      <span className="font-medium">Comparison:</span> {opinion.comparison}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Summary */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Impact Summary</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-green-600" />
                      <span className="text-sm font-medium">Lives Saved</span>
                    </div>
                    <span className="font-bold text-green-600">
                      {formatImpactValue(option.impact.livesSaved, true)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <Skull size={16} className="text-red-600" />
                      <span className="text-sm font-medium">Casualties</span>
                    </div>
                    <span className="font-bold text-red-600">
                      {formatImpactValue(option.impact.humanCasualties, false, true)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <Droplets size={16} className="text-blue-600" />
                      <span className="text-sm font-medium">Resources</span>
                    </div>
                    <span className="font-bold text-blue-600">
                      {formatImpactValue(option.impact.firefightingResource)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <Building size={16} className="text-gray-600" />
                      <span className="text-sm font-medium">Infrastructure</span>
                    </div>
                    <span className="font-bold text-gray-600">
                      {formatImpactValue(option.impact.infrastructureCondition)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <Tree size={16} className="text-green-600" />
                      <span className="text-sm font-medium">Biodiversity</span>
                    </div>
                    <span className="font-bold text-green-600">
                      {formatImpactValue(option.impact.biodiversityCondition)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <Factory size={16} className="text-purple-600" />
                      <span className="text-sm font-medium">Nuclear</span>
                    </div>
                    <span className="font-bold text-purple-600">
                      {formatImpactValue(option.impact.nuclearPowerStation)}
                    </span>
                  </div>
                </div>
                
                {/* Risk Information */}
                <div className="border-t pt-3">
                  <h5 className="font-medium text-gray-700 mb-2">Key Considerations</h5>
                  <div className="space-y-1">
                    {option.riskInfo.map((risk, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2 mt-0.5">•</span>
                        <p className="text-sm text-gray-700">{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6">
          <div className="flex justify-end gap-3">
            <button
              onClick={onReviewAlternatives}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Review Alternatives
            </button>
            <button
              onClick={onKeepChoice}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Keep My Choice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertAnalysisModal;