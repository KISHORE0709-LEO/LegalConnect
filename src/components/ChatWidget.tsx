import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';
import { T } from './T';
import { useNavigate } from 'react-router-dom';

export function ChatWidget() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => navigate('/ai-features')}
      className="flex items-center gap-2"
    >
      <MessageCircle className="h-4 w-4" />
      <T>AI Chat</T>
    </Button>
  );
}