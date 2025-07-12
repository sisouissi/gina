
import React from 'react';
import { User, Baby } from '../../../constants/icons';

const Section: React.FC<{ title: string; icon: React.ReactElement; children: React.ReactNode }> = ({ title, icon, children }) => {
    let clonedIcon = null;
    if (icon) {
        const iconProps: { size: number, className: string } = {
            size: 20,
            className: 'mr-2.5',
        };
        const existingClassName = (icon.props as any).className;
        if (existingClassName) {
            iconProps.className = iconProps.className + ' ' + existingClassName;
        }
        clonedIcon = React.cloneElement(icon as React.ReactElement<any>, iconProps);
    }
    
    return (
        <div>
            <h3 className="font-semibold text-slate-800 mb-2 flex items-center text-md">
                {clonedIcon}
                {title}
            </h3>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm pl-4">
                {children}
            </ul>
        </div>
    );
};

const Box13Content: React.FC = () => {
    return (
        <div className="space-y-6">
            <p className="text-sm text-slate-600">
                Consider alternative diagnoses, especially if symptoms are atypical, there is a poor response to treatment, or clinical suspicion is high for another condition. The differential varies by age.
            </p>

            <Section title="Adults, adolescents & children 6–11 years" icon={<User className="text-sky-600" />}>
                <li>Chronic upper airway cough syndrome</li>
                <li>Inducible laryngeal obstruction (ILO)</li>
                <li>Chronic obstructive pulmonary disease (COPD)</li>
                <li>Congestive heart failure</li>
                <li>Bronchiectasis</li>
                <li>Cystic fibrosis</li>
                <li>Primary ciliary dyskinesia</li>
                <li>Tumors</li>
                <li>Inhaled foreign body</li>
                <li>Pulmonary embolism</li>
                <li>Hyperventilation/dysfunctional breathing</li>
            </Section>

            <Section title="Children ≤5 years" icon={<Baby className="text-violet-600" />}>
                <li>Recurrent viral respiratory infections</li>
                <li>Gastroesophageal reflux</li>
                <li>Inhaled foreign body</li>
                <li>Tracheomalacia/bronchomalacia</li>
                <li>Congenital heart disease</li>
                <li>Cystic fibrosis</li>
                <li>Primary ciliary dyskinesia</li>
                <li>Bronchopulmonary dysplasia</li>
                <li>Tuberculosis</li>
            </Section>
        </div>
    );
};

export default Box13Content;
