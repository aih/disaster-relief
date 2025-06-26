
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, AlertTriangle, Code, DollarSign, FileText, Shield } from "lucide-react";

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
    // Generate Rego policy code
    const regoCode = `package ${structuredPolicy.packageName}

# Global Eligibility Criteria
# These must be true for any assistance.
global_eligibility {
    ${structuredPolicy.globalEligibility.join('\n    ')}
}

${structuredPolicy.programs.map((program: any) => `
# ${program.description}
${program.regoRule} {
    ${program.conditions.join('\n    ')}
}`).join('\n')}

# Maximum Awards Configuration
max_awards := {
    ${structuredPolicy.programs.map((program: any) => 
        `"${program.regoRule}": ${program.maxAward}`
    ).join(',\n    ')}
}

# Special Provisions
special_provisions := {
    ${structuredPolicy.programs
        .filter((program: any) => program.specialProvisions)
        .map((program: any) => 
            `"${program.regoRule}": [${program.specialProvisions.map((p: string) => `"${p}"`).join(', ')}]`
        ).join(',\n    ')}
}`;

    onGenerateCode(regoCode);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-indigo-500" />
            <span>Rego Policy Preview</span>
          </CardTitle>
          <CardDescription>
            Review the generated Rego policy structure before generating executable code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Package Information */}
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center space-x-2">
                <FileText className="h-4 w-4 text-indigo-600" />
                <span>Policy Package</span>
              </h3>
              <div className="text-sm space-y-1">
                <p><strong>Package Name:</strong> <code className="bg-white px-2 py-1 rounded">{structuredPolicy.packageName}</code></p>
                <p><strong>Global Eligibility Rules:</strong> {structuredPolicy.globalEligibility.length} conditions</p>
                <p><strong>Program Rules:</strong> {structuredPolicy.programs.length} assistance programs</p>
              </div>
            </div>

            {/* Rego Extensions */}
            {structuredPolicy.regoExtensions && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span>Enhanced Rego Extensions</span>
                </h3>
                <div className="grid gap-3">
                  {Object.entries(structuredPolicy.regoExtensions).map(([key, description]) => (
                    <div key={key} className="flex items-start space-x-2 p-2 bg-amber-50 rounded">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium capitalize">{key}:</span>
                        <span className="text-sm ml-1">{description as string}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Global Eligibility */}
            <div>
              <h3 className="font-semibold mb-3">Global Eligibility Conditions</h3>
              <div className="space-y-2">
                {structuredPolicy.globalEligibility.map((condition: string, index: number) => (
                  <div key={index} className="p-2 border rounded bg-gray-50">
                    <code className="text-sm text-blue-600">{condition}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Programs Table */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span>Assistance Programs & Rules</span>
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program Name</TableHead>
                    <TableHead>Rego Rule</TableHead>
                    <TableHead>Max Award</TableHead>
                    <TableHead>Conditions</TableHead>
                    <TableHead>Special Provisions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {structuredPolicy.programs.map((program: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{program.name}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-blue-100 px-2 py-1 rounded">{program.regoRule}</code>
                      </TableCell>
                      <TableCell>${program.maxAward.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {program.conditions.map((condition: string, condIndex: number) => (
                            <Badge key={condIndex} variant="outline" className="text-xs block w-fit">
                              {condition}
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
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button onClick={handleGenerateCode} className="flex-1">
          <Code className="h-4 w-4 mr-2" />
          Generate Rego Policy Code
        </Button>
        <Button variant="outline">
          Request Modifications
        </Button>
      </div>
    </div>
  );
};

export { PolicyPreview as default };
