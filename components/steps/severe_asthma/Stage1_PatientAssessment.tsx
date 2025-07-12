import React, { useCallback, useEffect } from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import AssessmentCard from './AssessmentCard';
import Button from '../../ui/Button';
import { User, Stethoscope, Heart, Info, ChevronRight, AlertTriangle } from 'lucide-react';

const Stage1_PatientAssessment: React.FC = () => {
  const { patientData, updatePatientData } = usePatientData();
  const { navigateTo } = useNavigation();

  const updateSevereAsthmaData = useCallback((section: string, field: string, value: any) => {
    const updates = {
      ...patientData,
      severeAsthma: {
        ...patientData.severeAsthma,
        [section]: {
          ...patientData.severeAsthma[section as keyof typeof patientData.severeAsthma],
          [field]: value
        }
      }
    };
    updatePatientData(updates);
  }, [patientData, updatePatientData]);

  const { severeAsthma, severeAsthmaAssessment } = patientData;
  const { age, asthmaOnset } = severeAsthma.basicInfo;

  // Automatically set asthma onset if age islower than 18
  useEffect(() => {
    const ageNum = parseInt(age);
    if (!isNaN(ageNum) && ageNumlower than 18) {
      if (asthmaOnset !== 'childhood') {
        updateSevereAsthmaData('basicInfo', 'asthmaOnset', 'childhood');
      }
    }
  }, [age, asthmaOnset, updateSevereAsthmaData]);
  
  const isAgeUnder18 = !isNaN(parseInt(age)) && parseInt(age)lower than 18;


  return (
    <div>
      <AssessmentCard title="Patient Demographics & Clinical History" icon={<User />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Age" type="number" value={age} onChange={(e: any) => updateSevereAsthmaData('basicInfo', 'age', e.target.value)} placeholder="Age in years" />
          <SelectField 
            label="Asthma Onset" 
            value={asthmaOnset} 
            onChange={(e: any) => updateSevereAsthmaData('basicInfo', 'asthmaOnset', e.target.value)} 
            options={[{ value: 'childhood', label: 'Childhood onset (<18 years)' }, { value: 'adult', label: 'Adult onset (≥18 years)' }]} 
            disabled={isAgeUnder18}
            note={isAgeUnder18 ? 'Automatically set due to agelower than 18.' : ''}
          />
          <InputField label="Exacerbations Last Year" type="number" value={severeAsthma.basicInfo.exacerbationsLastYear} onChange={(e: any) => updateSevereAsthmaData('basicInfo', 'exacerbationsLastYear', e.target.value)} placeholder="Number requiring OCS" />
          <InputField label="Hospitalizations Last Year" type="number" value={severeAsthma.basicInfo.hospitalizationsLastYear} onChange={(e: any) => updateSevereAsthmaData('basicInfo', 'hospitalizationsLastYear', e.target.value)} placeholder="Severe exacerbations" />
          <InputField label="SABA Use (canisters/year)" type="number" value={severeAsthma.basicInfo.sabaUse} onChange={(e: any) => updateSevereAsthmaData('basicInfo', 'sabaUse', e.target.value)} placeholder="≥3/year = high risk" />
        </div>
      </AssessmentCard>

      <AssessmentCard title="Asthma Control Assessment" icon={<Stethoscope />}>
        <div className="space-y-4">
          <div className="bg-slate-50 p-3 rounded-lg">
            <h5 className="font-medium mb-2">Uncontrolled Asthma Criteria (GINA)</h5>
            <p className="text-sm text-gray-700">Check if patient has poor symptom control AND/OR frequent exacerbations:</p>
          </div>
          <div className="space-y-3">
            <Checkbox label="Poor Symptom Control: Frequent symptoms, reliever use, activity limitation, night waking" checked={severeAsthma.symptoms.poorControl} onChange={(e: any) => updateSevereAsthmaData('symptoms', 'poorControl', e.target.checked)} />
            <Checkbox label="Exacerbations: ≥2/year requiring OCS OR ≥1/year requiring hospitalization" checked={severeAsthma.symptoms.frequentExacerbations} onChange={(e: any) => updateSevereAsthmaData('symptoms', 'frequentExacerbations', e.target.checked)} />
            <Checkbox label="Night waking due to asthma" checked={severeAsthma.symptoms.nightWaking} onChange={(e: any) => updateSevereAsthmaData('symptoms', 'nightWaking', e.target.checked)} />
            <Checkbox label="Activity limitation due to asthma" checked={severeAsthma.symptoms.activityLimitation} onChange={(e: any) => updateSevereAsthmaData('symptoms', 'activityLimitation', e.target.checked)} />
            <Checkbox label="Clinically allergen-driven symptoms" checked={severeAsthma.symptoms.allergenDriven} onChange={(e: any) => updateSevereAsthmaData('symptoms', 'allergenDriven', e.target.checked)} />
          </div>
        </div>
      </AssessmentCard>

      <AssessmentCard title="Current Medications & Treatment Response" icon={<Heart />}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField label="ICS Dose" value={severeAsthma.medications.icsDose} onChange={(e: any) => updateSevereAsthmaData('medications', 'icsDose', e.target.value)} options={[{ value: 'low', label: 'Low dose' }, { value: 'medium', label: 'Medium dose' }, { value: 'high', label: 'High dose' }]} />
            <SelectField label="Inhaler Technique" value={severeAsthma.medications.inhalerTechnique} onChange={(e: any) => updateSevereAsthmaData('medications', 'inhalerTechnique', e.target.value)} options={[{ value: 'correct', label: 'Correct technique' }, { value: 'incorrect', label: 'Incorrect (up to 80% patients)' }, { value: 'unknown', label: 'Not assessed' }]} />
          </div>
          <Checkbox label="Currently on ICS-LABA combination" checked={severeAsthma.medications.icsLaba} onChange={(e: any) => updateSevereAsthmaData('medications', 'icsLaba', e.target.checked)} />
          <Checkbox label="Maintenance oral corticosteroids (OCS)" checked={severeAsthma.medications.maintenanceOcs} onChange={(e: any) => updateSevereAsthmaData('medications', 'maintenanceOcs', e.target.checked)} />
          <SelectField label="Medication Adherence" value={severeAsthma.medications.adherence} onChange={(e: any) => updateSevereAsthmaData('medications', 'adherence', e.target.value)} options={[{ value: 'good', label: 'Good adherence (>80%)' }, { value: 'suboptimal', label: 'Suboptimal adherence (50-80%)' }, { value: 'poor', label: 'Poor adherence (<50%)' }]} note="Up to 75% of asthma patients have suboptimal adherence" />
        </div>
      </AssessmentCard>
      
      <div className="mt-6 p-4 rounded-lg border border-slate-200 bg-slate-50">
        <div className="flex items-start">
          <Info className="text-sky-600 mr-3 mt-1" size={20} />
          <div>
            <h4 className="font-semibold text-sky-800 mb-2">Live Assessment Results</h4>
            <div className="space-y-2 text-sm">
              <p className={severeAsthmaAssessment.difficultToTreat ? "text-orange-700 font-medium" : "text-green-700"}>
                <strong>Difficult-to-treat asthma:</strong> {severeAsthmaAssessment.difficultToTreat ? "Yes" : "No"}
              </p>
              <p className={severeAsthmaAssessment.severeAsthma ? "text-red-700 font-medium" : "text-green-700"}>
                <strong>Severe asthma:</strong> {severeAsthmaAssessment.severeAsthma ? "Likely" : "No"}
              </p>
            </div>
          </div>
        </div>

        {(severeAsthmaAssessment.difficultToTreat || severeAsthmaAssessment.severeAsthma) && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md">
            <div className="flex items-center">
              <AlertTriangle size={20} className="text-red-600 mr-3" />
              <h4 className="font-semibold text-red-800">Refer to specialist</h4>
            </div>
            <p className="text-sm text-red-700 mt-1 pl-8">
              Referral for expert advice is recommended at any stage for difficult-to-treat or severe asthma.
            </p>
          </div>
        )}

        <div className="mt-6 border-t border-slate-300 pt-4">
           <Button 
            onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_2')}
            fullWidth
            size="lg"
            variant="primary"
            rightIcon={<ChevronRight />}
           >
            Confirm Assessment & Assess Risk Factors
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper sub-components for form fields
const InputField: React.FC<any> = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <input className="w-full p-2 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500" {...props} />
  </div>
);

const SelectField: React.FC<any> = ({ label, options, note, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
    <select className="w-full p-2 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500 bg-white disabled:bg-slate-100 disabled:text-slate-500" {...props}>
      {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
    {note && <p className="text-xs text-gray-600 mt-1">{note}</p>}
  </div>
);

const Checkbox: React.FC<any> = ({ label, ...props }) => (
   <label className="flex items-center cursor-pointer text-sm mb-2">
    <input type="checkbox" className="mr-2 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" {...props} />
    {label}
  </label>
);

export default Stage1_PatientAssessment;