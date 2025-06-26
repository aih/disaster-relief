
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Download, Copy, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodePreviewProps {
  generatedCode: string;
  policyData: any;
}

const CodePreview = ({ generatedCode, policyData }: CodePreviewProps) => {
  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Rego Code Copied",
      description: "Policy code has been copied to clipboard.",
    });
  };

  const handleDownload = () => {
    const packageName = policyData.counties ? policyData.counties.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'disaster_policy';
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${policyData.disasterId}_${packageName}.rego`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
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
  );
};

export default CodePreview;
