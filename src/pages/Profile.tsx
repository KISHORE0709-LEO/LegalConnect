import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { User, FileText, Clock, Shield, Settings, Mail, Calendar, Award, Users, Building } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">You are not logged in.</p>
              <Button onClick={() => window.location.href = '/login'}>Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Extract username from email
  const username = user.email.split('@')[0];
  const joinDate = new Date().toLocaleDateString(); // Mock join date

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-legal">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{username}</h1>
                  <p className="text-muted-foreground mb-2">{user.email}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {joinDate}
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Award className="h-3 w-3 mr-1" />
                      Active User
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Documents Analyzed */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Documents Analyzed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-1">12</div>
                <p className="text-sm text-muted-foreground">Total documents processed</p>
              </CardContent>
            </Card>

            {/* Time Saved */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  Time Saved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-1">8.5</div>
                <p className="text-sm text-muted-foreground">Hours of legal research</p>
              </CardContent>
            </Card>

            {/* Risk Alerts */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  Risk Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600 mb-1">3</div>
                <p className="text-sm text-muted-foreground">High-risk clauses detected</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Building className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium">Found Housing Court for rental dispute</p>
                    <p className="text-sm text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div className="flex-1">
                    <p className="font-medium">Connected with Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">30 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">Rental Agreement Analyzed</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <p className="font-medium">Risk Alert: High deposit fee</p>
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <span>Email Notifications</span>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-600" />
                    <span>Risk Alerts</span>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <span>Document History</span>
                  </div>
                  <Badge variant="secondary">Private</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
