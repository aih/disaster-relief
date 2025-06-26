import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssistanceProgram {
  name: string;
  max_award: number;
  rules: string[];
}

interface GoverningLaw {
  title: string;
  reference: string;
  description: string;
}

const DISASTER_TYPES = [
  "All Hazards",
  "Emergency Alerts", 
  "Attacks in Public Places",
  "Avalanche",
  "Biohazard Exposure",
  "Cybersecurity",
  "Drought",
  "Earthquakes",
  "Explosions", 
  "Extreme Heat",
  "Floods",
  "Chemicals and Hazardous Materials Incidents",
  "Home Fires",
  "Home Safety",
  "Household Chemical Emergencies",
  "Hurricanes",
  "Landslides & Debris Flow", 
  "Radiation Emergencies",
  "Pandemic",
  "Power Outages",
  "Severe Weather",
  "Space Weather", 
  "Thunderstorms & Lightning",
  "Tornadoes",
  "Tsunamis",
  "Volcanoes",
  "Wildfires",
  "Winter Weather"
];

const AVAILABLE_RULES = [
  "rule_is_in_declared_area",
  "rule_passed_validations", 
  "rule_is_in_geofence",
  "rule_reported_immediate_need",
  "rule_inspection_found_minor_damage",
  "rule_is_only_vehicle",
  "rule_vehicle_registered_and_insured",
  "has_insurance_settlement_info",
  "has_repair_bill",
  "has_replacement_proof",
  "rule_is_responsible_for_funeral",
  "rule_death_caused_by_disaster",
  "has_death_certificate",
  "has_funeral_bill"
];

interface ConfigureDisasterProps {
  onSave: () => void;
}

