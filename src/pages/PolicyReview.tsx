
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, FileText, AlertCircle, CheckCircle, Clock, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PolicyReview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { policyId } = useParams();

  // Mock policy data
  const policyData = {
    id: "POL-2024-001",
    title: "Housing Assistance Policy Update",
    description: "Increased maximum award from $41,000 to $43,000 for primary residence repairs",
    status: "Ready to Deploy",
    author: "Sarah Johnson",
    createdDate: "2024-01-15",
    lastModified: "2024-01-20",
    effectiveDate: "2024-02-01",
    affectedCases: 1247,
    estimatedImpact: "$2.4M additional funding"
  };

  const changeDetails = [
    {
      section: "Housing Assistance - Primary Residence",
      oldValue: "$41,000",
      newValue: "$43,000",
      impact: "Increased maximum award by $2,000"
    },
    {
      section: "Documentation Requirements",
      oldValue: "Full inspection required",
      newValue: "Self-certification for amounts under $10,000",
      impact: "Reduced processing time for smaller claims"
    },
    {
      section: "Eligibility Income Threshold",
      oldValue: "120% of Area Median Income",
      newValue: "125% of Area Median Income",
      impact: "Expands eligibility to additional applicants"
    }
  ];

  const affectedDisasters = [
    { id: "DR-4729", name: "Hurricane Helena", cases: 523, status: "Active" },
    { id: "DR-4730", name: "Wildfire Complex", cases: 412, status: "Active" },
    { id: "DR-4728", name: "Severe Storms", cases: 312, status: "Setup" }
  ];

  const handleApprove = () => {
    toast({
      title: "Policy Approved",
      description: "Policy changes have been approved and are ready for deployment.",
    });
  };

  const handleDeploy = () => {
    toast({
      title: "Policy Deployed",
      description: "Policy changes have been successfully deployed to all active disasters.",
    });
    navigate('/staff-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6" />
              <div>
                <h1 className="text-xl font-bold">Policy Review</h1>
                <p className="text-blue-200 text-sm">{policyData.title}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/staff-dashboard')}
              className="text-blue-900 border-white hover:bg-white"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Policy Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <span>{policyData.title}</span>
                </CardTitle>
                <CardDescription>{policyData.description}</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {policyData.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600">Created By</p>
                <p className="font-semibold">{policyData.author}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Modified</p>
                <p className="font-semibold">{policyData.lastModified}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Effective Date</p>
                <p className="font-semibold">{policyData.effectiveDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Affected Cases</p>
                <p className="font-semibold">{policyData.affectedCases.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="changes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="changes">Policy Changes</TabsTrigger>
            <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
            <TabsTrigger value="affected">Affected Disasters</TabsTrigger>
          </TabsList>

          {/* Policy Changes Tab */}
          <TabsContent value="changes">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Changes</CardTitle>
                <CardDescription>
                  Review all proposed changes to the current policy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Policy Section</TableHead>
                      <TableHead>Current Value</TableHead>
                      <TableHead>Proposed Value</TableHead>
                      <TableHead>Impact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {changeDetails.map((change, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{change.section}</TableCell>
                        <TableCell>
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                            {change.oldValue}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                            {change.newValue}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{change.impact}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Analysis Tab */}
          <TabsContent value="impact">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>Applicant Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Existing Cases Affected:</span>
                    <span className="font-semibold">{policyData.affectedCases.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Additional Eligible Applicants:</span>
                    <span className="font-semibold">~350</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Additional Award:</span>
                    <span className="font-semibold">$1,920</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Time Reduction:</span>
                    <span className="font-semibold">3-5 days</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <span>Financial Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Estimated Additional Funding:</span>
                    <span className="font-semibold">{policyData.estimatedImpact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Budget Variance:</span>
                    <span className="font-semibold text-green-600">+4.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Administrative Savings:</span>
                    <span className="font-semibold">$180,000/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI Timeline:</span>
                    <span className="font-semibold">8 months</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Affected Disasters Tab */}
          <TabsContent value="affected">
            <Card>
              <CardHeader>
                <CardTitle>Affected Disaster Declarations</CardTitle>
                <CardDescription>
                  These active disasters will be updated when the policy is deployed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Disaster ID</TableHead>
                      <TableHead>Disaster Name</TableHead>
                      <TableHead>Affected Cases</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Update Schedule</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {affectedDisasters.map((disaster) => (
                      <TableRow key={disaster.id}>
                        <TableCell className="font-medium">{disaster.id}</TableCell>
                        <TableCell>{disaster.name}</TableCell>
                        <TableCell>{disaster.cases}</TableCell>
                        <TableCell>
                          <Badge variant={disaster.status === 'Active' ? 'default' : 'secondary'}>
                            {disaster.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">Immediate deployment</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/policy-edit/${policyData.id}`)}
          >
            Edit Policy
          </Button>
          <Button 
            variant="outline" 
            onClick={handleApprove}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve Changes
          </Button>
          <Button 
            onClick={handleDeploy}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Deploy Policy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PolicyReview;
