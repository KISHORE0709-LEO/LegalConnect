import { Card, CardContent } from '@/components/ui/card';
import { Star, CheckCircle } from 'lucide-react';

export const LawyerCards = () => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <h3 className="text-2xl font-bold text-center mb-8">Meet Our Verified Legal Experts</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            name: 'Sarah Johnson',
            specialization: 'Contract Law',
            experience: 8,
            rating: 4.9,
            reviews: 127,
            availability: 'Available today'
          },
          {
            name: 'Michael Chen',
            specialization: 'Real Estate Law',
            experience: 12,
            rating: 4.8,
            reviews: 89,
            availability: 'Available now'
          },
          {
            name: 'Emily Rodriguez',
            specialization: 'Employment Law',
            experience: 6,
            rating: 4.7,
            reviews: 156,
            availability: 'Available tomorrow'
          }
        ].map((lawyer, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {lawyer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold">{lawyer.name}</h4>
                  <p className="text-sm text-blue-600">{lawyer.specialization}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{lawyer.rating} ({lawyer.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">{lawyer.availability}</span>
                </div>
                <p className="text-muted-foreground">{lawyer.experience} years experience</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
