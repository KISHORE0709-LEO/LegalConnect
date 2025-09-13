import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Star, MessageCircle, Video, Calendar as CalendarIcon, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const LawyerConnect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedLawyer, setSelectedLawyer] = useState<number | null>(null);

  const lawyers = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Contract Law",
      rating: 4.9,
      reviews: 127,
      experience: "15+ years",
      price: "₹2,500/hour",
      avatar: "/placeholder.svg",
      availability: "Available Today"
    },
    {
      id: 2,
      name: "Adv. Rajesh Kumar",
      specialization: "Employment Law",
      rating: 4.8,
      reviews: 89,
      experience: "12+ years", 
      price: "₹2,000/hour",
      avatar: "/placeholder.svg",
      availability: "Available Tomorrow"
    },
    {
      id: 3,
      name: "Ms. Anitha Reddy",
      specialization: "Property Law",
      rating: 4.7,
      reviews: 156,
      experience: "10+ years",
      price: "₹1,800/hour",
      avatar: "/placeholder.svg",
      availability: "Available This Week"
    }
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  const handleChat = (lawyerId: number) => {
    toast({ title: "Chat Started", description: `Starting secure chat with ${lawyers.find(l => l.id === lawyerId)?.name}` });
  };

  const handleVideoCall = (lawyerId: number) => {
    toast({ title: "Video Call", description: `Initiating video call with ${lawyers.find(l => l.id === lawyerId)?.name}` });
  };

  const handleBooking = (lawyerId: number, timeSlot: string) => {
    toast({ 
      title: "Appointment Booked", 
      description: `Appointment with ${lawyers.find(l => l.id === lawyerId)?.name} at ${timeSlot}` 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-legal-secondary/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-legal-primary to-legal-primary-dark bg-clip-text text-transparent">
              Lawyer Connect
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lawyer Profiles */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid gap-6">
              {lawyers.map((lawyer) => (
                <Card key={lawyer.id} className="bg-gradient-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
                          <AvatarFallback>{lawyer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                          <Badge variant="secondary" className="mb-2">{lawyer.specialization}</Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{lawyer.rating} ({lawyer.reviews} reviews)</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{lawyer.experience} experience</p>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-2 justify-between items-start">
                          <div>
                            <p className="text-lg font-semibold text-legal-primary">{lawyer.price}</p>
                            <p className="text-sm text-green-600">{lawyer.availability}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleChat(lawyer.id)}
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Chat
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleVideoCall(lawyer.id)}
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Video Call
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-gradient-primary"
                              onClick={() => setSelectedLawyer(lawyer.id)}
                            >
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              Book
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Calendar & Booking */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-legal-primary" />
                  Schedule Appointment
                </CardTitle>
                <CardDescription>
                  {selectedLawyer ? 
                    `Booking with ${lawyers.find(l => l.id === selectedLawyer)?.name}` : 
                    "Select a lawyer to book appointment"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border pointer-events-auto"
                />

                {selectedDate && selectedLawyer && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Available Time Slots</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <Button 
                          key={slot} 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBooking(selectedLawyer, slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold">Total:</span>
                        <span className="text-lg font-bold text-legal-primary">
                          {lawyers.find(l => l.id === selectedLawyer)?.price}
                        </span>
                      </div>
                      <Button className="w-full bg-gradient-primary">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Proceed to Payment
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};