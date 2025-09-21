import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourtLocatorButtonProps {
  caseType?: string;
  issueDescription?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function CourtLocatorButton({ 
  caseType, 
  issueDescription, 
  variant = 'default',
  size = 'default',
  className = ''
}: CourtLocatorButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/court-locator', {
      state: {
        caseType,
        issueDescription
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
      <Building className="h-4 w-4 mr-2" />
      Find Court/Authority
    </Button>
  );
}