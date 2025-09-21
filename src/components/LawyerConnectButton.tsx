import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LawyerConnectButtonProps {
  documentType?: string;
  riskDetected?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function LawyerConnectButton({ 
  documentType, 
  riskDetected, 
  variant = 'default',
  size = 'default',
  className = ''
}: LawyerConnectButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/lawyer-connect', {
      state: {
        documentType,
        riskDetected
      }
    });
  };

  return (
    <Button 
      onClick={handleClick} 
      variant={variant} 
      size={size}
      className={className}
    >
      <Users className="h-4 w-4 mr-2" />
      Connect to a Lawyer
    </Button>
  );
}