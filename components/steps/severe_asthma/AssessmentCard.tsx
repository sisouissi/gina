import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface AssessmentCardProps {
    title: string;
    icon: React.ReactElement;
    children: React.ReactNode;
    status?: 'positive' | 'negative' | 'warning' | null;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({ title, icon, children, status = null }) => {
    const clonedIcon = React.cloneElement(icon as React.ReactElement<any>, {
        className: `mr-3 text-sky-600 ${(icon.props as { className?: string }).className || ''}`.trim(),
        size: 24,
    });

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-slate-200">
            <div className="flex items-center mb-4">
                {clonedIcon}
                <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                {status && (
                <div className="ml-auto">
                    {status === 'positive' && <CheckCircle className="text-green-500" size={20} />}
                    {status === 'negative' && <XCircle className="text-red-500" size={20} />}
                    {status === 'warning' && <AlertTriangle className="text-yellow-500" size={20} />}
                </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default AssessmentCard;