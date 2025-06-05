
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Disaster {
  id: string;
  name: string;
  state: string;
  status: string;
  applicants: number;
}

interface ActiveDisastersProps {
  disasters: Disaster[];
}

const ActiveDisasters = ({ disasters }: ActiveDisastersProps) => {
  const navigate = useNavigate();

  return (
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
          {disasters.map((disaster) => (
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
                <Button 
                  className="ml-4"
                  onClick={() => navigate(`/disaster-management/${disaster.id}`)}
                >
                  Manage
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveDisasters;
