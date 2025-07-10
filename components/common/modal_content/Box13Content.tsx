

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
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm pl-8">
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

            <Section title="Adults, Adolescents & Children 6-11" icon={<User className="text-sky-600" />}>
                <li>Chronic obstructive pulmonary disease (COPD)</li>
                <li>Vocal cord dysfunction (VCD) / Inducible laryngeal obstruction</li>
                <li>Gastroesophageal reflux disease (GERD) with aspiration</li>
                <li>Heart failure</li>
                <li>Chronic rhinosinusitis / Post-nasal drip</li>
                <li>Cystic fibrosis (milder forms)</li>
                <li>Bronchiectasis</li>
                <li>Anxiety/panic attacks with hyperventilation</li>
            </Section>

            <Section title="Children ≤5 years" icon={<Baby className="text-violet-600" />}>
                <li>Recurrent viral respiratory infections (e.g., viral bronchiolitis)</li>
                <li>Inhaled foreign body</li>
                <li>Congenital airway abnormalities (e.g., tracheomalacia)</li>
                <li>Gastroesophageal reflux (GER)</li>
                <li>Cystic fibrosis</li>
                <li>Primary ciliary dyskinesia</li>
                <li>Immune deficiency</li>
            </Section>
        </div>
    );
};

export default Box13Content;