const ConfigureDisaster = ({ onSave }: ConfigureDisasterProps) => {
  const { toast } = useToast();
  const [disasterName, setDisasterName] = useState("");
  const [disasterType, setDisasterType] = useState("");
  const [declaredCounties, setDeclaredCounties] = useState<string[]>([]);
  const [countyInput, setCountyInput] = useState("");
  const [programs, setPrograms] = useState<AssistanceProgram[]>([]);
  const [specialPolicies, setSpecialPolicies] = useState<string[]>([]);
  const [policyInput, setPolicyInput] = useState("");
  const [governingLaws, setGoverningLaws] = useState<GoverningLaw[]>([]);

  const addCounty = () => {
    if (countyInput.trim() && !declaredCounties.includes(countyInput.trim())) {
      setDeclaredCounties([...declaredCounties, countyInput.trim()]);
      setCountyInput("");
    }
  };

  const removeCounty = (county: string) => {
    setDeclaredCounties(declaredCounties.filter(c => c !== county));
  };

  const addProgram = () => {
    const newProgram: AssistanceProgram = {
      name: "New Program",
      max_award: 0,
      rules: []
    };
    setPrograms([...programs, newProgram]);
  };

  const updateProgram = (index: number, field: keyof AssistanceProgram, value: any) => {
    const updatedPrograms = [...programs];
    updatedPrograms[index] = { ...updatedPrograms[index], [field]: value };
    setPrograms(updatedPrograms);
  };

  const removeProgram = (index: number) => {
    setPrograms(programs.filter((_, i) => i !== index));
  };

  const addRuleToProgram = (programIndex: number, rule: string) => {
    const updatedPrograms = [...programs];
    if (!updatedPrograms[programIndex].rules.includes(rule)) {
      updatedPrograms[programIndex].rules.push(rule);
      setPrograms(updatedPrograms);
    }
  };

  const removeRuleFromProgram = (programIndex: number, rule: string) => {
    const updatedPrograms = [...programs];
    updatedPrograms[programIndex].rules = updatedPrograms[programIndex].rules.filter(r => r !== rule);
    setPrograms(updatedPrograms);
  };

  const addSpecialPolicy = () => {
    if (policyInput.trim() && !specialPolicies.includes(policyInput.trim())) {
      setSpecialPolicies([...specialPolicies, policyInput.trim()]);
      setPolicyInput("");
    }
  };

  const removeSpecialPolicy = (policy: string) => {
    setSpecialPolicies(specialPolicies.filter(p => p !== policy));
  };

  const addGoverningLaw = () => {
    const newLaw: GoverningLaw = {
      title: "",
      reference: "",
      description: ""
    };
    setGoverningLaws([...governingLaws, newLaw]);
  };

  const updateGoverningLaw = (index: number, field: keyof GoverningLaw, value: string) => {
    const updatedLaws = [...governingLaws];
    updatedLaws[index] = { ...updatedLaws[index], [field]: value };
    setGoverningLaws(updatedLaws);
  };

  const removeGoverningLaw = (index: number) => {
    setGoverningLaws(governingLaws.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!disasterName || !disasterType || declaredCounties.length === 0) {
      toast({
        title: "Missing Required Information",
        description: "Please fill in disaster name, type, and at least one county.",
        variant: "destructive"
      });
      return;
    }

    console.log("Saving disaster configuration:", {
      disasterName,
      disasterType,
      declaredCounties,
      programs,
      specialPolicies,
      governingLaws
    });

    onSave();
  };

  return (
    <div className="space-y-6">
      {/* FEMA Header Banner */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 text-white p-6 rounded-lg shadow-lg border-l-4 border-blue-400">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-blue-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Federal Emergency Management Agency</h1>
            <p className="text-blue-100">Disaster Relief Configuration System</p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-blue-900">Basic Information</CardTitle>
          <CardDescription className="text-blue-700">
            Define the core details of the disaster declaration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="disaster-name" className="text-blue-900 font-semibold">Disaster Name/ID *</Label>
              <Input
                id="disaster-name"
                value={disasterName}
                onChange={(e) => setDisasterName(e.target.value)}
                placeholder="e.g., DR-4701-NY-Broome"
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="disaster-type" className="text-blue-900 font-semibold">Disaster Type *</Label>
              <Select value={disasterType} onValueChange={setDisasterType}>
                <SelectTrigger className="border-blue-300 focus:border-blue-500">
                  <SelectValue placeholder="Select disaster type" />
                </SelectTrigger>
                <SelectContent>
                  {DISASTER_TYPES.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '_').replace(/&/g, 'and')}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-blue-900 font-semibold">Declared Counties *</Label>
            <div className="flex space-x-2 mt-2">
              <Input
                value={countyInput}
                onChange={(e) => setCountyInput(e.target.value)}
                placeholder="Enter county name"
                className="border-blue-300 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addCounty()}
              />
              <Button onClick={addCounty} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {declaredCounties.map((county) => (
                <Badge key={county} variant="secondary" className="bg-blue-100 text-blue-800">
                  {county}
                  <button
                    onClick={() => removeCounty(county)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Governing Laws and Regulations */}
      <Card className="border-2 border-purple-200 shadow-lg">
        <CardHeader className="bg-purple-50">
          <CardTitle className="text-purple-900">Governing Laws and Regulations</CardTitle>
          <CardDescription className="text-purple-700">
            Legal framework and regulatory references for this disaster
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <Button onClick={addGoverningLaw} variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            <Plus className="h-4 w-4 mr-2" />
            Add Governing Law
          </Button>

          {governingLaws.map((law, index) => (
            <div key={index} className="border border-purple-200 rounded-lg p-4 space-y-3 bg-purple-25">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-purple-900">Law #{index + 1}</h4>
                <Button
                  onClick={() => removeGoverningLaw(index)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-purple-900 font-medium">Title</Label>
                  <Input
                    value={law.title}
                    onChange={(e) => updateGoverningLaw(index, 'title', e.target.value)}
                    placeholder="e.g., Robert T. Stafford Disaster Relief and Emergency Assistance Act"
                    className="border-purple-300 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <Label className="text-purple-900 font-medium">Legal Reference</Label>
                  <Input
                    value={law.reference}
                    onChange={(e) => updateGoverningLaw(index, 'reference', e.target.value)}
                    placeholder="e.g., 42 U.S.C. § 5121 et seq."
                    className="border-purple-300 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <Label className="text-purple-900 font-medium">Description</Label>
                  <Textarea
                    value={law.description}
                    onChange={(e) => updateGoverningLaw(index, 'description', e.target.value)}
                    placeholder="Brief description of how this law applies to the disaster response"
                    className="border-purple-300 focus:border-purple-500"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Assistance Programs */}
      <Card className="border-2 border-green-200 shadow-lg">
        <CardHeader className="bg-green-50">
          <CardTitle className="text-green-900">Assistance Programs</CardTitle>
          <CardDescription className="text-green-700">
            Configure available assistance programs and their eligibility rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <Button onClick={addProgram} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Program
          </Button>

          {programs.map((program, index) => (
            <div key={index} className="border border-green-200 rounded-lg p-4 space-y-4 bg-green-25">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-green-900">Program #{index + 1}</h4>
                <Button
                  onClick={() => removeProgram(index)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-green-900 font-medium">Program Name</Label>
                  <Input
                    value={program.name}
                    onChange={(e) => updateProgram(index, 'name', e.target.value)}
                    className="border-green-300 focus:border-green-500"
                  />
                </div>
                <div>
                  <Label className="text-green-900 font-medium">Maximum Award ($)</Label>
                  <Input
                    type="number"
                    value={program.max_award}
                    onChange={(e) => updateProgram(index, 'max_award', parseFloat(e.target.value) || 0)}
                    className="border-green-300 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <Label className="text-green-900 font-medium">Eligibility Rules</Label>
                <Select onValueChange={(rule) => addRuleToProgram(index, rule)}>
                  <SelectTrigger className="border-green-300 focus:border-green-500">
                    <SelectValue placeholder="Add eligibility rule" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_RULES.map((rule) => (
                      <SelectItem key={rule} value={rule}>
                        {rule.replace('rule_', '').replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {program.rules.map((rule) => (
                    <Badge key={rule} variant="outline" className="bg-green-100 text-green-800">
                      {rule.replace('rule_', '').replace(/_/g, ' ')}
                      <button
                        onClick={() => removeRuleFromProgram(index, rule)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Special Policies */}
      <Card className="border-2 border-orange-200 shadow-lg">
        <CardHeader className="bg-orange-50">
          <CardTitle className="text-orange-900">Special Policies</CardTitle>
          <CardDescription className="text-orange-700">
            Define special provisions and policy exceptions for this disaster
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex space-x-2">
            <Input
              value={policyInput}
              onChange={(e) => setPolicyInput(e.target.value)}
              placeholder="Enter special policy or provision"
              className="border-orange-300 focus:border-orange-500"
              onKeyPress={(e) => e.key === 'Enter' && addSpecialPolicy()}
            />
            <Button onClick={addSpecialPolicy} className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {specialPolicies.map((policy, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <span className="text-orange-900">{policy}</span>
                <Button
                  onClick={() => removeSpecialPolicy(policy)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Button onClick={handleSave} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
          <Save className="h-5 w-5 mr-2" />
          Save Disaster Configuration
        </Button>
      </div>
    </div>
  );
};

export default ConfigureDisaster;
