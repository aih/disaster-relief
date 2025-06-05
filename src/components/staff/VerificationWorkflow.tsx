
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Camera, FileText, MapPin, Calendar, CheckCircle, AlertCircle } from "lucide-react";

interface VerificationTask {
  id: string;
  type: 'identity' | 'occupancy' | 'ownership' | 'insurance' | 'inspection';
  status: 'pending' | 'api-verified' | 'manual-review' | 'completed';
  method: string;
  priority: 'high' | 'medium' | 'low';
  caseId: string;
  applicantName: string;
}

const VerificationWorkflow = () => {
  const verificationTasks: VerificationTask[] = [
    {
      id: "VER-001",
      type: "identity",
      status: "api-verified",
      method: "DMV API",
      priority: "high",
      caseId: "DA-2024-001234",
      applicantName: "Sarah Johnson"
    },
    {
      id: "VER-002", 
      type: "occupancy",
      status: "pending",
      method: "Utility Records API",
      priority: "medium",
      caseId: "DA-2024-001235",
      applicantName: "Mike Chen"
    },
    {
      id: "VER-003",
      type: "inspection",
      status: "manual-review",
      method: "Remote Video Call",
      priority: "high",
      caseId: "DA-2024-001236",
      applicantName: "Lisa Chen"
    }
  ];

  const getVerificationIcon = (type: string) => {
    switch (type) {
      case 'identity': return <Shield className="h-4 w-4" />;
      case 'occupancy': return <MapPin className="h-4 w-4" />;
      case 'ownership': return <FileText className="h-4 w-4" />;
      case 'insurance': return <Shield className="h-4 w-4" />;
      case 'inspection': return <Camera className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'api-verified': return 'bg-green-500';
      case 'completed': return 'bg-green-500';
      case 'manual-review': return 'bg-orange-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>Verification Workflow</span>
        </CardTitle>
        <CardDescription>
          Automated verification processes and inspection scheduling
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Verification Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-600 font-medium">API Verified</p>
              <p className="text-2xl font-bold text-green-800">234</p>
              <p className="text-xs text-green-500">92% success rate</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-sm text-orange-600 font-medium">Manual Review</p>
              <p className="text-2xl font-bold text-orange-800">18</p>
              <p className="text-xs text-orange-500">Needs staff attention</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Remote Inspections</p>
              <p className="text-2xl font-bold text-blue-800">67%</p>
              <p className="text-xs text-blue-500">vs in-person</p>
            </div>
          </div>

          {/* Active Verification Tasks */}
          <div className="space-y-3">
            <h3 className="font-semibold">Active Verification Tasks</h3>
            {verificationTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getVerificationIcon(task.type)}
                      <span className="font-medium capitalize">{task.type} Verification</span>
                    </div>
                    <Badge className={`${getStatusColor(task.status)} text-white`}>
                      {task.status.replace('-', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority} priority
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    {task.caseId}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{task.applicantName}</p>
                    <p className="text-xs text-gray-600">Method: {task.method}</p>
                  </div>
                  <div className="space-x-2">
                    {task.status === 'manual-review' && (
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Review
                      </Button>
                    )}
                    {task.type === 'inspection' && task.status === 'pending' && (
                      <Button size="sm" variant="outline">
                        Schedule
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inspection Scheduling */}
          <div className="border rounded-lg p-4 bg-blue-50">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Smart Inspection Routing</h3>
            </div>
            <p className="text-sm text-blue-700 mb-3">
              System automatically routes inspections based on location, agent expertise, and case priority.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Today's Inspections</p>
                <p className="text-2xl font-bold text-blue-800">23</p>
              </div>
              <div>
                <p className="font-medium">Remote Inspections</p>
                <p className="text-2xl font-bold text-blue-800">15</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationWorkflow;
