
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StaffHeader = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default StaffHeader;
