
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Plus, Settings, Users, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeDisasters, setActiveDisasters] = useState([
    { id: "DR-4729", name: "Hurricane Helena", state: "FL", status: "Active", applicants: 15420 },
    { id: "DR-4730", name: "Wildfire Complex", state: "CA", status: "Active", applicants: 8903 },
    { id: "DR-4728", name: "Severe Storms", state: "TX", status: "Setup", applicants: 0 }
  ]);

  const handleSaveDisaster = () => {
    toast({
      title: "Disaster Configuration Saved",
      description: "Eligibility criteria and program parameters have been updated successfully.",
    });
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
                <h1 className="text-xl font-bold">FEMA Staff Dashboard</h1>
                <p className="text-blue-200 text-sm">Disaster Relief Configuration</p>
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

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="disasters" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="disasters">Active Disasters</TabsTrigger>
            <TabsTrigger value="configure">Configure New Disaster</TabsTrigger>
            <TabsTrigger value="policies">Policy Management</TabsTrigger>
          </TabsList>

          {/* Active Disasters Tab */}
          <TabsContent value="disasters">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <span>Active Disaster Declarations</span>
                </CardTitle>
                <CardDescription>
                  Monitor and manage currently active disaster relief operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeDisasters.map((disaster) => (
                    <div key={disaster.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-semibold text-lg">{disaster.id}</h3>
                              <p className="text-gray-600">{disaster.name}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                              <p>State: <span className="font-medium">{disaster.state}</span></p>
                              <p>Status: <span className={`font-medium ${disaster.status === 'Active' ? 'text-green-600' : 'text-orange-600'}`}>{disaster.status}</span></p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{disaster.applicants.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Applicants</p>
                        </div>
                        <Button className="ml-4">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configure New Disaster Tab */}
          <TabsContent value="configure">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-green-500" />
                  <span>Configure New Disaster</span>
                </CardTitle>
                <CardDescription>
                  Set up eligibility criteria and program parameters for a new disaster declaration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="disaster-id">Disaster Declaration ID</Label>
                      <Input id="disaster-id" placeholder="DR-XXXX" />
                    </div>
                    <div>
                      <Label htmlFor="disaster-name">Disaster Name</Label>
                      <Input id="disaster-name" placeholder="e.g., Hurricane Milton" />
                    </div>
                    <div>
                      <Label htmlFor="state">Affected State</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="LA">Louisiana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="disaster-type">Disaster Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select disaster type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hurricane">Hurricane</SelectItem>
                          <SelectItem value="wildfire">Wildfire</SelectItem>
                          <SelectItem value="flood">Flooding</SelectItem>
                          <SelectItem value="tornado">Tornado</SelectItem>
                          <SelectItem value="earthquake">Earthquake</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="max-award">Maximum Award Amount</Label>
                      <Input id="max-award" placeholder="$0.00" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input id="deadline" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="counties">Affected Counties</Label>
                      <Textarea 
                        id="counties" 
                        placeholder="List affected counties, separated by commas"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Eligibility Criteria</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="income-limit">Income Limit (% of AMI)</Label>
                        <Input id="income-limit" placeholder="e.g., 120%" />
                      </div>
                      <div>
                        <Label htmlFor="damage-threshold">Minimum Damage Threshold</Label>
                        <Input id="damage-threshold" placeholder="$0.00" type="number" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="occupancy">Occupancy Requirements</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select requirement" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="primary">Primary Residence Only</SelectItem>
                            <SelectItem value="secondary">Include Secondary Homes</SelectItem>
                            <SelectItem value="rental">Include Rental Properties</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="insurance">Insurance Requirements</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select requirement" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="required">Insurance Required</SelectItem>
                            <SelectItem value="not-required">No Insurance Required</SelectItem>
                            <SelectItem value="verified">Verified Coverage Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <Button onClick={handleSaveDisaster} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policy Management Tab */}
          <TabsContent value="policies">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-purple-500" />
                  <span>Policy Management</span>
                </CardTitle>
                <CardDescription>
                  Update program policies and automatically apply changes to existing cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Housing Assistance Policy Update</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Increased maximum award from $41,000 to $43,000 for primary residence repairs
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">Ready to Deploy</span>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">Review Changes</Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Deploy</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Documentation Requirements Update</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      New streamlined documentation process for claims under $10,000
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-orange-600 font-medium">Pending Review</span>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">Edit Policy</Button>
                        <Button size="sm" variant="outline">Submit for Approval</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffDashboard;
