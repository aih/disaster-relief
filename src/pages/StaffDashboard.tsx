
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import StaffHeader from "@/components/staff/StaffHeader";
import ConfigureDisaster from "@/components/staff/ConfigureDisaster";
import DisasterReview from "@/components/staff/DisasterReview";
import EligibilityRules from "@/components/staff/EligibilityRules";
import PolicyCreation from "@/components/staff/PolicyCreation";

const StaffDashboard = () => {
  const { toast } = useToast();

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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Disaster Configuration Center</h1>
          <p className="text-gray-600 mt-2">Configure disaster parameters, create policies, and manage assistance programs</p>
        </div>

        <Tabs defaultValue="configure" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="configure">Configure New Disaster</TabsTrigger>
            <TabsTrigger value="ai-policy">AI Policy Creation</TabsTrigger>
            <TabsTrigger value="review">Review Stored Disasters</TabsTrigger>
            <TabsTrigger value="rules">Eligibility Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="configure">
            <ConfigureDisaster onSave={handleSaveDisaster} />
          </TabsContent>

          <TabsContent value="ai-policy">
            <PolicyCreation />
          </TabsContent>

          <TabsContent value="review">
            <DisasterReview />
          </TabsContent>

          <TabsContent value="rules">
            <EligibilityRules />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffDashboard;
