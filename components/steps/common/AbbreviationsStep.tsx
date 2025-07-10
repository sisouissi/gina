import React from 'react';
import Card from '../../ui/Card';
import { abbreviationsList } from '../../../constants/abbreviationsData';
import { BookOpen } from 'lucide-react';

const AbbreviationsStep: React.FC = () => {

  return (
    <Card 
      title="List of Abbreviations" 
      icon={<BookOpen className="text-sky-600" />}
      className="border-sky-200"
    >
      <p className="mb-6 text-sm text-slate-600">
        Here is a list of abbreviations commonly used in this guide and in the GINA recommendations.
      </p>
      
      <div className="space-y-4">
        {abbreviationsList
          .sort((a, b) => a.abbr.localeCompare(b.abbr)) // Sort alphabetically
          .map((item) => (
          <div key={item.abbr} className="p-3 bg-slate-50 rounded-md border border-slate-200">
            <p className="font-semibold text-sky-700">
              {item.abbr}: <span className="font-normal text-slate-700">{item.full}</span>
            </p>
            {item.description && (
              <p className="text-xs text-slate-500 mt-1">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AbbreviationsStep;