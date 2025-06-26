
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileCode, Wand2, CheckCircle } from "lucide-react";
import PolicyInputForm from "./PolicyInputForm";
import PolicyTextProcessor from "./PolicyTextProcessor";
import PolicyPreview from "./PolicyPreview";
import PolicyCodeGenerator from "./PolicyCodeGenerator";

const PolicyCreation = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState("input");
  const [policyData, setPolicyData] = useState({
    disasterName: "",
    disasterId: "",
    state: "",
    counties: "",
    disasterType: "",
    plainTextPolicy: "",
    structuredPolicy: null as any,
    generatedCode: "",
    governingItems: [] as string[]
  });

  const handleUpdatePolicyData = (updates: any) => {
    setPolicyData(prev => ({ ...prev, ...updates }));
  };

  const handleProcessText = (processedPolicy: any) => {
    setPolicyData(prev => ({ ...prev, structuredPolicy: processedPolicy }));
    setCurrentStep("preview");
    toast({
      title: "Policy Processed",
      description: "Plain text has been converted to structured policy format.",
    });
  };

  const handleGenerateCode = (code: string) => {
    setPolicyData(prev => ({ ...prev, generatedCode: code }));
    setCurrentStep("code");
    toast({
      title: "Policy Code Generated",
      description: "Policy file has been generated successfully.",
    });
  };

  const handleSavePolicy = () => {
    toast({
      title: "Policy Saved",
      description: `Policy ${policyData.disasterId} has been saved and is ready for deployment.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileCode className="h-5 w-5 text-indigo-500" />
          <span>AI-Assisted Policy Creation Portal</span>
        </CardTitle>
        <CardDescription>
          Transform plain-language policy documents into executable policy files using our AI-powered framework
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">How the Policy Engine Works</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>• <strong>Configuration as Code:</strong> Each disaster policy is a structured module with eligibility rules</p>
            <p>• <strong>Reusable Rules:</strong> Common rules like "is in declared area" are shared across all policies</p>
            <p>• <strong>Dynamic Loading:</strong> New policies are automatically discovered without system changes</p>
            <p>• <strong>AI Translation:</strong> Plain text policy documents are converted to structured code using LLMs</p>
          </div>
        </div>

        <Tabs value={currentStep} onValueChange={setCurrentStep}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="input" className="flex items-center space-x-2">
              <span>1. Input</span>
            </TabsTrigger>
            <TabsTrigger value="process" className="flex items-center space-x-2">
              <Wand2 className="h-4 w-4" />
              <span>2. Process</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>3. Preview</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center space-x-2">
              <FileCode className="h-4 w-4" />
              <span>4. Generate</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input">
            <PolicyInputForm
              policyData={policyData}
              onUpdate={handleUpdatePolicyData}
              onNext={() => setCurrentStep("process")}
            />
          </TabsContent>

          <TabsContent value="process">
            <PolicyTextProcessor 
              policyData={policyData}
              onProcessComplete={handleProcessText}
            />
          </TabsContent>

          <TabsContent value="preview">
            <PolicyPreview 
              structuredPolicy={policyData.structuredPolicy}
              onGenerateCode={handleGenerateCode}
            />
          </TabsContent>

          <TabsContent value="code">
            <PolicyCodeGenerator 
              policyData={policyData}
              onSave={handleSavePolicy}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PolicyCreation;
