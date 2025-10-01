import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleUser as UserCircle, ArrowRight, Flame, Shield, Users, Zap } from 'lucide-react';

const DemographicPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    id: ''
  });
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Clear all localStorage data when demographics page loads to ensure fresh start
    localStorage.clear();
    
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.id.trim()) {
      setError('Please fill in all fields');
      return;
    }

    localStorage.setItem('userDemographics', JSON.stringify(formData));
    navigate('/explicitvaluepage');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-red-100/20 to-orange-100/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Flame className="absolute top-20 left-20 text-orange-300/40 animate-bounce" size={32} style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <Shield className="absolute top-32 right-32 text-red-300/40 animate-bounce" size={28} style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <Users className="absolute bottom-32 left-32 text-yellow-300/40 animate-bounce" size={30} style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
        <Zap className="absolute bottom-20 right-20 text-orange-300/40 animate-bounce" size={26} style={{ animationDelay: '0.5s', animationDuration: '4.5s' }} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className={`sm:mx-auto sm:w-full sm:max-w-md transition-all duration-1000 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-full shadow-2xl">
                <UserCircle className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent mb-4">
              Wildfire Crisis Simulation
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-lg mx-auto">
              Experience ethical decision-making in crisis scenarios. Your choices will help us understand how values influence critical decisions.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className={`grid grid-cols-2 gap-4 mb-8 transition-all duration-1000 delay-300 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
              <Flame className="h-6 w-6 text-orange-500 mb-2" />
              <h3 className="font-semibold text-gray-800 text-sm">Crisis Management</h3>
              <p className="text-xs text-gray-600">Real-world scenarios</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
              <Shield className="h-6 w-6 text-red-500 mb-2" />
              <h3 className="font-semibold text-gray-800 text-sm">Ethical Decisions</h3>
              <p className="text-xs text-gray-600">Value-based choices</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
              <Users className="h-6 w-6 text-yellow-500 mb-2" />
              <h3 className="font-semibold text-gray-800 text-sm">Impact Analysis</h3>
              <p className="text-xs text-gray-600">See consequences</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
              <Zap className="h-6 w-6 text-orange-500 mb-2" />
              <h3 className="font-semibold text-gray-800 text-sm">Expert Insights</h3>
              <p className="text-xs text-gray-600">Professional analysis</p>
            </div>
          </div>
        </div>

        <div className={`sm:mx-auto sm:w-full sm:max-w-md transition-all duration-1000 delay-500 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-white/80 backdrop-blur-lg py-8 px-6 shadow-2xl sm:rounded-2xl border border-white/50">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 transition-opacity duration-200 pointer-events-none focus-within:opacity-100"></div>
                </div>
              </div>

              <div>
                <label htmlFor="id" className="block text-sm font-semibold text-gray-700 mb-2">
                  Participant ID
                </label>
                <div className="relative">
                  <input
                    id="id"
                    name="id"
                    type="text"
                    required
                    value={formData.id}
                    onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                    className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm"
                    placeholder="Enter your participant ID"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 transition-opacity duration-200 pointer-events-none focus-within:opacity-100"></div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 animate-shake">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-200"></span>
                  <span className="relative flex items-center">
                    Begin Assessment
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Your responses will be used for research purposes only
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className={`mt-8 text-center transition-all duration-1000 delay-700 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/50">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Step 1 of 4</span>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default DemographicPage;