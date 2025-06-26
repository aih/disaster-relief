
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileCode, Wand2, CheckCircle, AlertCircle, Download } from "lucide-react";
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
    generatedCode: ""
  });

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
      description: "Python policy file has been generated successfully.",
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
          Transform plain-language policy documents into executable policy.py files using our AI-powered framework
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">How the Policy Engine Works</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>• <strong>Configuration as Code:</strong> Each disaster policy is a Python module (policy.py) with eligibility rules</p>
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

          <TabsContent value="input" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="disaster-id">Disaster Declaration ID</Label>
                  <Input 
                    id="disaster-id" 
                    placeholder="DR-XXXX-ST-County"
                    value={policyData.disasterId}
                    onChange={(e) => setPolicyData(prev => ({ ...prev, disasterId: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="disaster-name">Disaster Name</Label>
                  <Input 
                    id="disaster-name" 
                    placeholder="e.g., Hurricane Milton"
                    value={policyData.disasterName}
                    onChange={(e) => setPolicyData(prev => ({ ...prev, disasterName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select value={policyData.state} onValueChange={(value) => setPolicyData(prev => ({ ...prev, state: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="counties">Affected Counties</Label>
                  <Input 
                    id="counties" 
                    placeholder="e.g., Broome, Tioga"
                    value={policyData.counties}
                    onChange={(e) => setPolicyData(prev => ({ ...prev, counties: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="disaster-type">Disaster Type</Label>
                  <Select value={policyData.disasterType} onValueChange={(value) => setPolicyData(prev => ({ ...prev, disasterType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select disaster type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hurricane">Hurricane</SelectItem>
                      <SelectItem value="flooding">Flooding</SelectItem>
                      <SelectItem value="wildfire">Wildfire</SelectItem>
                      <SelectItem value="tornado">Tornado</SelectItem>
                      <SelectItem value="severe_storms">Severe Storms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="policy-text">Policy Document (Plain Text)</Label>
              <Textarea 
                id="policy-text"
                placeholder="Paste the plain-language policy document here. Include details about:
- Available assistance programs and maximum awards
- Eligibility requirements for each program
- Special provisions or waivers
- Documentation requirements
- Any expedited processing criteria

Example: 'For Broome County, expedited Serious Needs Assistance up to $770 is available for immediate needs. Clean and Sanitize assistance up to $300 requires no inspection...'"
                rows={12}
                className="font-mono text-sm"
                value={policyData.plainTextPolicy}
                onChange={(e) => setPolicyData(prev => ({ ...prev, plainTextPolicy: e.target.value }))}
              />
            </div>

            <Button 
              onClick={() => setCurrentStep("process")}
              disabled={!policyData.disasterId || !policyData.plainTextPolicy}
              className="w-full"
            >
              Process Policy Text with AI
            </Button>
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
