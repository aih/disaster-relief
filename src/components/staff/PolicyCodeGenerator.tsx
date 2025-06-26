
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Download, Save, TestTube, CheckCircle, FileCode, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PolicyCodeGeneratorProps {
  policyData: any;
  onSave: () => void;
}

const PolicyCodeGenerator = ({ policyData, onSave }: PolicyCodeGeneratorProps) => {
  const { toast } = useToast();
  const [testResults, setTestResults] = useState<any>(null);

  const generatedCode = `# fema_eligibility/configs/${policyData.disasterId}/policy.py

from fema_eligibility.abstractions import AssistanceProgram, Disaster
from fema_eligibility.common_rules import *

def get_config() -> Disaster:
    """
    Defines the eligibility policy for ${policyData.counties} under disaster ${policyData.disasterId}.
    
    SPECIAL POLICIES:
    - Expedited Serious Needs Assistance is ACTIVATED.
    - Inspections are WAIVED for Clean and Sanitize.
    - Inspections are WAIVED for Displacement Assistance.
    """
    
    # --- Define All Available Assistance Programs ---
    
    sna_expedited = AssistanceProgram(
        name="Serious Needs Assistance (Expedited)",
        max_award=770.00,
        rules=[rule_is_in_declared_area, rule_passed_validations, rule_is_in_geofence, rule_reported_immediate_need]
    )

    sna_regular = AssistanceProgram(
        name="Serious Needs Assistance (Regular)",
        max_award=770.00,
        rules=[rule_is_in_declared_area, rule_passed_validations, rule_inspection_found_minor_damage]
    )
    
    clean_sanitize = AssistanceProgram(
        name="Clean and Sanitize",
        max_award=300.00,
        # NOTE: The inspection rule is omitted here, effectively WAIVING it for this county's policy.
        rules=[rule_is_in_declared_area, rule_passed_validations]
    )
    
    displacement_assistance = AssistanceProgram(
        name="Displacement Assistance",
        max_award=1638.00,  # 14 days * $117/day
        # NOTE: The inspection rule is omitted here, effectively WAIVING it for this county's policy.
        rules=[rule_is_in_declared_area, rule_passed_validations]
    )

    # --- Assemble the Final Disaster Object for This Policy ---
    
    return Disaster(
        name="${policyData.disasterId}",
        declared_counties={'${policyData.counties.split(',')[0].trim()}'}, # This policy is specific to ${policyData.counties} applicants
        programs=[
            sna_expedited,
            sna_regular,
            clean_sanitize,
            displacement_assistance,
        ]
    )`;

  const handleRunTests = () => {
    // Simulate test execution
    setTimeout(() => {
      setTestResults({
        passed: true,
        testCount: 12,
        coverage: 94,
        scenarios: [
          { name: "Eligible applicant in declared area", status: "PASS" },
          { name: "Ineligible applicant outside county", status: "PASS" },
          { name: "Expedited SNA with immediate need", status: "PASS" },
          { name: "Clean & Sanitize without inspection", status: "PASS" },
          { name: "Maximum award validation", status: "PASS" },
          { name: "Edge case: Multiple programs", status: "PASS" }
        ]
      });
      toast({
        title: "Tests Completed",
        description: "All policy validation tests passed successfully.",
      });
    }, 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Code Copied",
      description: "Policy code has been copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${policyData.disasterId}_policy.py`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileCode className="h-5 w-5 text-blue-500" />
            <span>Generated Policy Code</span>
          </CardTitle>
          <CardDescription>
            Review and test the generated policy.py file before deployment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Python</Badge>
              <Badge variant="outline">{generatedCode.split('\n').length} lines</Badge>
              <Badge variant="outline">Ready for Testing</Badge>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={handleCopyCode}>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              <Button size="sm" variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <Textarea
            value={generatedCode}
            readOnly
            className="font-mono text-sm min-h-[400px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TestTube className="h-5 w-5 text-green-500" />
            <span>Policy Validation & Testing</span>
          </CardTitle>
          <CardDescription>
            Automated testing ensures policy correctness before deployment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Testing Workflow</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• <strong>Syntax Validation:</strong> Verify Python code structure and imports</p>
              <p>• <strong>Business Logic Tests:</strong> Test eligibility scenarios and edge cases</p>
              <p>• <strong>Integration Tests:</strong> Validate against common rules library</p>
              <p>• <strong>Compliance Check:</strong> Ensure policy meets FEMA requirements</p>
            </div>
          </div>

          {!testResults && (
            <Button onClick={handleRunTests} className="w-full">
              <TestTube className="h-4 w-4 mr-2" />
              Run Policy Validation Tests
            </Button>
          )}

          {testResults && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-600 mb-4">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">All Tests Passed ({testResults.testCount}/12)</span>
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

      {testResults?.passed && (
        <div className="flex space-x-4">
          <Button onClick={onSave} className="flex-1 bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Deploy Policy to Production
          </Button>
          <Button variant="outline">
            Save as Draft
          </Button>
        </div>
      )}
    </div>
  );
};

export { PolicyCodeGenerator as default };
