
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import AssessmentCard from './AssessmentCard';
import Button from '../../ui/Button';
import { Heart, Calendar, ChevronRight } from 'lucide-react';

const Stage3_OptimizeManagement: React.FC = () => {
  const { navigateTo } = useNavigation();
  return (
    <div>
        <AssessmentCard title="Optimize Management" icon={<Heart />}>
        <div className="space-y-4">
            <h4 className="font-semibold text-lg text-slate-800">Key Optimization Steps:</h4>
            <ul className="space-y-3 text-sm text-slate-700 list-disc list-inside">
            <li>Confirm and correct inhaler technique with a physical demonstration.</li>
            <li>Address adherence barriers (e.g., cost, complexity, side effect concerns, beliefs).</li>
            <li>Provide a written asthma action plan and ensure it is understood.</li>
            <li>Consider ICS-formoterol MART if available and appropriate to simplify the regimen.</li>
            <li>Actively treat identified comorbidities (e.g., CRSwNP, GERD, OSA).</li>
            <li>Address modifiable risk factors (e.g., smoking cessation, allergen avoidance).</li>
            <li>Consider non-pharmacological interventions (e.g., physical activity, weight loss).</li>
            <li>Ensure a trial of high-dose ICS-LABA for 3-6 months if not already used.</li>
            </ul>
        </div>
        </AssessmentCard>
        <div className="mt-6 p-4 rounded-lg border border-sky-200 bg-sky-50">
            <div className="flex items-start">
                <Calendar className="text-sky-600 mr-3 mt-1 flex-shrink-0" size={24}/>
                <div>
                    <h4 className="font-semibold text-sky-800">Allow Time for Interventions</h4>
                    <p className="text-sm text-sky-700 mt-1">
                        The interventions listed above should be implemented. Schedule a follow-up appointment in <strong>3-6 months</strong> to assess the patient's response to this optimized management.
                    </p>
                </div>
            </div>
             <div className="mt-6 border-t border-sky-300 pt-4">
                 <Button 
                    onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_4')}
                    fullWidth
                    size="lg"
                    variant="primary"
                    rightIcon={<ChevronRight />}
                 >
                    Proceed to Review Response (after 3-6 months)
                </Button>
            </div>
        </div>
    </div>
  );
};

export default Stage3_OptimizeManagement;