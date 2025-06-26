
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, CheckCircle, Trash2, AlertTriangle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ConfigureDisasterProps {
  onSave: () => void;
}

interface AssistanceProgram {
  name: string;
  maxAward: number;
  isExpedited: boolean;
  inspectionWaived: boolean;
  rules: string[];
}

const ConfigureDisaster = ({ onSave }: ConfigureDisasterProps) => {
  const [basicInfo, setBasicInfo] = useState({
    disasterId: "",
    disasterName: "",
    state: "",
    counties: "",
    disasterType: "",
    applicationDeadline: "",
  });

  const [assistancePrograms, setAssistancePrograms] = useState<AssistanceProgram[]>([
    {
      name: "Serious Needs Assistance (Regular)",
      maxAward: 770,
      isExpedited: false,
      inspectionWaived: false,
      rules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_inspection_found_minor_damage"]
    }
  ]);

  const [specialProvisions, setSpecialProvisions] = useState({
    expeditedSNA: false,
    cleanSanitizeWaiver: false,
    displacementWaiver: false,
    geofenceActivated: false,
    autoAdjudication: false,
  });

  const availableRules = [
    "rule_is_in_declared_area",
    "rule_passed_validations", 
    "rule_is_in_geofence",
    "rule_reported_immediate_need",
    "rule_inspection_found_minor_damage",
    "rule_is_only_vehicle",
    "rule_vehicle_registered_and_insured",
    "rule_has_insurance_settlement_info",
    "rule_has_repair_bill",
    "rule_has_replacement_proof",
    "rule_is_responsible_for_funeral",
    "rule_death_caused_by_disaster",
    "rule_has_death_certificate",
    "rule_has_funeral_bill"
  ];

  const addProgram = () => {
    setAssistancePrograms([...assistancePrograms, {
      name: "",
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false,
      rules: ["rule_is_in_declared_area", "rule_passed_validations"]
    }]);
  };

  const removeProgram = (index: number) => {
    setAssistancePrograms(assistancePrograms.filter((_, i) => i !== index));
  };

  const updateProgram = (index: number, field: keyof AssistanceProgram, value: any) => {
    const updated = [...assistancePrograms];
    updated[index] = { ...updated[index], [field]: value };
    setAssistancePrograms(updated);
  };

  const addRuleToProgram = (programIndex: number, rule: string) => {
    const updated = [...assistancePrograms];
    if (!updated[programIndex].rules.includes(rule)) {
      updated[programIndex].rules.push(rule);
      setAssistancePrograms(updated);
    }
  };

  const removeRuleFromProgram = (programIndex: number, ruleIndex: number) => {
    const updated = [...assistancePrograms];
    updated[programIndex].rules.splice(ruleIndex, 1);
    setAssistancePrograms(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5 text-green-500" />
          <span>Configure New Disaster</span>
        </CardTitle>
        <CardDescription>
          Set up comprehensive eligibility criteria and program parameters for a new disaster declaration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="programs">Assistance Programs</TabsTrigger>
            <TabsTrigger value="provisions">Special Provisions</TabsTrigger>
            <TabsTrigger value="review">Review & Save</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="disaster-id">Disaster Declaration ID</Label>
                  <Input 
                    id="disaster-id" 
                    placeholder="DR-XXXX-ST-County"
                    value={basicInfo.disasterId}
                    onChange={(e) => setBasicInfo({...basicInfo, disasterId: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="disaster-name">Disaster Name</Label>
                  <Input 
                    id="disaster-name" 
                    placeholder="e.g., Hurricane Milton"
                    value={basicInfo.disasterName}
                    onChange={(e) => setBasicInfo({...basicInfo, disasterName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="state">Affected State</Label>
                  <Select value={basicInfo.state} onValueChange={(value) => setBasicInfo({...basicInfo, state: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="LA">Louisiana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="disaster-type">Disaster Type</Label>
                  <Select value={basicInfo.disasterType} onValueChange={(value) => setBasicInfo({...basicInfo, disasterType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select disaster type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hurricane">Hurricane</SelectItem>
                      <SelectItem value="flooding">Flooding</SelectItem>
                      <SelectItem value="wildfire">Wildfire</SelectItem>
                      <SelectItem value="tornado">Tornado</SelectItem>
                      <SelectItem value="severe_storms">Severe Storms</SelectItem>
                      <SelectItem value="earthquake">Earthquake</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input 
                    id="deadline" 
                    type="date"
                    value={basicInfo.applicationDeadline}
                    onChange={(e) => setBasicInfo({...basicInfo, applicationDeadline: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="counties">Declared Counties</Label>
                  <Textarea 
                    id="counties" 
                    placeholder="List declared counties, separated by commas (e.g., Broome, Tioga, Chenango)"
                    rows={3}
                    value={basicInfo.counties}
                    onChange={(e) => setBasicInfo({...basicInfo, counties: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Assistance Programs</h3>
              <Button onClick={addProgram} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Program
              </Button>
            </div>

            <div className="space-y-4">
              {assistancePrograms.map((program, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`program-name-${index}`}>Program Name</Label>
                          <Input
                            id={`program-name-${index}`}
                            placeholder="e.g., Serious Needs Assistance"
                            value={program.name}
                            onChange={(e) => updateProgram(index, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`max-award-${index}`}>Maximum Award ($)</Label>
                          <Input
                            id={`max-award-${index}`}
                            type="number"
                            placeholder="0.00"
                            value={program.maxAward}
                            onChange={(e) => updateProgram(index, 'maxAward', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                      <Button
                        onClick={() => removeProgram(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={program.isExpedited}
                          onChange={(e) => updateProgram(index, 'isExpedited', e.target.checked)}
                        />
                        <span className="text-sm">Expedited Processing</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={program.inspectionWaived}
                          onChange={(e) => updateProgram(index, 'inspectionWaived', e.target.checked)}
                        />
                        <span className="text-sm">Inspection Waived</span>
                      </label>
                    </div>

                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                        Eligibility Rules ({program.rules.length})
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {program.rules.map((rule, ruleIndex) => (
                            <div key={ruleIndex} className="flex items-center bg-gray-100 rounded px-2 py-1 text-xs">
                              <span className="mr-2">{rule.replace('rule_', '').replace(/_/g, ' ')}</span>
                              <button
                                onClick={() => removeRuleFromProgram(index, ruleIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <Select onValueChange={(value) => addRuleToProgram(index, value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Add eligibility rule" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableRules.filter(rule => !program.rules.includes(rule)).map(rule => (
                              <SelectItem key={rule} value={rule}>
                                {rule.replace('rule_', '').replace(/_/g, ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="provisions" className="space-y-6">
            <h3 className="text-lg font-semibold">Special Disaster Provisions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h4 className="font-semibold mb-3">Processing Enhancements</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={specialProvisions.expeditedSNA}
                      onChange={(e) => setSpecialProvisions({...specialProvisions, expeditedSNA: e.target.checked})}
                    />
                    <div>
                      <span className="font-medium">Expedited Serious Needs Assistance</span>
                      <p className="text-sm text-gray-600">Enable immediate assistance for urgent needs</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={specialProvisions.autoAdjudication}
                      onChange={(e) => setSpecialProvisions({...specialProvisions, autoAdjudication: e.target.checked})}
                    />
                    <div>
                      <span className="font-medium">Auto-Adjudication</span>
                      <p className="text-sm text-gray-600">Automatically approve cases meeting all criteria</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={specialProvisions.geofenceActivated}
                      onChange={(e) => setSpecialProvisions({...specialProvisions, geofenceActivated: e.target.checked})}
                    />
                    <div>
                      <span className="font-medium">Geofence Validation</span>
                      <p className="text-sm text-gray-600">Use GPS coordinates for area verification</p>
                    </div>
                  </label>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-3">Inspection Waivers</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={specialProvisions.cleanSanitizeWaiver}
                      onChange={(e) => setSpecialProvisions({...specialProvisions, cleanSanitizeWaiver: e.target.checked})}
                    />
                    <div>
                      <span className="font-medium">Clean & Sanitize Waiver</span>
                      <p className="text-sm text-gray-600">Waive inspection requirement for cleaning assistance</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={specialProvisions.displacementWaiver}
                      onChange={(e) => setSpecialProvisions({...specialProvisions, displacementWaiver: e.target.checked})}
                    />
                    <div>
                      <span className="font-medium">Displacement Assistance Waiver</span>
                      <p className="text-sm text-gray-600">Waive inspection for temporary lodging assistance</p>
                    </div>
                  </label>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800">Important Note</p>
                      <p className="text-yellow-700">Inspection waivers should only be used when disaster conditions make inspections impractical or unsafe.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-6">
            <h3 className="text-lg font-semibold">Configuration Review</h3>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Disaster ID:</strong> {basicInfo.disasterId || "Not specified"}</p>
                <p><strong>Name:</strong> {basicInfo.disasterName || "Not specified"}</p>
                <p><strong>State:</strong> {basicInfo.state || "Not specified"}</p>
                <p><strong>Counties:</strong> {basicInfo.counties || "Not specified"}</p>
                <p><strong>Type:</strong> {basicInfo.disasterType || "Not specified"}</p>
                <p><strong>Deadline:</strong> {basicInfo.applicationDeadline || "Not specified"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Assistance Programs ({assistancePrograms.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assistancePrograms.map((program, index) => (
                    <div key={index} className="border-l-2 border-blue-500 pl-3">
                      <p className="font-medium">{program.name || `Program ${index + 1}`}</p>
                      <p className="text-sm text-gray-600">Max Award: ${program.maxAward}</p>
                      <p className="text-sm text-gray-600">Rules: {program.rules.length} configured</p>
                      {(program.isExpedited || program.inspectionWaived) && (
                        <p className="text-sm text-green-600">
                          Special: {program.isExpedited ? "Expedited" : ""} {program.inspectionWaived ? "Inspection Waived" : ""}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4 pt-6">
              <Button onClick={onSave} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Disaster Configuration
              </Button>
              <Button variant="outline">Save as Draft</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConfigureDisaster;
