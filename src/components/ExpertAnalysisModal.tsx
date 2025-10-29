import React from 'react';
import { X } from 'lucide-react';
import { DecisionOption } from '../types';

interface ExpertAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: DecisionOption;
  onKeepChoice: () => void;
  onReviewAlternatives: () => void;
  isAligned: boolean;
  hasExploredAlternatives: boolean;
}

const ExpertAnalysisModal: React.FC<ExpertAnalysisModalProps> = ({
  isOpen,
  onClose,
  option,
  onKeepChoice,
  onReviewAlternatives,
  isAligned,
  hasExploredAlternatives
}) => {
  React.useEffect(() => {
    if (isOpen && hasExploredAlternatives) {
      setTimeout(() => {
        onKeepChoice();
      }, 100);
    }
  }, [isOpen, hasExploredAlternatives, onKeepChoice]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">{option.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-center">
            <button
              onClick={onKeepChoice}
              disabled={!hasExploredAlternatives}
              className={`px-8 py-4 rounded-lg transition-all duration-200 font-semibold text-lg shadow-lg ${
                hasExploredAlternatives
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
              }`}
              title={!hasExploredAlternatives ? "Review alternatives to enable this option" : ""}
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