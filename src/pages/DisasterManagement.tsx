
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Users, FileText, TrendingUp, MapPin, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const DisasterManagement = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock data based on disaster ID
  const getDisasterInfo = (disasterId: string) => {
    const disasters = {
      "DR-4729": {
        id: "DR-4729",
        name: "Hurricane Helena",
        state: "FL",
        status: "Active",
        applicants: 15420,
        approvedCases: 12890,
        totalAwarded: "$47,230,450",
        averageAward: "$3,665",
        applicationDeadline: "2024-07-15",
        counties: ["Miami-Dade", "Broward", "Palm Beach", "Monroe"]
      },
      "DR-4730": {
        id: "DR-4730",
        name: "Wildfire Complex",
        state: "CA",
        status: "Active",
        applicants: 8903,
        approvedCases: 7245,
        totalAwarded: "$31,850,200",
        averageAward: "$4,395",
        applicationDeadline: "2024-08-20",
        counties: ["Los Angeles", "Ventura", "Santa Barbara", "Kern"]
      },
      "DR-4728": {
        id: "DR-4728",
        name: "Severe Storms",
        state: "TX",
        status: "Setup",
        applicants: 0,
        approvedCases: 0,
        totalAwarded: "$0",
        averageAward: "$0",
        applicationDeadline: "2024-09-30",
        counties: ["Harris", "Galveston", "Chambers", "Liberty"]
      }
    };
    return disasters[disasterId] || disasters["DR-4729"];
  };

  const disaster = getDisasterInfo(id || "DR-4729");

  const recentApplications = [
    { id: "APP-001234", name: "John Smith", city: "Miami", status: "Under Review", amount: "$4,200" },
    { id: "APP-001235", name: "Maria Garcia", city: "Fort Lauderdale", status: "Approved", amount: "$3,850" },
    { id: "APP-001236", name: "Robert Johnson", city: "West Palm Beach", status: "Pending Documentation", amount: "$5,120" },
    { id: "APP-001237", name: "Lisa Wilson", city: "Key Largo", status: "Approved", amount: "$2,900" },
    { id: "APP-001238", name: "David Brown", city: "Homestead", status: "Under Review", amount: "$6,750" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6" />
              <div>
                <h1 className="text-xl font-bold">Disaster Management: {disaster.id}</h1>
                <p className="text-blue-200 text-sm">{disaster.name} - {disaster.state}</p>
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
        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Applicants</p>
                  <p className="text-2xl font-bold">{disaster.applicants.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Approved Cases</p>
                  <p className="text-2xl font-bold">{disaster.approvedCases.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Awarded</p>
                  <p className="text-2xl font-bold">{disaster.totalAwarded}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Application Deadline</p>
                  <p className="text-lg font-bold">{disaster.applicationDeadline}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Recent Applications</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="settings">Disaster Settings</TabsTrigger>
            <TabsTrigger value="counties">Affected Areas</TabsTrigger>
          </TabsList>

          {/* Recent Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  Most recent disaster assistance applications for {disaster.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Application ID</TableHead>
                      <TableHead>Applicant Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Award Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.id}</TableCell>
                        <TableCell>{app.name}</TableCell>
                        <TableCell>{app.city}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                            app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {app.status}
                          </span>
                        </TableCell>
                        <TableCell>{app.amount}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Processing Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Approval Rate:</span>
                    <span className="font-semibold">83.6%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Processing Time:</span>
                    <span className="font-semibold">14 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Award Amount:</span>
                    <span className="font-semibold">{disaster.averageAward}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Appeals Filed:</span>
                    <span className="font-semibold">127</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assistance Types Requested</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Housing Assistance:</span>
                    <span className="font-semibold">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Needs Assistance:</span>
                    <span className="font-semibold">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SBA Loan Referrals:</span>
                    <span className="font-semibold">34%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hazard Mitigation:</span>
                    <span className="font-semibold">12%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Disaster Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Disaster Configuration</CardTitle>
                <CardDescription>
                  Update settings and eligibility criteria for {disaster.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="max-award">Maximum Award Amount</Label>
                    <Input id="max-award" defaultValue="$43,000" />
                  </div>
                  <div>
                    <Label htmlFor="deadline">Application Deadline</Label>
                    <Input id="deadline" type="date" defaultValue="2024-07-15" />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                  <Button variant="outline">Reset to Defaults</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Affected Areas Tab */}
          <TabsContent value="counties">
            <Card>
              <CardHeader>
                <CardTitle>Affected Counties</CardTitle>
                <CardDescription>
                  Counties designated for disaster assistance under {disaster.id}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {disaster.counties.map((county, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{county} County</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DisasterManagement;
