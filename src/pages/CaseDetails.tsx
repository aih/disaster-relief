
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Bot, 
  FileText, 
  Users, 
  Shield, 
  Camera, 
  MapPin, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Phone,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [caseData] = useState({
    id: id || "DA-2024-001234",
    applicantName: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "sarah.johnson@email.com",
    address: "123 Main St, Tampa, FL 33601",
    disaster: "DR-4729 - Hurricane Helena",
    status: "auto-processing",
    autoProcessingProgress: 85,
    applicationDate: "2024-01-15",
    lastUpdate: "2 hours ago",
    linkedCases: ["DA-2024-001235"],
    eligibilityStatus: {
      housing: "eligible",
      ona: "pending-verification",
      sba: "not-applicable"
    },
    verifications: [
      { type: "Identity", status: "verified", method: "DMV API", date: "2024-01-15" },
      { type: "Occupancy", status: "pending", method: "Utility Records", date: "2024-01-16" },
      { type: "Ownership", status: "verified", method: "Property Records", date: "2024-01-15" },
      { type: "Insurance", status: "manual-review", method: "Document Upload", date: "2024-01-16" }
    ],
    documents: [
      { name: "Driver's License", type: "id", status: "approved", uploadDate: "2024-01-15" },
      { name: "Insurance Policy", type: "insurance", status: "processing", uploadDate: "2024-01-16" },
      { name: "Utility Bill", type: "occupancy", status: "approved", uploadDate: "2024-01-15" }
    ],
    barriers: [
      "Insurance verification pending - awaiting document review",
      "Occupancy proof required - utility records inconclusive"
    ],
    timeline: [
      { date: "2024-01-15", event: "Application submitted", type: "info" },
      { date: "2024-01-15", event: "Identity verified via DMV API", type: "success" },
      { date: "2024-01-15", event: "Ownership verified via property records", type: "success" },
      { date: "2024-01-16", event: "Insurance document uploaded", type: "info" },
      { date: "2024-01-16", event: "Manual review required for insurance", type: "warning" }
    ]
  });

  const handleNotifySurvivor = () => {
    toast({
      title: "Survivor Notified",
      description: "Automatic notification sent via SMS and email about required documentation.",
    });
  };

  const handleLinkCase = () => {
    toast({
      title: "Case Linked",
      description: "Successfully linked to related case for joint processing.",
    });
  };

  const handleOverrideEligibility = () => {
    toast({
      title: "Eligibility Updated",
      description: "Manual eligibility determination recorded and case updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/staff-dashboard')}
                className="text-white hover:bg-blue-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold">Case Details: {caseData.id}</h1>
                <p className="text-blue-200 text-sm">{caseData.applicantName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-600 text-white">
                <Bot className="h-3 w-3 mr-1" />
                {Math.round(caseData.autoProcessingProgress)}% Auto-Processed
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Auto-Processing Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-blue-500" />
                  <span>Auto-Processing Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Processing Progress</span>
                    <span className="font-semibold">{caseData.autoProcessingProgress}%</span>
                  </div>
                  <Progress value={caseData.autoProcessingProgress} className="h-3" />
                  
                  {caseData.barriers.length > 0 && (
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">Barriers to Auto-Processing:</h4>
                      <div className="space-y-2">
                        {caseData.barriers.map((barrier, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                            <span className="text-sm text-orange-700">{barrier}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className="mt-3 bg-orange-600 hover:bg-orange-700"
                        onClick={handleNotifySurvivor}
                      >
                        Notify Survivor
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="eligibility" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                    <TabsTrigger value="verification">Verification</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  </TabsList>

                  <TabsContent value="eligibility">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Program Eligibility Status</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <span>Housing Assistance</span>
                          <Badge className="bg-green-500 text-white">Eligible</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <span>Other Needs Assistance</span>
                          <Badge className="bg-yellow-500 text-white">Pending Verification</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <span>SBA Loan Referral</span>
                          <Badge className="bg-gray-500 text-white">Not Applicable</Badge>
                        </div>
                      </div>
                      <Button onClick={handleOverrideEligibility}>
                        Manual Eligibility Override
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="verification">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Verification Status</h3>
                      <div className="space-y-3">
                        {caseData.verifications.map((verification, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Shield className="h-4 w-4" />
                              <div>
                                <p className="font-medium">{verification.type}</p>
                                <p className="text-sm text-gray-600">{verification.method}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={
                                verification.status === 'verified' ? 'bg-green-500 text-white' :
                                verification.status === 'pending' ? 'bg-yellow-500 text-white' :
                                'bg-orange-500 text-white'
                              }>
                                {verification.status}
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">{verification.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Uploaded Documents</h3>
                      <div className="space-y-3">
                        {caseData.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-4 w-4" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-sm text-gray-600">Type: {doc.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={
                                doc.status === 'approved' ? 'bg-green-500 text-white' :
                                doc.status === 'processing' ? 'bg-blue-500 text-white' :
                                'bg-orange-500 text-white'
                              }>
                                {doc.status}
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">{doc.uploadDate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Case Timeline</h3>
                      <div className="space-y-3">
                        {caseData.timeline.map((event, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                            <div className={`w-3 h-3 rounded-full ${
                              event.type === 'success' ? 'bg-green-500' :
                              event.type === 'warning' ? 'bg-orange-500' :
                              'bg-blue-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="font-medium">{event.event}</p>
                              <p className="text-sm text-gray-600">{event.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Case Info */}
            <Card>
              <CardHeader>
                <CardTitle>Case Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Disaster</p>
                  <p className="font-medium">{caseData.disaster}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Application Date</p>
                  <p className="font-medium">{caseData.applicationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Update</p>
                  <p className="font-medium">{caseData.lastUpdate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{caseData.address}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{caseData.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{caseData.email}</span>
                </div>
              </CardContent>
            </Card>

            {/* Linked Cases */}
            {caseData.linkedCases.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Linked Cases</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {caseData.linkedCases.map((linkedCase, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{linkedCase}</span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-3" onClick={handleLinkCase}>
                    Link Additional Case
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">Schedule Inspection</Button>
                <Button className="w-full" variant="outline">Request Documents</Button>
                <Button className="w-full" variant="outline">Update Status</Button>
                <Button className="w-full" variant="outline">Add Case Note</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
