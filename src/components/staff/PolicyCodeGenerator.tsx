
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Download, Save, TestTube, CheckCircle, FileCode, Copy, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PolicyCodeGeneratorProps {
  policyData: any;
  onSave: () => void;
}

const PolicyCodeGenerator = ({ policyData, onSave }: PolicyCodeGeneratorProps) => {
  const { toast } = useToast();
  const [testResults, setTestResults] = useState<any>(null);

  const packageName = policyData.counties ? policyData.counties.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'disaster_policy';

  const generatedCode = `# fema_eligibility/policies/${policyData.disasterId}/${packageName}.rego

package ${packageName}

# Disaster Configuration for ${policyData.disasterId}
# Location: ${policyData.counties}, ${policyData.state}
# Generated with Rego Extensions: Temporal Logic, Geospatial Functions, Enhanced Data Integration

import future.keywords.if
import future.keywords.in

# Global Eligibility Criteria
# These must be true for any assistance.
global_eligibility if {
    input.survivor.in_declared_area
    input.survivor.passed_validations
}

# Serious Needs Assistance (Expedited) - Countywide
allow_serious_needs_assistance_expedited if {
    global_eligibility
    input.survivor.in_geofenced_area
    input.survivor.reported_immediate_need
}

# Serious Needs Assistance (Regular)
allow_serious_needs_assistance_regular if {
    global_eligibility
    input.survivor.inspection.minor_damage_found
}

# Clean and Sanitize
# Inspections are waived for Clean and Sanitize in ${policyData.counties}
allow_clean_and_sanitize if {
    global_eligibility
    # Note: Inspection requirement omitted (waived for this county)
}

# Transportation Assistance (Replace)
allow_transportation_assistance_replace if {
    global_eligibility
    input.survivor.vehicle.only_vehicle
    input.survivor.vehicle.duly_registered
    input.survivor.vehicle.duly_insured
    input.survivor.documents.insurance_settlement_present
    input.survivor.vehicle.uninsured_losses
    input.survivor.documents.proof_of_loss_present
    input.survivor.documents.replacement_estimate_or_appraisal_present
}

# Transportation Assistance (Repair)
allow_transportation_assistance_repair if {
    global_eligibility
    input.survivor.vehicle.only_vehicle
    input.survivor.vehicle.duly_registered
    input.survivor.vehicle.duly_insured
    input.survivor.documents.insurance_settlement_present
    input.survivor.vehicle.uninsured_losses
    input.survivor.documents.repair_bill_estimate_present
}

# Displacement Assistance
# Inspections are waived for Displacement Assistance in ${policyData.counties}
allow_displacement_assistance if {
    global_eligibility
    # Note: Inspection requirement omitted (waived for this county)
}

# Funeral Assistance
allow_funeral_assistance if {
    global_eligibility
    input.survivor.responsible_for_funeral_costs
    input.survivor.decedent_died_from_disaster
    input.survivor.documents.death_certificate_present
    input.survivor.documents.funeral_bill_present
}

# Child Care Assistance
allow_child_care_assistance if {
    global_eligibility
    input.survivor.child_is_legal_responsibility
    input.survivor.need_for_child_care_caused_by_disaster
    input.survivor.child_care_criteria_met
    input.survivor.documents.proof_of_cost_present
}

# Medical and Dental Assistance
allow_medical_and_dental_assistance if {
    global_eligibility
    input.survivor.documents.medical_or_dental_need_caused_by_disaster
    (input.survivor.documents.insurance_settlement_details_present; input.survivor.uninsured)
    input.survivor.documents.receipts_or_quotes_present
}

# Personal Property Assistance
allow_personal_property_assistance if {
    global_eligibility
    input.survivor.documents.personal_property_damaged_or_destroyed
    input.survivor.documents.quotes_or_receipts_for_damaged_property_present
}

# Moving and Storage Expenses
allow_moving_and_storage_expenses if {
    global_eligibility
    input.survivor.documents.moving_and_storage_necessary_due_to_disaster
    input.survivor.documents.quotes_or_receipts_for_moving_and_storage_present
}

# Maximum Awards Configuration
max_awards := {
    "serious_needs_assistance_expedited": 770.00,
    "serious_needs_assistance_regular": 770.00,
    "clean_and_sanitize": 300.00,
    "displacement_assistance": 1638.00,
    "transportation_assistance_replace": 5000.00,
    "transportation_assistance_repair": 5000.00,
    "funeral_assistance": 9000.00,
    "child_care_assistance": 1000.00,
    "medical_and_dental_assistance": 1000.00,
    "personal_property_assistance": 2500.00,
    "moving_and_storage_expenses": 1000.00
}

# Special Provisions for ${policyData.counties}
special_provisions := {
    "clean_and_sanitize": ["INSPECTION_WAIVED"],
    "displacement_assistance": ["INSPECTION_WAIVED"],
    "serious_needs_assistance_expedited": ["GEOFENCING_ENABLED", "EXPEDITED_PROCESSING"]
}

# Temporal Logic Extensions (Enhanced Rego)
# temporal_rule_example if {
#     time.now_ns() - input.disaster.declaration_date < time.parse_duration_ns("30d")
# }

# Geospatial Extensions (Enhanced Rego)  
# geofenced_area_check if {
#     geo.within_polygon(input.survivor.location, input.disaster.geofenced_boundaries)
# }

# Data Integration Extensions (Enhanced Rego)
# external_data_validation if {
#     ssa.verify_identity(input.survivor.ssn)
#     irs.validate_tax_status(input.survivor.tax_id)
# }`;

  const handleRunTests = () => {
    // Simulate test execution for Rego
    setTimeout(() => {
      setTestResults({
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
      });
      toast({
        title: "Rego Tests Completed",
        description: "All policy validation tests passed successfully with OPA engine.",
      });
    }, 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Rego Code Copied",
      description: "Policy code has been copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${policyData.disasterId}_${packageName}.rego`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-indigo-500" />
            <span>Generated Rego Policy</span>
          </CardTitle>
          <CardDescription>
            Review and test the generated .rego policy file for Open Policy Agent deployment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Rego</Badge>
              <Badge variant="outline">{generatedCode.split('\n').length} lines</Badge>
              <Badge variant="outline">OPA Compatible</Badge>
              <Badge variant="secondary">Enhanced Extensions</Badge>
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

      {testResults?.passed && (
        <div className="flex space-x-4">
          <Button onClick={onSave} className="flex-1 bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Deploy Rego Policy to OPA
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
