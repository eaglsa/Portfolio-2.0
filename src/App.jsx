import React, { useState } from 'react';
import Navigation from './components/Navigation';
import IndividualView from './components/views/IndividualView';
import DeveloperView from './components/views/DeveloperView';
import DesignerView from './components/views/DesignerView';
import PersonaCurtain from './components/shared/PersonaCurtain';
// 1. Import our integrated site initialization loader component
import InitialLoader from './components/shared/InitialLoader';

export default function App() {
  // 2. LIFECYCLE MANAGEMENT STATES
  const [siteInitialized, setSiteInitialized] = useState(false);  // True when user completes landing loader
  const [activePersona, setActivePersona] = useState('individual'); // Active presenter view tracking
  const [pendingPersona, setPendingPersona] = useState(null);       // Buffered switcher target
  const [isChanging, setIsChanging] = useState(false);               // Control inline component curtains

  // 3. MID-SESSION SWITCH HANDLER
  const handlePersonaSwitch = (newPersona) => {
    if (newPersona === activePersona) return;
    setPendingPersona(newPersona);
    setIsChanging(true); 
  };

  const handleCurtainComplete = () => {
    setActivePersona(pendingPersona);
    setPendingPersona(null);
    setIsChanging(false); 
  };

  const getThemeClass = () => {
    switch (activePersona) {
      case 'developer': return 'theme-developer bg-black';
      case 'designer':  return 'theme-designer bg-[#fcfbf7]';
      case 'individual':
      default:          return 'theme-individual bg-black';
    }
  };

  // 4. PRE-FLIGHT RENDER OVERRIDE BLOCK
  // If the landing loop hasn't run out yet, keep layout trees completely unmounted
  if (!siteInitialized) {
    return <InitialLoader onLoadingComplete={() => setSiteInitialized(true)} />;
  }

  return (
    <div className={`min-h-screen relative w-full transition-colors duration-500 ${getThemeClass()}`}>
      
      {/* Absolute top center persistent switcher */}
      <Navigation activePersona={activePersona} setActivePersona={handlePersonaSwitch} />

      {/* Main Presentation Stage */}
      <main className="container mx-auto px-6 pt-32 pb-16 max-w-6xl">
        {activePersona === 'individual' && <IndividualView />}
        {activePersona === 'developer'  && <DeveloperView />}
        {activePersona === 'designer'   && <DesignerView />}
      </main>

      {/* Dynamic Mid-Session Navigation Overlay */}
      {isChanging && (
        <PersonaCurtain 
          targetPersona={pendingPersona} 
          onComplete={handleCurtainComplete} 
        />
      )}

    </div>
  );
}