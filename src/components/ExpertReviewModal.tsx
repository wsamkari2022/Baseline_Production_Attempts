import React from 'react';
import { X, Shield, Zap, Leaf, Scale, Ban, ThumbsUp, ThumbsDown, Users, Skull, Droplets, Building, Trees as Tree, Factory, Eye } from 'lucide-react';
import { DecisionOption } from '../types';

interface ExpertReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: DecisionOption;
  isAligned: boolean;
  onKeepChoice: () => void;
  onReviewAlternatives: () => void;
}

const ExpertReviewModal: React.FC<ExpertReviewModalProps> = ({
  isOpen,
  onClose,
  option,
  isAligned,
  onKeepChoice,
  onReviewAlternatives
}) => {
  if (!isOpen) return null;

  const getExpertIcon = (expertType: string) => {
    switch (expertType) {
      case 'safety': return <Shield className="text-red-500" size={16} />;
      case 'efficiency': return <Zap className="text-yellow-500" size={16} />;
      case 'sustainability': return <Leaf className="text-green-500" size={16} />;
      case 'fairness': return <Scale className="text-blue-500" size={16} />;
      case 'nonmaleficence': return <Ban className="text-purple-500" size={16} />;
      default: return null;
    }
  };

  const getRecommendationIcon = (recommendation: "Accept" | "Reject") => {
    return recommendation === "Accept" ? 
      <ThumbsUp className="text-green-500" size={14} /> : 
      <ThumbsDown className="text-red-500" size={14} />;
  };

  const formatImpactValue = (value: number, isLivesSaved: boolean = false, isCasualties: boolean = false) => {
    if (isLivesSaved) return `+${value}`;
    if (isCasualties) return `+${value}`;
    return `${value}%`;
  };

  const acceptCount = Object.values(option.expertOpinions).filter(o => o.recommendation === "Accept").length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">{option.title}</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Crisis Response
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                isAligned 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {isAligned ? 'Aligned' : 'Not Aligned'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-auto">
          {/* Expert Recommendations */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Expert Recommendations</h3>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(option.expertOpinions).map(([expertType, opinion]) => (
                <div key={expertType} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getExpertIcon(expertType)}
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {expertType} Expert
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getRecommendationIcon(opinion.recommendation)}
                      <span className={`text-xs font-medium ${
                        opinion.recommendation === "Accept" ? "text-green-600" : "text-red-600"
                      }`}>
                        {opinion.recommendation}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{opinion.summary}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <span className="text-sm text-gray-600">
                {acceptCount} of 5 experts recommend this option
              </span>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Impact Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 p-3 rounded-lg flex items-center gap-2">
                <Users className="text-green-600" size={16} />
                <div>
                  <p className="text-xs text-green-600 font-medium">Lives Saved</p>
                  <p className="text-sm font-bold text-green-700">
                    {formatImpactValue(option.impact.livesSaved, true)}
                  </p>
                </div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg flex items-center gap-2">
                <Skull className="text-red-600" size={16} />
                <div>
                  <p className="text-xs text-red-600 font-medium">Casualties</p>
                  <p className="text-sm font-bold text-red-700">
                    {formatImpactValue(option.impact.humanCasualties, false, true)}
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-2">
                <Droplets className="text-blue-600" size={16} />
                <div>
                  <p className="text-xs text-blue-600 font-medium">Resources</p>
                  <p className="text-sm font-bold text-blue-700">
                    {formatImpactValue(option.impact.firefightingResource)}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                <Building className="text-gray-600" size={16} />
                <div>
                  <p className="text-xs text-gray-600 font-medium">Infrastructure</p>
                  <p className="text-sm font-bold text-gray-700">
                    {formatImpactValue(option.impact.infrastructureCondition)}
                  </p>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg flex items-center gap-2">
                <Tree className="text-green-600" size={16} />
                <div>
                  <p className="text-xs text-green-600 font-medium">Biodiversity</p>
                  <p className="text-sm font-bold text-green-700">
                    {formatImpactValue(option.impact.biodiversityCondition)}
                  </p>
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg flex items-center gap-2">
                <Factory className="text-purple-600" size={16} />
                <div>
                  <p className="text-xs text-purple-600 font-medium">Nuclear</p>
                  <p className="text-sm font-bold text-purple-700">
                    {formatImpactValue(option.impact.nuclearPowerStation)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex gap-3">
          <button
            onClick={onReviewAlternatives}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <Eye size={16} />
            Review Alternatives
          </button>
          <button
            onClick={onKeepChoice}
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Keep My Choice
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertReviewModal;