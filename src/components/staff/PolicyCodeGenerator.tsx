
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CodePreview from "./policy-code/CodePreview";
import PolicyTesting from "./policy-code/PolicyTesting";
import { generateRegoCode } from "./policy-code/generateRegoCode";

interface PolicyCodeGeneratorProps {
  policyData: any;
  onSave: () => void;
}

const PolicyCodeGenerator = ({ policyData, onSave }: PolicyCodeGeneratorProps) => {
  const { toast } = useToast();
  const [testResults, setTestResults] = useState<any>(null);

  const generatedCode = generateRegoCode(policyData);

  const handleTestComplete = (results: any) => {
    setTestResults(results);
  };

  return (
    <div className="space-y-6">
      <CodePreview generatedCode={generatedCode} policyData={policyData} />
      
      <PolicyTesting onTestComplete={handleTestComplete} />

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
