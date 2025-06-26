
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2, Wand2, Info, Shield, Clock, MapPin, Database } from "lucide-react";

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
      { progress: 15, status: "Analyzing policy document structure..." },
      { progress: 30, status: "Identifying assistance programs and eligibility criteria..." },
      { progress: 45, status: "Mapping to Rego policy rules..." },
      { progress: 65, status: "Generating temporal and geospatial extensions..." },
      { progress: 80, status: "Validating Rego policy syntax..." },
      { progress: 100, status: "Rego policy generation complete!" }
    ];

    for (const step of steps) {
      setStatus(step.status);
      setProgress(step.progress);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Simulate AI processing result for Rego
    const processedPolicy = {
      packageName: policyData.counties.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      programs: [
        {
          name: "Serious Needs Assistance (Expedited)",
          regoRule: "allow_serious_needs_assistance_expedited",
          maxAward: 770,
          conditions: ["global_eligibility", "in_geofenced_area", "reported_immediate_need"],
          description: "Expedited assistance for immediate needs with geofencing validation"
        },
        {
          name: "Serious Needs Assistance (Regular)",
          regoRule: "allow_serious_needs_assistance_regular",
          maxAward: 770,
          conditions: ["global_eligibility", "inspection.minor_damage_found"],
          description: "Regular SNA requiring inspection verification"
        },
        {
          name: "Clean and Sanitize",
          regoRule: "allow_clean_and_sanitize",
          maxAward: 300,
          conditions: ["global_eligibility"],
          description: "Inspection waived for this county",
          specialProvisions: ["INSPECTION_WAIVED"]
        },
        {
          name: "Displacement Assistance",
          regoRule: "allow_displacement_assistance",
          maxAward: 1638,
          conditions: ["global_eligibility"],
          description: "14 days × $117/day, inspection waived",
          specialProvisions: ["INSPECTION_WAIVED"]
        }
      ],
      globalEligibility: [
        "input.survivor.in_declared_area",
        "input.survivor.passed_validations"
      ],
      regoExtensions: {
        temporal: "Enhanced temporal logic for deadline validation and time-based eligibility",
        geospatial: "Built-in geofencing and spatial validation functions",
        dataIntegration: "Streamlined access to external data sources (SSA, IRS, insurance)"
      }
    };

    setTimeout(() => {
      setProcessing(false);
      onProcessComplete(processedPolicy);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Rego Policy Engine:</strong> This system now uses Open Policy Agent (OPA) with Rego DSL - 
          an open-source, battle-tested policy engine used by major cloud providers and enterprises. 
          Rego provides declarative policy definitions with enhanced validation and testing capabilities.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wand2 className="h-5 w-5 text-purple-500" />
            <span>Rego Policy Processing Engine</span>
          </CardTitle>
          <CardDescription>
            Converting plain-language policy document to Rego rules with enhanced extensions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Input Summary:</h4>
            <div className="text-sm space-y-1">
              <p><strong>Disaster:</strong> {policyData.disasterId} - {policyData.disasterName}</p>
              <p><strong>Location:</strong> {policyData.counties}, {policyData.state}</p>
              <p><strong>Package Name:</strong> {policyData.counties.toLowerCase().replace(/[^a-z0-9]/g, '_')}</p>
              <p><strong>Document Length:</strong> {policyData.plainTextPolicy.length} characters</p>
            </div>
          </div>

          {!processing && progress === 0 && (
            <Button onClick={simulateProcessing} className="w-full">
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Rego Policy (Demo)
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
              <span className="text-sm font-medium">Rego policy generation completed successfully!</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-indigo-500" />
            <span>Rego Extensions & Enhancements</span>
          </CardTitle>
          <CardDescription>
            Enhanced capabilities beyond standard Open Policy Agent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 border-l-4 border-amber-500 bg-amber-50">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-amber-600" />
                <strong className="text-amber-800">Temporal Logic</strong>
              </div>
              <p className="text-amber-700">Built-in support for time-based rules, deadlines, and event sequencing. Simplifies policies dependent on timing constraints.</p>
            </div>
            <div className="p-3 border-l-4 border-green-500 bg-green-50">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <strong className="text-green-800">Geospatial Functions</strong>
              </div>
              <p className="text-green-700">Native geofencing, point-in-polygon, and distance calculations. Enables location-based eligibility without external tools.</p>
            </div>
            <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
              <div className="flex items-center space-x-2 mb-2">
                <Database className="h-4 w-4 text-blue-600" />
                <strong className="text-blue-800">Data Integration</strong>
              </div>
              <p className="text-blue-700">Streamlined access to SSA, IRS, insurance, and commercial data sources through built-in functions and plugins.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-blue-500" />
            <span>Rego Policy Workflow</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
              <strong>Step 1: Policy Analysis</strong>
              <p>AI extracts eligibility criteria and maps them to Rego rule structures with proper boolean logic.</p>
            </div>
            <div className="p-3 border-l-4 border-green-500 bg-green-50">
              <strong>Step 2: Rule Generation</strong>
              <p>Creates declarative Rego rules with global eligibility conditions and program-specific requirements.</p>
            </div>
            <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
              <strong>Step 3: Extension Integration</strong>
              <p>Incorporates temporal, geospatial, and data integration extensions for enhanced functionality.</p>
            </div>
            <div className="p-3 border-l-4 border-amber-500 bg-amber-50">
              <strong>Step 4: Validation & Testing</strong>
              <p>Validates Rego syntax and tests policy logic against OPA engine before deployment.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { PolicyTextProcessor as default };
