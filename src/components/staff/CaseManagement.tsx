
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Users, Bot, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Case {
  id: string;
  applicantName: string;
  disaster: string;
  status: 'auto-processing' | 'manual-review' | 'pending-docs' | 'approved' | 'inspection-required';
  autoProcessingProgress: number;
  linkedCases?: string[];
  barriers?: string[];
  lastUpdate: string;
}

const CaseManagement = () => {
  const navigate = useNavigate();
  
  const cases: Case[] = [
    {
      id: "DA-2024-001234",
      applicantName: "Sarah Johnson",
      disaster: "DR-4729",
      status: "auto-processing",
      autoProcessingProgress: 85,
      barriers: [],
      lastUpdate: "2 hours ago"
    },
    {
      id: "DA-2024-001235", 
      applicantName: "Mike Chen",
      disaster: "DR-4729",
      status: "pending-docs",
      autoProcessingProgress: 45,
      barriers: ["Insurance verification needed", "Occupancy proof required"],
      linkedCases: ["DA-2024-001236"],
      lastUpdate: "1 day ago"
    },
    {
      id: "DA-2024-001236",
      applicantName: "Lisa Chen",
      disaster: "DR-4729", 
      status: "approved",
      autoProcessingProgress: 100,
      linkedCases: ["DA-2024-001235"],
      lastUpdate: "3 hours ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'auto-processing': return 'bg-blue-500';
      case 'manual-review': return 'bg-orange-500';
      case 'pending-docs': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'inspection-required': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'auto-processing': return <Bot className="h-4 w-4" />;
      case 'manual-review': return <AlertTriangle className="h-4 w-4" />;
      case 'pending-docs': return <FileText className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'inspection-required': return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-500" />
          <span>Automated Case Processing</span>
        </CardTitle>
        <CardDescription>
          Monitor auto-adjudication progress and manage cases requiring intervention
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Processing Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Auto-Processed</p>
              <p className="text-2xl font-bold text-blue-800">847</p>
              <p className="text-xs text-blue-500">+12% from yesterday</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm text-yellow-600 font-medium">Pending Docs</p>
              <p className="text-2xl font-bold text-yellow-800">156</p>
              <p className="text-xs text-yellow-500">Survivor action needed</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-sm text-orange-600 font-medium">Manual Review</p>
              <p className="text-2xl font-bold text-orange-800">43</p>
              <p className="text-xs text-orange-500">Staff intervention required</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Processing Rate</p>
              <p className="text-2xl font-bold text-green-800">89%</p>
              <p className="text-xs text-green-500">Auto-adjudicated</p>
            </div>
          </div>

          {/* Case List */}
          <div className="space-y-3">
            {cases.map((case_) => (
              <div key={case_.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getStatusColor(case_.status)} text-white`}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(case_.status)}
                        <span className="capitalize">{case_.status.replace('-', ' ')}</span>
                      </div>
                    </Badge>
                    <div>
                      <h3 className="font-semibold">{case_.id}</h3>
                      <p className="text-sm text-gray-600">{case_.applicantName}</p>
                    </div>
                    {case_.linkedCases && (
                      <div className="flex items-center space-x-1 text-blue-600">
                        <Users className="h-4 w-4" />
                        <span className="text-xs">Linked ({case_.linkedCases.length})</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Last update: {case_.lastUpdate}</p>
                  </div>
                </div>

                {case_.status === 'auto-processing' && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Auto-processing progress</span>
                      <span>{case_.autoProcessingProgress}%</span>
                    </div>
                    <Progress value={case_.autoProcessingProgress} className="h-2" />
                  </div>
                )}

                {case_.barriers && case_.barriers.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-orange-600 mb-2">Action Required:</p>
                    <div className="space-y-1">
                      {case_.barriers.map((barrier, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <AlertTriangle className="h-3 w-3 text-orange-500" />
                          <span>{barrier}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    <Button size="sm" variant="outline" onClick={() => navigate(`/case-details/${case_.id}`)}>
                      View Details
                    </Button>
                    {case_.barriers && case_.barriers.length > 0 && (
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Notify Survivor
                      </Button>
                    )}
                  </div>
                  {case_.status === 'manual-review' && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Review Case
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <Button className="w-full" onClick={() => navigate('/case-management')}>
              View All Cases
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseManagement;
