
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PolicyManagement = () => {
  const navigate = useNavigate();

  return (
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
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate('/policy-review/POL-2024-001')}
                >
                  Review Changes
                </Button>
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
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate('/policy-edit/POL-2024-002')}
                >
                  Edit Policy
                </Button>
                <Button size="sm" variant="outline">Submit for Approval</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicyManagement;
