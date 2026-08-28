import React, { useState, useEffect } from 'react';
import { calculateNICUDosing, CalculationOutput, DRUG_REGISTRY } from './engine/dosing_engine';
import { Activity, FileText, AlertTriangle, Info, AlertCircle, Search, Baby, Droplets, Syringe } from 'lucide-react';

// Robust local storage hook for persistence
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("localStorage error", error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn("localStorage error", error);
    }
  };

  return [storedValue, setValue] as const;
}

function DrugSearchBox({ value, onChange, registry }: { value: string, onChange: (id: string) => void, registry: typeof DRUG_REGISTRY }) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drug = registry.find(d => d.id === value);
    if (drug && !isOpen) {
      setSearch(drug.name);
    }
  }, [value, registry, isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        const drug = registry.find(d => d.id === value);
        if (drug) setSearch(drug.name);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value, registry]);

  const filtered = registry.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input 
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search drug..."
          className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 pr-9 font-sans text-base bg-white text-sky-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-sm"
        />
        <Search className="w-5 h-5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
      </div>
      
      {isOpen && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filtered.length > 0 ? filtered.map(drug => (
            <li 
              key={drug.id}
              className="px-3.5 py-2.5 text-base font-sans text-slate-800 hover:bg-sky-50 cursor-pointer border-b last:border-b-0 border-slate-100 font-medium"
              onClick={() => {
                onChange(drug.id);
                setSearch(drug.name);
                setIsOpen(false);
              }}
            >
              {drug.name}
            </li>
          )) : (
            <li className="px-3.5 py-2.5 text-base font-sans text-slate-400 italic">No drugs found</li>
          )}
        </ul>
      )}
    </div>
  );
}

const GA_DEPENDENT_DRUGS = [
  'ampicillin', 'gentamicin', 'cefotaxime', 'ceftazidime', 'amikacin',
  'meropenem', 'imipenem', 'vancomycin', 'netilmicin', 'colistin',
  'cefepime', 'piperacillin', 'linezolid', 'metronidazole', 'acyclovir',
  'fluconazole', 'flucloxacillin', 'frusemide', 'paracetamol_iv',
  'midazolam', 'zidovudine'
];

