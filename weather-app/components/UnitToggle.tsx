import React from 'react';

interface UnitToggleProps {
  unit: 'C' | 'F';
  onUnitChange: (unit: 'C' | 'F') => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onUnitChange }) => {
  const activeClasses = 'bg-white text-blue-800 font-bold';
  const inactiveClasses = 'bg-white/20 text-white hover:bg-white/30';

  return (
    <div className="flex rounded-lg p-1 bg-black/20" role="radiogroup">
      <button
        onClick={() => onUnitChange('C')}
        className={`px-3 py-1 rounded-md text-sm transition ${unit === 'C' ? activeClasses : inactiveClasses}`}
        aria-checked={unit === 'C'}
        role="radio"
        aria-label="Set temperature to Celsius"
      >
        °C
      </button>
      <button
        onClick={() => onUnitChange('F')}
        className={`px-3 py-1 rounded-md text-sm transition ${unit === 'F' ? activeClasses : inactiveClasses}`}
        aria-checked={unit === 'F'}
        role="radio"
        aria-label="Set temperature to Fahrenheit"
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
