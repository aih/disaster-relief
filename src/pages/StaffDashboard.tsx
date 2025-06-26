
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import StaffHeader from "@/components/staff/StaffHeader";
import ConfigureDisaster from "@/components/staff/ConfigureDisaster";
import DisasterReview from "@/components/staff/DisasterReview";

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
        <Tabs defaultValue="configure" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="configure">Configure New Disaster</TabsTrigger>
            <TabsTrigger value="review">Review Stored Disasters</TabsTrigger>
          </TabsList>

          <TabsContent value="configure">
            <ConfigureDisaster onSave={handleSaveDisaster} />
          </TabsContent>

          <TabsContent value="review">
            <DisasterReview />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffDashboard;
