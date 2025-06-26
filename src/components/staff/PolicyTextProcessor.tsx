
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Loader2, Wand2 } from "lucide-react";

interface PolicyTextProcessorProps {
  policyData: any;
  onProcessComplete: (processedPolicy: any) => void;
}

const PolicyTextProcessor = ({ policyData, onProcessComplete }: PolicyTextProcessorProps) => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  const simulateProcessing = async () => {
    setProcessing(true);
    setProgress(0);
    
    const steps = [
      { progress: 20, status: "Analyzing policy document structure..." },
      { progress: 40, status: "Identifying assistance programs and award limits..." },
      { progress: 60, status: "Extracting eligibility rules and requirements..." },
      { progress: 80, status: "Mapping to common rule library..." },
      { progress: 100, status: "Policy processing complete!" }
    ];

    for (const step of steps) {
      setStatus(step.status);
      setProgress(step.progress);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Simulate AI processing result
    const processedPolicy = {
      programs: [
        {
          name: "Serious Needs Assistance (Expedited)",
          maxAward: 770,
          rules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_is_in_geofence", "rule_reported_immediate_need"],
          description: "Expedited assistance for immediate needs without inspection"
        },
        {
          name: "Serious Needs Assistance (Regular)",
          maxAward: 770,
          rules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_inspection_found_minor_damage"],
          description: "Regular SNA requiring inspection verification"
        },
        {
          name: "Clean and Sanitize",
          maxAward: 300,
          rules: ["rule_is_in_declared_area", "rule_passed_validations"],
          description: "Inspection waived for this county",
          specialProvisions: ["INSPECTION_WAIVED"]
        },
        {
          name: "Displacement Assistance",
          maxAward: 1638,
          rules: ["rule_is_in_declared_area", "rule_passed_validations"],
          description: "14 days × $117/day, inspection waived",
          specialProvisions: ["INSPECTION_WAIVED"]
        }
      ],
      specialPolicies: [
        "Expedited Serious Needs Assistance is ACTIVATED",
        "Inspections are WAIVED for Clean and Sanitize",
        "Inspections are WAIVED for Displacement Assistance"
      ],
      ruleMapping: {
        "rule_is_in_declared_area": "Applicant must be in declared disaster area",
        "rule_passed_validations": "Identity, occupancy, ownership validations passed",
        "rule_is_in_geofence": "Location verification via geofencing",
        "rule_reported_immediate_need": "Applicant reported immediate serious needs",
        "rule_inspection_found_minor_damage": "Home inspection found qualifying damage"
      }
    };

    setTimeout(() => {
      setProcessing(false);
      onProcessComplete(processedPolicy);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wand2 className="h-5 w-5 text-purple-500" />
            <span>AI Policy Processing Engine</span>
          </CardTitle>
          <CardDescription>
            Converting plain-language policy document to structured eligibility rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Input Summary:</h4>
            <div className="text-sm space-y-1">
              <p><strong>Disaster:</strong> {policyData.disasterId} - {policyData.disasterName}</p>
              <p><strong>Location:</strong> {policyData.counties}, {policyData.state}</p>
              <p><strong>Document Length:</strong> {policyData.plainTextPolicy.length} characters</p>
            </div>
          </div>

          {!processing && progress === 0 && (
            <Button onClick={simulateProcessing} className="w-full">
              <Wand2 className="h-4 w-4 mr-2" />
              Start AI Processing
            </Button>
          )}

          {processing && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">{status}</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {progress === 100 && !processing && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Processing completed successfully!</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <span>AI Processing Workflow</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
              <strong>Step 1: Document Analysis</strong>
              <p>AI extracts key information about assistance programs, award amounts, and eligibility criteria from the plain text.</p>
            </div>
            <div className="p-3 border-l-4 border-green-500 bg-green-50">
              <strong>Step 2: Rule Mapping</strong>
              <p>Identified requirements are mapped to existing rules in the common_rules.py library for consistency.</p>
            </div>
            <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
              <strong>Step 3: Validation</strong>
              <p>The structured policy is validated against the framework's data models and business logic.</p>
            </div>
            <div className="p-3 border-l-4 border-amber-500 bg-amber-50">
              <strong>Step 4: Human Review</strong>
              <p>Generated policy requires human verification before being converted to executable code.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { PolicyTextProcessor as default };
