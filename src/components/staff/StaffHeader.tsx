
import { Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StaffHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 text-white shadow-2xl border-b-4 border-blue-400">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="relative">
                <Shield className="h-8 w-8 text-blue-800" />
                <AlertTriangle className="h-4 w-4 text-red-600 absolute -top-1 -right-1" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">Federal Emergency Management Agency</h1>
              <div className="flex items-center space-x-2">
                <p className="text-blue-200 text-sm font-medium">FEMA Staff Dashboard</p>
                <span className="text-blue-300">•</span>
                <p className="text-blue-200 text-sm">Disaster Relief Configuration System</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-blue-200">U.S. Department of Homeland Security</p>
              <p className="text-xs text-blue-300">Emergency Management Division</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="bg-white text-blue-900 border-2 border-white hover:bg-blue-50 hover:border-blue-200 font-semibold"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StaffHeader;
