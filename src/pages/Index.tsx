
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Settings, FileText, Brain, Zap, AlertTriangle, Smartphone, Lock, Copy, Code, BookOpen, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DocumentationTab from "@/components/documentation/DocumentationTab";

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
              <h1 className="text-2xl font-bold">FEMA Disaster Configuration System</h1>
              <p className="text-blue-200">Federal Emergency Management Agency</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Disaster Relief Configuration Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced tools for FEMA staff to configure disaster parameters and create automated assistance programs
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="w-full max-w-2xl">
            {/* FEMA Staff Interface */}
            <Card className="flex flex-col hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <Settings className="h-6 w-6" />
                  <span>FEMA Staff Configuration Dashboard</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Configure disaster parameters and generate automated assistance programs
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 mb-6 flex-1">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">AI-powered disaster configuration from plain language descriptions</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">Automated web form and rules engine generation</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-gray-600">Deterministic eligibility processing with human oversight</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/staff-dashboard')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  Access Configuration Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Documentation and Information Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-6xl mx-auto mb-12">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>System Overview</span>
              </TabsTrigger>
              <TabsTrigger value="documentation" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>System Architecture</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div>
                <div className="text-center mb-8">
                  <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">How Disaster Configuration Works</h3>
                  <p className="text-gray-600">From plain language policy to automated assistance programs</p>
                  
                  {/* Demo Video Link */}
                  <div className="mt-6">
                    <a 
                      href="https://app.screencast.com/pu5I7rMOHvWjU" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <Video className="h-5 w-5" />
                      <span>Watch Demo Video</span>
                    </a>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="inline-flex items-center">
                        This link opens in a new window (external site)
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Settings className="h-5 w-5 text-blue-600 mr-2" />
                      Configuration Process
                    </h4>
                    <div className="space-y-3 text-gray-600">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-medium">1. Disaster Parameters</p>
                        <p className="text-sm">Define disaster type, affected areas, dates, and applicable laws</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-medium">2. Assistance Programs</p>
                        <p className="text-sm">Configure available programs, maximum awards, and eligibility rules</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-medium">3. Special Provisions</p>
                        <p className="text-sm">Set expedited processing, inspection waivers, and validation rules</p>
                      </div>
                      <div className="border-l-4 border-orange-500 pl-4">
                        <p className="font-medium">4. Policy Generation</p>
                        <p className="text-sm">Automatically generate rules engine policy files and web application forms</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <FileText className="h-5 w-5 text-green-600 mr-2" />
                      Generated Outputs
                    </h4>
                    <div className="space-y-3 text-gray-600">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium text-green-700">Draft Web Application Form</p>
                        <p className="text-sm">Automatically generates survivor-facing application forms with appropriate fields, validation, and guidance based on disaster configuration</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium text-blue-700">Deterministic Rules Engine</p>
                        <p className="text-sm">Creates a rules-based eligibility engine that evaluates applications against configured criteria with human review for all final determinations</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium text-purple-700">Policy Documentation</p>
                        <p className="text-sm">Generates comprehensive policy documentation with legal references, eligibility matrices, and operational procedures</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documentation">
              <DocumentationTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* AI-Powered Assistance Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-6xl mx-auto mb-12">
          <div className="text-center mb-8">
            <Brain className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">AI-Powered Assistance</h3>
            <p className="text-gray-600">AI models assist with setup and flagging while humans maintain control over all eligibility decisions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">Configuration Acceleration</h5>
              <p className="text-gray-600 text-sm">AI converts plain language disaster policies into structured configuration parameters, extracting eligibility criteria and program details to speed up setup</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">Processing Efficiency</h5>
              <p className="text-gray-600 text-sm">AI assists in streamlining application processing and documentation review, while all final eligibility determinations remain with human reviewers</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">Issue Flagging</h5>
              <p className="text-gray-600 text-sm">AI models detect anomalies and flag potential issues in applications for human investigation, ensuring program integrity</p>
            </div>
          </div>
        </div>

        {/* System Benefits */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">System Benefits</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Rapid Deployment</h4>
              <p className="text-gray-600 text-sm">Configure and deploy new disaster assistance programs in hours, not weeks</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Settings className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Consistency</h4>
              <p className="text-gray-600 text-sm">Ensure uniform application of policies across all disaster response operations</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Human-Centered AI</h4>
              <p className="text-gray-600 text-sm">AI assists with setup and flagging while humans maintain control over all eligibility decisions</p>
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
