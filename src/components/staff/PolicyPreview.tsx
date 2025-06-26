
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, AlertTriangle, Code, DollarSign, FileText } from "lucide-react";

interface PolicyPreviewProps {
  structuredPolicy: any;
  onGenerateCode: (code: string) => void;
}

const PolicyPreview = ({ structuredPolicy, onGenerateCode }: PolicyPreviewProps) => {
  if (!structuredPolicy) {
    return (
      <div className="text-center py-8 text-gray-500">
        No policy data to preview. Please process the policy text first.
      </div>
    );
  }

  const handleGenerateCode = () => {
    // Simulate code generation
    const generatedCode = `# fema_eligibility/configs/DR-4701-NY-Broome/policy.py

from fema_eligibility.abstractions import AssistanceProgram, Disaster
from fema_eligibility.common_rules import *

def get_config() -> Disaster:
    """
    Defines the eligibility policy for Broome County under disaster DR-4701-NY.
    
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
        rules=[rule_is_in_declared_area, rule_passed_validations]
    )
    
    displacement_assistance = AssistanceProgram(
        name="Displacement Assistance",
        max_award=1638.00,  # 14 days * $117/day
        rules=[rule_is_in_declared_area, rule_passed_validations]
    )

    return Disaster(
        name="DR-4701-NY-Broome",
        declared_counties={'Broome'},
        programs=[sna_expedited, sna_regular, clean_sanitize, displacement_assistance]
    )`;

    onGenerateCode(generatedCode);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-green-500" />
            <span>Structured Policy Preview</span>
          </CardTitle>
          <CardDescription>
            Review the AI-generated policy structure before generating executable code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Special Policies Section */}
            {structuredPolicy.specialPolicies && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span>Special Policy Provisions</span>
                </h3>
                <div className="space-y-2">
                  {structuredPolicy.specialPolicies.map((policy: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-amber-50 rounded">
                      <CheckCircle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm">{policy}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Programs Table */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span>Assistance Programs</span>
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program Name</TableHead>
                    <TableHead>Max Award</TableHead>
                    <TableHead>Rules Required</TableHead>
                    <TableHead>Special Provisions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {structuredPolicy.programs.map((program: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{program.name}</TableCell>
                      <TableCell>${program.maxAward.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {program.rules.map((rule: string, ruleIndex: number) => (
                            <Badge key={ruleIndex} variant="outline" className="text-xs">
                              {rule.replace('rule_', '').replace(/_/g, ' ')}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {program.specialProvisions?.map((provision: string, provIndex: number) => (
                          <Badge key={provIndex} variant="secondary" className="text-xs">
                            {provision}
                          </Badge>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Rule Mapping */}
            <div>
              <h3 className="font-semibold mb-3">Rule Library Mapping</h3>
              <div className="grid gap-2">
                {Object.entries(structuredPolicy.ruleMapping).map(([rule, description]) => (
                  <div key={rule} className="p-3 border rounded-lg">
                    <div className="font-mono text-sm text-blue-600">{rule}</div>
                    <div className="text-sm text-gray-600">{description as string}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button onClick={handleGenerateCode} className="flex-1">
          <Code className="h-4 w-4 mr-2" />
          Generate Policy.py Code
        </Button>
        <Button variant="outline">
          Request Modifications
        </Button>
      </div>
    </div>
  );
};

export { PolicyPreview as default };
