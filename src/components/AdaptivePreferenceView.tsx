import React, { useState } from 'react';
import { ArrowLeft, MoveVertical, AlertCircle, Scale, Zap, Leaf, Shield, Ban } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DecisionOption, MainScenario } from '../types';

interface ComparisonTableProps {
  firstColumn: {
    title: string;
    selectedPreference: string;
    value: string;
    affected: number;
    risk: string;
    userChoice: string;
  };
  secondColumn: {
    title: string;
    selectedPreference: string;
    value: string;
    affected: number;
    risk: string;
    userChoice: string;
  };
}

const valueIcons: { [key: string]: JSX.Element } = {
  'Safety': <Shield size={16} className="text-red-500" />,
  'Efficiency': <Zap size={16} className="text-yellow-500" />,
  'Sustainability': <Leaf size={16} className="text-green-500" />,
  'Fairness': <Scale size={16} className="text-blue-500" />,
  'Nonmaleficence': <Ban size={16} className="text-purple-500" />
};

const ComparisonTable: React.FC<ComparisonTableProps> = ({ firstColumn, secondColumn }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Aspect</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-blue-600">Simulation Scenario</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-purple-600">CVR Scenario</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        <tr>
          <td className="px-4 py-3 text-sm font-medium text-gray-600">Scenario Title</td>
          <td className="px-4 py-3 text-sm text-gray-800">{firstColumn.title}</td>
          <td className="px-4 py-3 text-sm text-gray-800">{secondColumn.title}</td>
        </tr>
        <tr>
          <td className="px-4 py-3 text-sm font-medium text-gray-600">Selected Preference</td>
          <td className="px-4 py-3 text-sm text-gray-800">{firstColumn.selectedPreference}</td>
          <td className="px-4 py-3 text-sm text-gray-800">{secondColumn.selectedPreference}</td>
        </tr>
        <tr>
          <td className="px-4 py-3 text-sm font-medium text-gray-600">Affected Population</td>
          <td className="px-4 py-3 text-sm text-gray-800">{firstColumn.affected.toLocaleString()} residents</td>
          <td className="px-4 py-3 text-sm text-gray-800">{secondColumn.affected.toLocaleString()} residents</td>
        </tr>
        <tr>
          <td className="px-4 py-3 text-sm font-medium text-gray-600">Decision Trade-off</td>
          <td className="px-4 py-3 text-sm text-gray-800">{firstColumn.risk}</td>
          <td className="px-4 py-3 text-sm text-gray-800">{secondColumn.risk}</td>
        </tr>
        <tr>
          <td className="px-4 py-3 text-sm font-medium text-gray-600">Applied Moral Value</td>
          <td className="px-4 py-3 text-sm text-gray-800">{firstColumn.value}</td>
          <td className="px-4 py-3 text-sm text-gray-800">{secondColumn.value}</td>
        </tr>
        <tr>
          <td className="px-4 py-3 text-sm font-medium text-gray-600">User's Response</td>
          <td className={`px-4 py-3 text-sm font-medium ${
            firstColumn.userChoice === "Accepted" ? "text-green-600" : "text-red-600"
          }`}>
            {firstColumn.userChoice === "Accepted" ? "✅ Accepted" : "❌ Rejected"}
          </td>
          <td className={`px-4 py-3 text-sm font-medium ${
            secondColumn.userChoice === "Accepted" ? "text-green-600" : "text-red-600"
          }`}>
            {secondColumn.userChoice === "Accepted" ? "✅ Accepted" : "❌ Rejected"}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

interface AdaptivePreferenceViewProps {
  onBack: () => void;
  selectedOption: DecisionOption;
  mainScenario: MainScenario;
}

const AdaptivePreferenceView: React.FC<AdaptivePreferenceViewProps> = ({ 
  onBack, 
  selectedOption
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [valueOrder, setValueOrder] = useState([
    "Safety",
    "Efficiency",
    "Sustainability",
    "Fairness",
    "Nonmaleficence"
  ]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(valueOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setValueOrder(items);
  };

  const { comparsionTableCulomnContent } = selectedOption;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex-1 flex flex-col">
      <button 
        onClick={onBack}
        className="self-start mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        Back to Simulation
      </button>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Adaptive Preference Analysis
        </h2>
        
        <ComparisonTable
          firstColumn={{
            title: comparsionTableCulomnContent.firstColumnTitle,
            selectedPreference: comparsionTableCulomnContent.firstColumnSelectedPreference,
            value: comparsionTableCulomnContent.firstValue,
            affected: comparsionTableCulomnContent.firstColumnAffected,
            risk: comparsionTableCulomnContent.firstColumnRisk,
            userChoice: comparsionTableCulomnContent.firstColumnuserChoice
          }}
          secondColumn={{
            title: comparsionTableCulomnContent.secondColumnTitle,
            selectedPreference: comparsionTableCulomnContent.secondColumnSelectedPreference,
            value: comparsionTableCulomnContent.secondValue,
            affected: comparsionTableCulomnContent.secondColumnaffected,
            risk: comparsionTableCulomnContent.secondColumnRisk,
            userChoice: comparsionTableCulomnContent.secondColumnuserChoice
          }}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Value Priority Selection
        </h3>
        <p className="text-gray-600 mb-4">
          Which of the five values do you prioritize the most after reviewing both scenarios?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {valueOrder.map((value) => (
            <button
              key={value}
              onClick={() => setSelectedValue(value)}
              className={`p-3 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 ${
                selectedValue === value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700"
              }`}
            >
              {valueIcons[value]}
              <span>{value}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Rank Your Values</h3>
          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <MoveVertical size={14} />
            Drag to reorder
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="valueList">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {valueOrder.map((value, index) => (
                    <Draggable key={value} draggableId={value} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3"
                        >
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
                            {index + 1}
                          </span>
                          <div className="flex items-center gap-2">
                            {valueIcons[value]}
                            <span className="text-gray-800">{value}</span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="text-yellow-500 mt-0.5" size={16} />
            <p className="text-sm text-yellow-800">
              Your value rankings will be used to personalize future scenario recommendations and decision options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptivePreferenceView;