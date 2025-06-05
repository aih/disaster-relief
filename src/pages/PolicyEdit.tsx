
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, Save, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PolicyEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { policyId } = useParams();

  const [policyData, setPolicyData] = useState({
    title: "Housing Assistance Policy Update",
    description: "Increased maximum award from $41,000 to $43,000 for primary residence repairs",
    effectiveDate: "2024-02-01",
    maxHousingAward: "43000",
    maxOtherNeedsAward: "8500",
    incomeThreshold: "125",
    documentationThreshold: "10000",
    priority: "High",
    autoApply: true
  });

  const handleSave = () => {
    toast({
      title: "Policy Saved",
      description: "Policy changes have been saved successfully.",
    });
  };

  const handleSubmitForReview = () => {
    toast({
      title: "Submitted for Review",
      description: "Policy has been submitted for approval and review.",
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
                <h1 className="text-xl font-bold">Edit Policy</h1>
                <p className="text-blue-200 text-sm">Policy ID: {policyId}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/staff-dashboard')}
              className="text-blue-900 border-white hover:bg-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="awards">Award Amounts</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility Criteria</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Policy Information</span>
                </CardTitle>
                <CardDescription>
                  Edit basic policy details and metadata
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Policy Title</Label>
                  <Input 
                    id="title"
                    value={policyData.title}
                    onChange={(e) => setPolicyData({...policyData, title: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    value={policyData.description}
                    onChange={(e) => setPolicyData({...policyData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="effectiveDate">Effective Date</Label>
                    <Input 
                      id="effectiveDate"
                      type="date"
                      value={policyData.effectiveDate}
                      onChange={(e) => setPolicyData({...policyData, effectiveDate: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={policyData.priority} onValueChange={(value) => setPolicyData({...policyData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Award Amounts Tab */}
          <TabsContent value="awards">
            <Card>
              <CardHeader>
                <CardTitle>Award Amounts</CardTitle>
                <CardDescription>
                  Configure maximum award amounts for different assistance types
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="maxHousingAward">Maximum Housing Assistance Award</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input 
                        id="maxHousingAward"
                        type="number"
                        value={policyData.maxHousingAward}
                        onChange={(e) => setPolicyData({...policyData, maxHousingAward: e.target.value})}
                        className="pl-8"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">For primary residence repairs and temporary housing</p>
                  </div>

                  <div>
                    <Label htmlFor="maxOtherNeedsAward">Maximum Other Needs Assistance Award</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input 
                        id="maxOtherNeedsAward"
                        type="number"
                        value={policyData.maxOtherNeedsAward}
                        onChange={(e) => setPolicyData({...policyData, maxOtherNeedsAward: e.target.value})}
                        className="pl-8"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">For personal property and other essential needs</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="documentationThreshold">Documentation Threshold</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input 
                      id="documentationThreshold"
                      type="number"
                      value={policyData.documentationThreshold}
                      onChange={(e) => setPolicyData({...policyData, documentationThreshold: e.target.value})}
                      className="pl-8"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Awards below this amount require simplified documentation</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Award Amount Guidelines</h4>
                      <ul className="text-blue-700 text-sm mt-1 space-y-1">
                        <li>• Housing awards are subject to insurance verification</li>
                        <li>• Other needs awards have accelerated processing</li>
                        <li>• All awards must comply with federal regulations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eligibility Criteria Tab */}
          <TabsContent value="eligibility">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
                <CardDescription>
                  Set eligibility requirements and thresholds for assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="incomeThreshold">Income Threshold (% of Area Median Income)</Label>
                  <div className="relative">
                    <Input 
                      id="incomeThreshold"
                      type="number"
                      value={policyData.incomeThreshold}
                      onChange={(e) => setPolicyData({...policyData, incomeThreshold: e.target.value})}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Maximum household income as percentage of AMI</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Requirements</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        id="primaryResidence"
                        className="rounded"
                        defaultChecked
                      />
                      <label htmlFor="primaryResidence" className="text-sm">
                        Must be primary residence for housing assistance
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        id="insuranceVerification"
                        className="rounded"
                        defaultChecked
                      />
                      <label htmlFor="insuranceVerification" className="text-sm">
                        Require insurance verification for awards over $5,000
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        id="identityVerification"
                        className="rounded"
                        defaultChecked
                      />
                      <label htmlFor="identityVerification" className="text-sm">
                        Require government-issued ID verification
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        id="occupancyVerification"
                        className="rounded"
                        defaultChecked
                      />
                      <label htmlFor="occupancyVerification" className="text-sm">
                        Verify occupancy at time of disaster
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleSubmitForReview} className="bg-blue-600 hover:bg-blue-700">
            Submit for Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PolicyEdit;
