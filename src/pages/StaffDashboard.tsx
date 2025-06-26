
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import StaffHeader from "@/components/staff/StaffHeader";
import ConfigureDisaster from "@/components/staff/ConfigureDisaster";

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
        <ConfigureDisaster onSave={handleSaveDisaster} />
      </div>
    </div>
  );
};

export default StaffDashboard;
