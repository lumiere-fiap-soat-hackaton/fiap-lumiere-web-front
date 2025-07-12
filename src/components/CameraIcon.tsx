
import React from 'react';

interface CameraIconProps {
  className?: string;
}

const CameraIcon: React.FC<CameraIconProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
    >
      {/* Câmera corpo principal */}
      <rect x="20" y="35" width="45" height="30" rx="2" fill="currentColor" />
      
      {/* Lentes superiores */}
      <circle cx="30" cy="25" r="8" fill="currentColor" />
      <circle cx="30" cy="25" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="45" cy="25" r="8" fill="currentColor" />
      <circle cx="45" cy="25" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Lente lateral */}
      <polygon points="65,40 78,35 78,55 65,50" fill="currentColor" />
      
      {/* Visor */}
      <rect x="25" y="40" width="15" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1" />
      
      {/* Controles */}
      <rect x="45" y="45" width="3" height="2" fill="currentColor" />
      <rect x="50" y="45" width="3" height="2" fill="currentColor" />
      
      {/* Tripé */}
      <rect x="37" y="65" width="2" height="15" fill="currentColor" />
      <polygon points="25,78 50,78 37.5,85" fill="currentColor" />
      
      {/* Pernas do tripé */}
      <line x1="32" y1="78" x2="25" y2="90" stroke="currentColor" strokeWidth="2" />
      <line x1="43" y1="78" x2="50" y2="90" stroke="currentColor" strokeWidth="2" />
      <line x1="37.5" y1="85" x2="37.5" y2="90" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

export default CameraIcon;