export default function App() {
  const [currentWeightStr, setCurrentWeightStr] = useState<string>('');
  const [dayOfLifeStr, setDayOfLifeStr] = useState<string>('');
  const [ibuprofenDoseNum, setIbuprofenDoseNum] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'fluids' | 'drugs'>('fluids');

  
  const [isAsphyxia, setIsAsphyxia] = useState<boolean>(false);
  const [isPhototherapy, setIsPhototherapy] = useState<boolean>(false);
  const [isRadiantWarmer, setIsRadiantWarmer] = useState<boolean>(false);
  
  const [drugName, setDrugName] = useState<string>('');

  const [output, setOutput] = useState<CalculationOutput | null>(null);
  const [doseBreakdown, setDoseBreakdown] = useState<{label: string, dose: string, interval: string}[] | null>(null);
  const [inputWarnings, setInputWarnings] = useState<string[]>([]);

  // Safe parsing functions that handle empty strings and commas
  const parseSafeFloat = (str: string) => {
    const parsed = parseFloat(str.replace(',', '.'));
    return isNaN(parsed) ? 0 : parsed;
  };
  const parseSafeInt = (str: string) => {
    const parsed = parseInt(str, 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const currentWeight = parseSafeFloat(currentWeightStr);
  const dayOfLife = parseSafeInt(dayOfLifeStr);

  useEffect(() => {
    // 1. Calculate Input Sanity Warnings
    const warnings: string[] = [];
    if (currentWeight < 0.3 || currentWeight > 10) {
      warnings.push("CRITICAL: Current weight is outside normal neonatal physiological bounds (0.3kg - 10kg).");
    }
    
    if (dayOfLife > 28) {
      warnings.push("NOTICE: Chronological age > 28 days. Patient has technically exceeded the neonatal period.");
    }
    if (dayOfLife < 0) {
      warnings.push("CRITICAL: Day of Life cannot be negative.");
    }
    if (isAsphyxia && dayOfLife > 5) {
      warnings.push("WARNING: Asphyxia fluid restriction (-20%) is typically for the acute oliguric phase (first few days). Please ensure the infant is not in the polyuric recovery phase to avoid severe dehydration.");
    }

    setInputWarnings(warnings);

    // 2. Run Engine if data is relatively sane (prevent NaN cascades)
    try {
      // Hard block calculation if weight is completely impossible (> 15kg or < 0.2kg for a neonate)
      if (currentWeight >= 0.2 && currentWeight <= 15 && dayOfLife >= 0) {
        const baseInput = {
          birth_weight_kg: currentWeight, // default to current weight for logic gating
          current_weight_kg: currentWeight,
          day_of_life: dayOfLife,
          is_asphyxia: isAsphyxia,
          is_phototherapy: isPhototherapy,
          is_radiant_warmer: isRadiantWarmer,
          dose_number: ibuprofenDoseNum,
          drug_name: drugName
        };

        const result = calculateNICUDosing({ ...baseInput, gestational_age_weeks: 40 });
        
        if (drugName && GA_DEPENDENT_DRUGS.includes(drugName)) {
           const breakdown: any[] = [];
           let currentGroup: any = null;
           for (let ga = 24; ga <= 42; ga++) {
              const res = calculateNICUDosing({ ...baseInput, gestational_age_weeks: ga });
              const signature = `${res.drug_dose}|${res.drug_interval}`;
              if (!currentGroup) {
                 currentGroup = { startGa: ga, endGa: ga, dose: res.drug_dose, interval: res.drug_interval, signature };
              } else if (currentGroup.signature === signature) {
                 currentGroup.endGa = ga;
              } else {
                 breakdown.push(currentGroup);
                 currentGroup = { startGa: ga, endGa: ga, dose: res.drug_dose, interval: res.drug_interval, signature };
              }
           }
           if (currentGroup) breakdown.push(currentGroup);
           
           const formattedBreakdown = breakdown.map((g, i) => {
              let label = '';
              if (i === 0) label = `≤ ${g.endGa} Weeks`;
              else if (i === breakdown.length - 1) label = `≥ ${g.startGa} Weeks`;
              else label = `${g.startGa} - ${g.endGa} Weeks`;
              
              return { label, dose: g.dose, interval: g.interval };
           });
           setDoseBreakdown(formattedBreakdown);
        } else {
           setDoseBreakdown(null);
        }

        setOutput(result);
      } else {
        setOutput(null);
        setDoseBreakdown(null);
      }
    } catch (e) {
      console.error(e);
      setOutput(null);
      setDoseBreakdown(null);
    }
  }, [currentWeightStr, dayOfLifeStr, isAsphyxia, isPhototherapy, isRadiantWarmer, drugName, ibuprofenDoseNum]);

  const hourlyRate = output?.fluid_volume_ml_per_day ? (output.fluid_volume_ml_per_day / 24).toFixed(1) : '0';

  // Helper to colorize warnings
  const getWarningStyle = (text: string) => {
    if (text.includes("CRITICAL:")) return "bg-red-50 border-red-200 text-red-800";
    if (text.includes("WARNING:")) return "bg-amber-50 border-amber-200 text-amber-800";
    return "bg-blue-50 border-blue-200 text-blue-800";
  };
  const getWarningIcon = (text: string) => {
    if (text.includes("CRITICAL:")) return <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />;
    if (text.includes("WARNING:")) return <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />;
    return <Info className="w-4 h-4 text-blue-600 mt-0.5" />;
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sticky Top Header - Patient Summary */}
      <header className="bg-sky-800 text-white p-3.5 shadow-md z-10 flex-shrink-0">
        <h1 className="text-lg font-bold tracking-tight">NICU Dosing Engine</h1>
        <div className="flex gap-4 text-xs font-semibold text-sky-100 mt-1 uppercase tracking-wider">
          <span>Wt: {currentWeight > 0 ? `${currentWeight} kg` : '--'}</span>
          <span>DOL: {dayOfLife > 0 ? dayOfLife : '--'}</span>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 p-3.5 md:p-6 flex flex-col gap-3">
        
        {/* Vitals & Fluids Tab */}
        <div className={activeTab === 'fluids' ? 'flex flex-col gap-3' : 'hidden'}>
          {inputWarnings.length > 0 && (
            <div className="flex flex-col gap-2 mb-2">
              {inputWarnings.map((warn, i) => (
                <div key={i} className={`border rounded-lg p-2.5 flex items-start gap-2.5 shadow-sm ${getWarningStyle(warn)}`}>
                  {getWarningIcon(warn)}
                  <span className="text-sm font-semibold leading-snug">{warn}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3.5 grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Weight (kg)</label>
              <input 
                type="number"
                step="0.1"
                min="0"
                inputMode="decimal"
                value={currentWeightStr} 
                onChange={(e) => setCurrentWeightStr(e.target.value)}
                className="w-full border-b-2 border-sky-500 bg-sky-50 px-3 py-2.5 text-xl font-black text-center text-sky-900 focus:outline-none focus:border-sky-700 focus:bg-sky-100 transition-colors rounded-t" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Day of Life</label>
              <input 
                type="number"
                inputMode="numeric"
                value={dayOfLifeStr} 
                onChange={(e) => setDayOfLifeStr(e.target.value)}
                className="w-full border-b-2 border-slate-300 bg-slate-50 px-3 py-2.5 text-xl font-black text-center text-sky-900 focus:outline-none focus:border-sky-500 focus:bg-sky-50 transition-colors rounded-t" 
              />
            </div>
          </div>
        {/* Fluid Output Section */}
          <div className="grid grid-cols-2 gap-2.5 mb-2">
            <div className="bg-sky-50 p-3.5 rounded-xl border-l-4 border-sky-500 shadow-sm flex flex-col justify-center">
              <span className="text-xs uppercase font-bold text-sky-800 mb-1 tracking-wide">Total Daily Fluid</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                {output?.fluid_volume_ml_per_day || 0} <small className="text-base font-semibold text-slate-500">ml/day</small>
              </div>
              <div className="text-xs font-bold text-sky-700 mt-1 uppercase">
                {output?.fluid_volume_ml_per_day && currentWeight > 0 ? (output.fluid_volume_ml_per_day / currentWeight).toFixed(1) : 0} ml/kg/day
              </div>
            </div>
            <div className="bg-emerald-50 p-3.5 rounded-xl border-l-4 border-emerald-500 shadow-sm flex flex-col justify-center">
              <span className="text-xs uppercase font-bold text-emerald-800 mb-1 tracking-wide">Hourly Rate</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                {hourlyRate} <small className="text-base font-semibold text-slate-500">ml/hr</small>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200 mb-4">
             <span className="text-xs uppercase font-bold text-slate-600 mb-1 block tracking-wide">Fluid Type Suggestion</span>
             <div className="text-base font-bold text-slate-900">{output?.fluid_type || 'N/A'}</div>
          </div>

          <h2 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-1.5 border-b border-sky-100 pb-1.5">Clinical Modifiers</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              onClick={() => setIsAsphyxia(!isAsphyxia)} 
              className={`flex-1 min-w-[140px] flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all shadow-sm ${isAsphyxia ? 'bg-sky-600 border-sky-600 text-white' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'}`}
            >
              <span className="text-base font-bold">Severe Asphyxia</span>
              <span className={`text-xs font-semibold uppercase ${isAsphyxia ? 'text-sky-100' : 'text-slate-500'}`}>-20% Fluid</span>
            </button>
            <button 
              onClick={() => setIsPhototherapy(!isPhototherapy)} 
              className={`flex-1 min-w-[140px] flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all shadow-sm ${isPhototherapy ? 'bg-sky-600 border-sky-600 text-white' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'}`}
            >
              <span className="text-base font-bold">Phototherapy</span>
              <span className={`text-xs font-semibold uppercase ${isPhototherapy ? 'text-sky-100' : 'text-slate-500'}`}>+10% Fluid</span>
            </button>
            <button 
              onClick={() => setIsRadiantWarmer(!isRadiantWarmer)} 
              className={`flex-1 min-w-[140px] flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all shadow-sm ${isRadiantWarmer ? 'bg-sky-600 border-sky-600 text-white' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'}`}
            >
              <span className="text-base font-bold">Radiant Warmer</span>
              <span className={`text-xs font-semibold uppercase ${isRadiantWarmer ? 'text-sky-100' : 'text-slate-500'}`}>+20% Fluid</span>
            </button>
          </div>
          
          <div className="space-y-2 mb-2">
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 p-3 rounded-xl shadow-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-0.5">Clinical Note on Weight</div>
                <div className="text-sm text-amber-950 font-medium leading-relaxed">
                  Calculated using <strong>Current Weight</strong>. Adjust manually if birth weight is not yet regained.
                </div>
              </div>
            </div>
            
            {dayOfLife > 28 && (
              <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-200 p-3 rounded-xl shadow-sm">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-0.5">Beyond Neonatal Period</div>
                  <div className="text-sm text-blue-950 font-medium leading-relaxed">
                    Consider <strong>Holliday-Segar</strong> formula (100-50-20 rule) instead of neonatal protocols.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Drugs Tab */}
        <div className={activeTab === 'drugs' ? 'flex flex-col gap-3' : 'hidden'}>
          <div className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200 sticky top-0 z-10">
            <h2 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-2">Search Drug</h2>
            <DrugSearchBox value={drugName} onChange={setDrugName} registry={DRUG_REGISTRY} />
            
            {drugName === 'ibuprofen' && (
              <div className="mt-3 border-t pt-3">
                <label className="text-xs font-bold text-slate-700 uppercase block mb-2">Ibuprofen Dose Number</label>
                <div className="flex gap-2">
                  {[1, 2, 3].map(num => (
                    <button
                      key={num}
                      onClick={() => setIbuprofenDoseNum(num)}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg ${ibuprofenDoseNum === num ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      Dose {num}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {output?.warnings && output.warnings.length > 0 && (
            <div className="flex flex-col gap-2">
              {output.warnings.map((warn, i) => (
                <div key={i} className={`border rounded-xl p-2.5 flex items-start gap-2.5 shadow-sm ${getWarningStyle(warn)}`}>
                  {getWarningIcon(warn)}
                  <span className="text-sm font-semibold leading-snug">{warn}</span>
                </div>
              ))}
            </div>
          )}

          {output?.drug_dose ? (
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-md">
              <div className="flex justify-between items-baseline mb-3 border-b border-slate-100 pb-2.5">
                <h3 className="text-lg font-bold text-slate-900 capitalize flex items-center gap-2">
                  <Activity className="w-5 h-5 text-sky-600" />
                  {DRUG_REGISTRY.find(d => d.id === drugName)?.name || drugName}
                </h3>
                {!doseBreakdown && (
                  <span className="px-2.5 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded uppercase">
                    IV {output.drug_interval || 'PRN'}
                  </span>
                )}
              </div>
              
              {doseBreakdown ? (
                <div className="space-y-2 mb-3">
                  <div className="text-xs font-bold text-slate-600 uppercase mb-2 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-sky-600" />
                    Doses by Gestational Age
                  </div>
                  {doseBreakdown.map((bd, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-3 rounded-xl border border-slate-200 ${inputWarnings.length > 0 ? 'bg-red-50 border-red-300' : 'bg-slate-50'}`}>
                      <span className="text-base font-bold text-sky-900">{bd.label}</span>
                      <div className="text-right">
                        <div className={`text-xl font-black ${inputWarnings.length > 0 ? 'text-red-600' : 'text-slate-900'}`}>{bd.dose}</div>
                        <div className={`text-xs font-bold uppercase ${inputWarnings.length > 0 ? 'text-red-500' : 'text-sky-700'}`}>{bd.interval}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-4 rounded-xl border border-dashed mb-3 ${inputWarnings.length > 0 ? 'bg-red-50 border-red-300' : 'bg-slate-50 border-slate-300'}`}>
                  <div className={`text-5xl font-black tracking-tight ${inputWarnings.length > 0 ? 'text-red-600' : 'text-sky-900'}`}>
                    {output.drug_dose?.split(' ')[0] || 0} <span className={`text-2xl font-bold ${inputWarnings.length > 0 ? 'text-red-500' : 'text-sky-700'}`}>{output.drug_dose?.split(' ').slice(1).join(' ') || ''}</span>
                  </div>
                  <div className={`text-xs font-bold mt-2 uppercase tracking-wider ${inputWarnings.length > 0 ? 'text-red-500' : 'text-slate-500'}`}>
                    Calculated Total Dose {inputWarnings.length > 0 && "(SEE WARNINGS)"}
                  </div>
                </div>
              )}
              
              {output.drug_base_concentration && (
                <div className="space-y-3 mt-3 pt-3 border-t border-slate-100">
                  <div className="flex justify-between items-center text-sm sm:text-base border-b border-slate-100 pb-2">
                    <span className="text-slate-600 font-medium">Base Concentration</span>
                    <span className="font-mono font-bold text-slate-900 text-base">{output.drug_base_concentration}</span>
                  </div>
                  {output.drug_volume_to_draw && (
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span className="text-slate-600 font-medium">Volume to Draw</span>
                      <span className="font-mono font-black text-sky-800 text-xl">
                        {output.drug_volume_to_draw}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {output.preparation_steps && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileText className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-bold uppercase text-amber-900">Preparation & Safety</span>
                  </div>
                  <div className="text-sm text-slate-800 leading-relaxed font-medium">
                    {output.preparation_steps}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
               <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                 <Syringe className="w-7 h-7 text-slate-400" />
               </div>
               <h3 className="text-slate-700 font-bold text-base">Select a drug to calculate dose</h3>
               <p className="text-sm text-slate-500 mt-1.5 max-w-[280px]">Search from the registry above. The dose will automatically adjust to the patient's current weight.</p>
            </div>
          )}
        </div>

      </main>

      {/* Sticky Bottom Tab Bar */}
      <nav className="bg-white border-t border-slate-200 fixed bottom-0 w-full flex justify-around p-2 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-50">
        <button 
          onClick={() => setActiveTab('fluids')}
          className={`flex flex-col items-center gap-1 p-2 w-36 rounded-xl transition-all ${activeTab === 'fluids' ? 'text-sky-800 bg-sky-50 font-bold' : 'text-slate-500 hover:bg-slate-50 font-medium'}`}
        >
          <Droplets className={`w-6 h-6 ${activeTab === 'fluids' ? 'fill-sky-100 text-sky-700' : ''}`} />
          <span className="text-xs uppercase tracking-wide">Vitals & Fluids</span>
        </button>
        <button 
          onClick={() => setActiveTab('drugs')}
          className={`flex flex-col items-center gap-1 p-2 w-36 rounded-xl transition-all ${activeTab === 'drugs' ? 'text-indigo-800 bg-indigo-50 font-bold' : 'text-slate-500 hover:bg-slate-50 font-medium'}`}
        >
          <Syringe className={`w-6 h-6 ${activeTab === 'drugs' ? 'fill-indigo-100 text-indigo-700' : ''}`} />
          <span className="text-xs uppercase tracking-wide">Drugs</span>
        </button>
      </nav>
    </div>
  );
}
