import React from 'react';
import { Users, Skull, Droplets, Building, Trees as Tree, Factory, ThumbsUp, Shield, Scale, Leaf, Ban } from 'lucide-react';
import { DecisionOption as DecisionOptionType } from '../types';

interface DecisionOptionProps {
  option: DecisionOptionType;
  onSelect: (option: DecisionOptionType) => void;
}

const DecisionOption: React.FC<DecisionOptionProps> = ({ option, onSelect }) => {
  const formatImpactValue = (value: number, isLivesSaved: boolean = false, isCasualties: boolean = false) => {
    if (isLivesSaved) {
      return `+${value}`;
    }
    if (isCasualties) {
      return `+${value}`;
    }
    return `${value}%`;
  };

  const getRecommendationCount = () => {
    const recommendations = Object.values(option.expertOpinions).map(opinion => opinion.recommendation);
    const acceptCount = recommendations.filter(rec => rec === "Accept").length;
    return acceptCount;
  };

  // Map value labels to their display properties
  const valueMap = {
    safety: { name: 'Safety', icon: <Shield size={12} className="mr-1" /> },
    efficiency: { name: 'Efficiency', icon: <Droplets size={12} className="mr-1" /> },
    sustainability: { name: 'Sustainability', icon: <Leaf size={12} className="mr-1" /> },
    fairness: { name: 'Fairness', icon: <Scale size={12} className="mr-1" /> },
    nonmaleficence: { name: 'Nonmaleficence', icon: <Ban size={12} className="mr-1" /> }
  };

  const valueDisplay = valueMap[option.label as keyof typeof valueMap];

  return (
    <button
      onClick={() => onSelect(option)}
      className={`bg-white border ${
        option.isAlternative 
          ? 'border-blue-300 shadow-[0_0_0_1px_rgba(59,130,246,0.1)] bg-gradient-to-b from-blue-50/50 to-transparent hover:bg-blue-50/80' 
          : 'border-gray-300 hover:bg-gray-50'
      } text-left p-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-col h-full`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1">
          <h4 className={`font-medium ${option.isAlternative ? 'text-blue-800' : 'text-gray-800'} mb-1`}>
            {option.title}
          </h4>
          <p className="text-gray-600 text-xs">{option.description}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {option.isAlternative && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full whitespace-nowrap">
              Alternative
            </span>
          )}
          {valueDisplay && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full whitespace-nowrap flex items-center">
              {valueDisplay.icon}
              {valueDisplay.name}
            </span>
          )}
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
            <ThumbsUp size={12} className="text-green-600" />
            <span className="text-xs text-gray-700 whitespace-nowrap">
              {getRecommendationCount()}/5 recommend
            </span>
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        {option.riskInfo.map((risk, index) => (
          <div key={index} className="flex items-start mb-1">
            <span className="text-red-500 mr-1 mt-0.5">•</span>
            <p className="text-xs text-gray-700">{risk}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-1 text-xs mt-auto">
        <div className="flex items-center text-green-600">
          <Users size={12} className="mr-1" />
          <span>{formatImpactValue(option.impact.livesSaved, true)}</span>
        </div>
        <div className="flex items-center text-red-600">
          <Skull size={12} className="mr-1" />
          <span>{formatImpactValue(option.impact.humanCasualties, false, true)}</span>
        </div>
        <div className="flex items-center text-blue-600">
          <Droplets size={12} className="mr-1" />
          <span>{formatImpactValue(option.impact.firefightingResource)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Building size={12} className="mr-1" />
          <span>{formatImpactValue(option.impact.infrastructureCondition)}</span>
        </div>
        <div className="flex items-center text-green-600">
          <Tree size={12} className="mr-1" />
          <span>{formatImpactValue(option.impact.biodiversityCondition)}</span>
        </div>
        <div className="flex items-center text-blue-600">
          <Building size={12} className="mr-1" />
          <span>{formatImpactValue(option.impact.propertiesCondition)}</span>
        </div>
        <div className="flex items-center text-purple-600">
          <Factory size={12} className="mr-1" />
          <span>{formatImpactValue(option.impact.nuclearPowerStation)}</span>
        </div>
      </div>
    </button>
  );
};

export default DecisionOption;