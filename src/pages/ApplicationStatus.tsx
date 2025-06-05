
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, FileText, Phone, AlertCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApplicationStatus = () => {
  const navigate = useNavigate();

  const applicationData = {
    referenceId: "DA-2024-001234",
    submittedDate: "November 15, 2024",
    status: "Under Review",
    currentStep: "Document Review",
    progress: 65,
    lastUpdate: "November 18, 2024"
  };

  const statusSteps = [
    { step: "Application Submitted", completed: true, date: "Nov 15, 2024" },
    { step: "Initial Review", completed: true, date: "Nov 16, 2024" },
    { step: "Document Review", completed: false, current: true, date: "In Progress" },
    { step: "Inspection Scheduled", completed: false, date: "Pending" },
    { step: "Decision", completed: false, date: "Pending" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6" />
              <div>
                <h1 className="text-xl font-bold">Application Status</h1>
                <p className="text-blue-200 text-sm">Track Your Disaster Assistance Application</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="text-blue-900 border-white hover:bg-white"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Application Overview */}
        <Card className="mb-6">
          <CardHeader className="bg-green-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-green-800">Application Received</CardTitle>
                <CardDescription className="text-green-600">
                  Reference ID: {applicationData.referenceId}
                </CardDescription>
              </div>
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Submitted</p>
                <p className="font-semibold">{applicationData.submittedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Status</p>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {applicationData.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                <p className="font-semibold">{applicationData.lastUpdate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Tracking */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Application Progress</span>
            </CardTitle>
            <CardDescription>
              Your application is currently in the {applicationData.currentStep} phase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Overall Progress</span>
                <span className="text-sm text-gray-600">{applicationData.progress}% Complete</span>
              </div>
              <Progress value={applicationData.progress} className="h-3" />
            </div>

            <div className="space-y-4">
              {statusSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-green-600 text-white' 
                      : step.current 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      step.current ? 'text-blue-600' : step.completed ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {step.step}
                    </p>
                    <p className="text-sm text-gray-500">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Updates */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span>Important Updates</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-medium text-blue-800">Document Review in Progress</p>
                <p className="text-sm text-gray-600 mt-1">
                  We are currently reviewing the documentation you provided. No action is required from you at this time.
                </p>
                <p className="text-xs text-gray-500 mt-2">November 18, 2024</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-medium text-green-800">Application Successfully Submitted</p>
                <p className="text-sm text-gray-600 mt-1">
                  Your disaster assistance application has been received and assigned reference ID DA-2024-001234.
                </p>
                <p className="text-xs text-gray-500 mt-2">November 15, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <span>What Happens Next</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Upcoming: Property Inspection</h4>
                <p className="text-blue-700 text-sm">
                  Once document review is complete, we will schedule a property inspection. 
                  You will receive a call 24-48 hours before the scheduled inspection.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">What You Can Do Now</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Continue to save all receipts for disaster-related expenses</li>
                  <li>• Take photos of damaged property if not already done</li>
                  <li>• Gather any additional documentation that may be helpful</li>
                  <li>• Stay available by phone for inspection scheduling</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-green-500" />
              <span>Need Help or Have Questions?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">FEMA Helpline</h4>
                <p className="text-lg font-bold text-blue-600">1-800-621-3362</p>
                <p className="text-sm text-gray-600">TTY: 1-800-462-7585</p>
                <p className="text-sm text-gray-600">Hours: 7 AM - 11 PM EST, 7 days a week</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Online Resources</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Visit DisasterAssistance.gov
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Update Application Information
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Upload Additional Documents
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationStatus;
