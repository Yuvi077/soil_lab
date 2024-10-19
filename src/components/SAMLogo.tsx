import React from 'react';
import { Microscope } from 'lucide-react';

const SAMLogo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Microscope size={48} className="text-blue-600 mr-2" />
      <span className="text-2xl font-bold text-blue-600">SAM</span>
    </div>
  );
};

export default SAMLogo;