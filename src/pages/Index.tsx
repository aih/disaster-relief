
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Settings, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">FEMA Disaster Relief System</h1>
              <p className="text-blue-200">Federal Emergency Management Agency</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Disaster Relief Management Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamlined tools for disaster response configuration and survivor assistance applications
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* FEMA Staff Interface */}
            <Card className="flex flex-col hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <Settings className="h-6 w-6" />
                  <span>FEMA Staff Dashboard</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Configure disaster parameters and manage assistance programs
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 mb-6 flex-1">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">Establish eligibility criteria & program guidance</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">Adjust disaster criteria with minimal operational impact</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">Automated policy change implementation</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/staff-dashboard')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  Access Staff Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Survivor Application Interface */}
            <Card className="flex flex-col hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
              <CardHeader className="bg-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <Users className="h-6 w-6" />
                  <span>Apply for Assistance</span>
                </CardTitle>
                <CardDescription className="text-green-100">
                  Submit your disaster assistance application
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 mb-6 flex-1">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">Mobile-friendly application across all channels</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">Real-time guidance and error prevention</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">Progress saving and status updates</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/apply')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                >
                  Start Application
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">System Features</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Secure & Compliant</h4>
              <p className="text-gray-600 text-sm">Government-grade security with full accessibility compliance</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Multi-Channel Support</h4>
              <p className="text-gray-600 text-sm">Online, phone, SMS, mail, and in-person application options</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Settings className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Real-Time Updates</h4>
              <p className="text-gray-600 text-sm">Instant status updates and automated policy adjustments</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            Federal Emergency Management Agency • U.S. Department of Homeland Security
          </p>
          <p className="text-gray-400 text-sm mt-2">
            For technical support, contact your system administrator
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
