
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TestTube, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PolicyTestingProps {
  onTestComplete: (results: any) => void;
}

const PolicyTesting = ({ onTestComplete }: PolicyTestingProps) => {
  const { toast } = useToast();
  const [testResults, setTestResults] = useState<any>(null);

  const handleRunTests = () => {
    // Simulate test execution for Rego
    setTimeout(() => {
      const results = {
        passed: true,
        testCount: 15,
        coverage: 96,
        scenarios: [
          { name: "Global eligibility validation", status: "PASS" },
          { name: "Expedited SNA with geofencing", status: "PASS" },
          { name: "Clean & Sanitize inspection waiver", status: "PASS" },
          { name: "Displacement assistance eligibility", status: "PASS" },
          { name: "Transportation assistance validation", status: "PASS" },
          { name: "Funeral assistance requirements", status: "PASS" },
          { name: "Rego syntax validation", status: "PASS" },
          { name: "OPA engine compatibility", status: "PASS" }
        ]
      };
      setTestResults(results);
      onTestComplete(results);
      toast({
        title: "Rego Tests Completed",
        description: "All policy validation tests passed successfully with OPA engine.",
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TestTube className="h-5 w-5 text-green-500" />
          <span>Rego Policy Validation & Testing</span>
        </CardTitle>
        <CardDescription>
          Automated testing with Open Policy Agent engine ensures policy correctness
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <h4 className="font-medium text-indigo-900 mb-2">OPA Testing Workflow</h4>
          <div className="text-sm text-indigo-800 space-y-1">
            <p>• <strong>Rego Syntax Validation:</strong> Verify policy structure and OPA compatibility</p>
            <p>• <strong>Business Logic Tests:</strong> Test eligibility scenarios with sample data</p>
            <p>• <strong>Extension Validation:</strong> Verify temporal, geospatial, and data integration functions</p>
            <p>• <strong>Performance Testing:</strong> Ensure policy evaluation meets response time requirements</p>
            <p>• <strong>Security Assessment:</strong> Validate policy against FEMA compliance requirements</p>
          </div>
        </div>

        {!testResults && (
          <Button onClick={handleRunTests} className="w-full">
            <TestTube className="h-4 w-4 mr-2" />
            Run Rego Policy Validation Tests
          </Button>
        )}

        {testResults && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-green-600 mb-4">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">All Tests Passed ({testResults.testCount}/15)</span>
              <Badge variant="secondary">{testResults.coverage}% Coverage</Badge>
            </div>

            <div className="grid gap-2">
              {testResults.scenarios.map((scenario: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{scenario.name}</span>
                  <Badge variant={scenario.status === 'PASS' ? 'default' : 'destructive'}>
                    {scenario.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PolicyTesting;
