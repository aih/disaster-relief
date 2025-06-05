
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import StaffHeader from "@/components/staff/StaffHeader";
import ActiveDisasters from "@/components/staff/ActiveDisasters";
import ConfigureDisaster from "@/components/staff/ConfigureDisaster";
import PolicyManagement from "@/components/staff/PolicyManagement";
import CaseManagement from "@/components/staff/CaseManagement";
import VerificationWorkflow from "@/components/staff/VerificationWorkflow";
import DocumentProcessing from "@/components/staff/DocumentProcessing";

const StaffDashboard = () => {
  const { toast } = useToast();
  const [activeDisasters] = useState([
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
      <StaffHeader />

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="disasters" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="disasters">Active Disasters</TabsTrigger>
            <TabsTrigger value="configure">Configure New Disaster</TabsTrigger>
            <TabsTrigger value="policies">Policy Management</TabsTrigger>
            <TabsTrigger value="cases">Case Management</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="disasters">
            <ActiveDisasters disasters={activeDisasters} />
          </TabsContent>

          <TabsContent value="configure">
            <ConfigureDisaster onSave={handleSaveDisaster} />
          </TabsContent>

          <TabsContent value="policies">
            <PolicyManagement />
          </TabsContent>

          <TabsContent value="cases">
            <CaseManagement />
          </TabsContent>

          <TabsContent value="verification">
            <VerificationWorkflow />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentProcessing />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffDashboard;
