import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Shield, Settings, FileText, Database, Zap, CheckCircle, Clock, Globe, Cloud, MapPin } from "lucide-react";

const DocumentationTab = () => {
  return (
    <div className="space-y-8">
      {/* System Architecture Graphic */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <CardTitle className="text-xl flex items-center">
            <Database className="h-6 w-6 mr-2" />
            System Architecture & Access
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Architecture Diagram */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-center">Technical Architecture</h3>
              
              <div className="space-y-4">
                {/* Frontend Layer */}
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center mb-2">
                    <Globe className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-900">Frontend Applications</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-white p-2 rounded text-center">Staff Dashboard</div>
                    <div className="bg-white p-2 rounded text-center">Survivor Portal</div>
                  </div>
                  <p className="text-xs text-blue-700 mt-2">React, Mobile-Responsive, Role-Based Access</p>
                </div>

                {/* Processing Layer */}
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-semibold text-green-900">AI Processing Engine</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-white p-2 rounded text-center text-xs">Policy Parser</div>
                    <div className="bg-white p-2 rounded text-center text-xs">Form Generator</div>
                    <div className="bg-white p-2 rounded text-center text-xs">Rules Engine</div>
                  </div>
                  <p className="text-xs text-green-700 mt-2">LLM-Powered Configuration & Code Generation</p>
                </div>

                {/* Policy Layer */}
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 text-purple-600 mr-2" />
                    <h4 className="font-semibold text-purple-900">Policy Framework</h4>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-center text-sm font-medium">Open Policy Agent (Rego)</div>
                    <p className="text-xs text-purple-700 mt-1">Declarative Policy Language, CNCF Project</p>
                  </div>
                </div>

                {/* Cloud Technologies Layer */}
                <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
                  <div className="flex items-center mb-2">
                    <Cloud className="h-5 w-5 text-cyan-600 mr-2" />
                    <h4 className="font-semibold text-cyan-900">Cloud Technologies & API</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-white p-2 rounded text-center text-xs">API Gateway</div>
                    <div className="bg-white p-2 rounded text-center text-xs">Load Balancers</div>
                  </div>
                  <p className="text-xs text-cyan-700 mt-2">Modern, Resilient, High-Available, FedRAMP Certified</p>
                </div>

                {/* Data Layer */}
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <div className="flex items-center mb-2">
                    <Database className="h-5 w-5 text-orange-600 mr-2" />
                    <h4 className="font-semibold text-orange-900">Data & Security</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-white p-2 rounded text-center text-xs">Secure Storage</div>
                    <div className="bg-white p-2 rounded text-center text-xs">Audit Trails</div>
                  </div>
                  <p className="text-xs text-orange-700 mt-2">Encrypted, Compliant, Role-Based Access Control</p>
                </div>
              </div>
            </div>

            {/* User Experience Flow */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-center">User Experience Benefits</h3>
              
              <div className="space-y-6">
                {/* Survivor Journey */}
                <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Users className="h-6 w-6 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-900">Survivor Journey</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Mobile-first application forms</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Real-time status updates</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Consistent, fair processing</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-blue-700">
                    <Clock className="h-3 w-3 mr-1" />
                    Faster assistance delivery
                  </div>
                </div>

                {/* FEMA Staff Experience */}
                <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Shield className="h-6 w-6 text-green-600 mr-2" />
                    <h4 className="font-semibold text-green-900">FEMA Staff Experience</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Hours vs. weeks for setup</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>AI-assisted decision support</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Focus on complex cases</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-green-700">
                    <Zap className="h-3 w-3 mr-1" />
                    Rapid disaster response
                  </div>
                </div>

                {/* State & Local Staff Benefits */}
                <div className="bg-gradient-to-r from-teal-100 to-teal-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <MapPin className="h-6 w-6 text-teal-600 mr-2" />
                    <h4 className="font-semibold text-teal-900">State & Local Staff</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      <span>Real-time federal program visibility</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      <span>Standardized application processes</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      <span>Shared technology infrastructure</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-teal-700">
                    <Shield className="h-3 w-3 mr-1" />
                    Enhanced coordination & efficiency
                  </div>
                </div>

                {/* Technologist Benefits */}
                <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Settings className="h-6 w-6 text-purple-600 mr-2" />
                    <h4 className="font-semibold text-purple-900">Technologist Benefits</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span>Modular, reusable architecture</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span>Battle-tested Rego framework</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span>Automated code generation</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-purple-700">
                    <Database className="h-3 w-3 mr-1" />
                    Scalable, maintainable systems
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Technologies Footer */}
          <div className="mt-8 pt-6 border-t">
            <h4 className="text-center font-semibold text-gray-800 mb-4">Built on Proven Technologies</h4>
            <div className="flex justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>React + TypeScript</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Open Policy Agent</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span>Cloud Native (CNCF)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>
                <span>FedRAMP Certified</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationTab;
