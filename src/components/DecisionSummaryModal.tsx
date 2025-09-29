import React from 'react';
import { X, Check, Shield, Zap, Leaf, Scale, Ban, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';
import { DecisionOption } from '../types';

interface DecisionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: DecisionOption;
  onConfirm: () => void;
  canConfirm: boolean;
  showCVRDisabled?: boolean;
  pathType: "CVR" | "APA" | "direct";
}

const DecisionSummaryModal: React.FC<DecisionSummaryModalProps> = ({
  isOpen,
  onClose,
  option,
  onConfirm,
  canConfirm,
  showCVRDisabled = false,
  pathType
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

  const acceptingExperts = Object.entries(option.expertOpinions).filter(([, opinion]) => opinion.recommendation === "Accept");
  const rejectingExperts = Object.entries(option.expertOpinions).filter(([, opinion]) => opinion.recommendation === "Reject");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Decision Summary</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{option.title}</h3>
            <p className="text-sm text-gray-600">{option.description}</p>
          </div>

          {/* Expert Recommendations */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Expert Recommendations</h4>
            
            {acceptingExperts.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsUp className="text-green-500" size={16} />
                  <span className="text-sm font-medium text-green-700">Recommending ({acceptingExperts.length})</span>
                </div>
                <div className="flex gap-2">
                  {acceptingExperts.map(([expertType]) => (
                    <div key={expertType} className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                      {getExpertIcon(expertType)}
                      <span className="text-xs text-green-700 capitalize">{expertType}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rejectingExperts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsDown className="text-red-500" size={16} />
                  <span className="text-sm font-medium text-red-700">Not Recommending ({rejectingExperts.length})</span>
                </div>
                <div className="flex gap-2">
                  {rejectingExperts.map(([expertType]) => (
                    <div key={expertType} className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded">
                      {getExpertIcon(expertType)}
                      <span className="text-xs text-red-700 capitalize">{expertType}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Impact Summary */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Key Impacts</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {option.impact.livesSaved > 0 && (
                <li>• Lives saved: +{option.impact.livesSaved}</li>
              )}
              {option.impact.humanCasualties > 0 && (
                <li>• Human casualties: +{option.impact.humanCasualties}</li>
              )}
              {option.impact.firefightingResource !== 0 && (
                <li>• Firefighting resources: {option.impact.firefightingResource}%</li>
              )}
              {option.impact.infrastructureCondition !== 0 && (
                <li>• Infrastructure condition: {option.impact.infrastructureCondition}%</li>
              )}
              {option.impact.nuclearPowerStation !== 0 && (
                <li>• Nuclear facility: {option.impact.nuclearPowerStation}%</li>
              )}
            </ul>
          </div>

          {showCVRDisabled && (
            <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={16} />
                <p className="text-sm text-yellow-800">
                  Value reflection is locked after preference adjustment to preserve decision integrity.
                </p>
              </div>
            </div>
          )}

          {!canConfirm && (
            <div className="mb-4 bg-blue-50 border-l-4 border-blue-400 p-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-blue-500" size={16} />
                <p className="text-sm text-blue-800">
                  Review alternatives to enable confirmation.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onConfirm}
            disabled={!canConfirm}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
              canConfirm
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Check size={16} />
            Confirm Decision
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecisionSummaryModal;