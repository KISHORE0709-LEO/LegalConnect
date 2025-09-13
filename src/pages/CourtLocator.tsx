import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, Clock, Phone, ExternalLink, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const CourtLocator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const locations = [
    {
      id: 1,
      name: "High Court of Delhi",
      type: "High Court",
      address: "Sher Shah Road, New Delhi, Delhi 110003",
      distance: "2.3 km",
      hours: "10:00 AM - 5:00 PM",
      phone: "+91-11-2338-9312",
      services: ["Civil Cases", "Criminal Cases", "Constitutional Matters"],
      coordinates: [28.6139, 77.2090]
    },
    {
      id: 2,
      name: "District Court Complex",
      type: "District Court", 
      address: "Patiala House Courts Complex, New Delhi",
      distance: "1.8 km",
      hours: "10:30 AM - 4:30 PM",
      phone: "+91-11-2331-8170",
      services: ["Civil Disputes", "Criminal Cases", "Family Court"],
      coordinates: [28.6169, 77.2197]
    },
    {
      id: 3,
      name: "Legal Aid Centre",
      type: "Legal Aid",
      address: "Near Red Fort, Chandni Chowk, Delhi",
      distance: "3.1 km", 
      hours: "9:00 AM - 6:00 PM",
      phone: "+91-11-2327-4561",
      services: ["Free Legal Advice", "Document Assistance", "Mediation"],
      coordinates: [28.6561, 77.2410]
    },
    {
      id: 4,
      name: "Registrar General Office",
      type: "Government Office",
      address: "Supreme Court of India, Tilak Marg",
      distance: "4.2 km",
      hours: "10:00 AM - 5:00 PM", 
      phone: "+91-11-2338-7387",
      services: ["Document Filing", "Case Registration", "Certified Copies"],
      coordinates: [28.6219, 77.2411]
    }
  ];

  const filteredLocations = selectedType === "all" 
    ? locations 
    : locations.filter(loc => loc.type.toLowerCase().includes(selectedType.toLowerCase()));

  const getTypeColor = (type: string) => {
    switch (type) {
      case "High Court":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "District Court":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Legal Aid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    }
  };

  const handleGetDirections = (location: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates[0]},${location.coordinates[1]}`;
    window.open(url, '_blank');
    toast({ title: "Opening Directions", description: `Getting directions to ${location.name}` });
  };

  const handleLocationClick = (location: any) => {
    setSelectedLocation(location);
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
              Court Locator
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border/50 h-[600px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-legal-primary" />
                    Legal Institutions Near You
                  </CardTitle>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="court">Courts</SelectItem>
                      <SelectItem value="legal aid">Legal Aid</SelectItem>
                      <SelectItem value="government">Government Offices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="h-full">
                {/* Mock Map with Pins */}
                <div className="relative w-full h-[450px] bg-muted rounded-lg overflow-hidden border">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
                    {/* Mock map background with pins */}
                    {filteredLocations.map((location, index) => (
                      <div
                        key={location.id}
                        className={`absolute w-8 h-8 bg-legal-primary rounded-full flex items-center justify-center text-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform ${
                          selectedLocation?.id === location.id ? 'ring-4 ring-legal-primary/50' : ''
                        }`}
                        style={{
                          left: `${20 + (index * 15)}%`,
                          top: `${30 + (index * 10)}%`
                        }}
                        onClick={() => handleLocationClick(location)}
                      >
                        <MapPin className="h-4 w-4" />
                      </div>
                    ))}
                  </div>
                  
                  {/* Location Info Popup */}
                  {selectedLocation && (
                    <div className="absolute bottom-4 left-4 right-4 bg-background border rounded-lg p-4 shadow-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{selectedLocation.name}</h3>
                        <Badge className={getTypeColor(selectedLocation.type)}>
                          {selectedLocation.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{selectedLocation.address}</p>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleGetDirections(selectedLocation)}>
                          <Navigation className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location List */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Nearby Locations</CardTitle>
                <CardDescription>
                  {filteredLocations.length} locations found
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredLocations.map((location) => (
                  <div 
                    key={location.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedLocation?.id === location.id ? 'border-legal-primary bg-legal-primary/5' : 'border-border'
                    }`}
                    onClick={() => handleLocationClick(location)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm">{location.name}</h4>
                      <Badge variant="outline" className={getTypeColor(location.type)}>
                        {location.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{location.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{location.hours}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{location.phone}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-xs font-medium mb-1">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {location.services.map((service, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetDirections(location);
                        }}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};