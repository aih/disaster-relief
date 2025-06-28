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
  programType: string;
  maxAward: number;
  isExpedited: boolean;
  inspectionWaived: boolean;
  rules: string[];
  subjectToCap: string;
  definition: string;
}

interface GoverningLaw {
  id: string;
  title: string;
  reference: string;
  description: string;
}

const ConfigureDisaster = ({ onSave }: ConfigureDisasterProps) => {
  const [basicInfo, setBasicInfo] = useState({
    disasterId: "",
    disasterName: "",
    state: "",
    counties: "",
    disasterType: "",
    otherDisasterType: "",
    applicationDeadline: "",
    disasterStartDate: "",
  });

  const [governingLaws, setGoverningLaws] = useState<GoverningLaw[]>([]);

  const [assistancePrograms, setAssistancePrograms] = useState<AssistanceProgram[]>([
    {
      name: "Serious Needs Assistance (Regular)",
      programType: "serious_needs_regular",
      maxAward: 770,
      isExpedited: false,
      inspectionWaived: false,
      rules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_inspection_found_minor_damage"],
      subjectToCap: "Yes (ONA)",
      definition: "Funding to support the purchase of life-sustaining goods (e.g., medication, food, baby formula, diapers, etc.)"
    }
  ]);

  const predefinedAssistanceTypes = {
    serious_needs_regular: {
      name: "Serious Needs Regular",
      definition: "Funding to support the purchase of life-sustaining goods (e.g., medication, food, baby formula, diapers, etc.)",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_inspection_found_minor_damage"],
      maxAward: 770,
      isExpedited: false,
      inspectionWaived: false
    },
    serious_needs_expedited: {
      name: "Serious Needs Assistance Expedited",
      definition: "Immediate funding to support the purchase of life-sustaining goods without inspection",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_is_in_geofence", "rule_reported_immediate_need"],
      maxAward: 770,
      isExpedited: true,
      inspectionWaived: true
    },
    clean_and_sanitize: {
      name: "Clean and Sanitize",
      definition: "Immediate funding to support clean-up of damaged homes to prevent mold growth",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations"],
      maxAward: 300,
      isExpedited: false,
      inspectionWaived: true
    },
    rental_assistance_initial: {
      name: "Rental Assistance (Initial)",
      definition: "Funding to support rental of a non-damaged property while developing permanent housing plan",
      subjectToCap: "No",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_displacement_verified"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    rental_assistance_continuing: {
      name: "Rental Assistance (Continuing)",
      definition: "Continuing funding for rental assistance with income calculations required",
      subjectToCap: "No",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_income_verified"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    lodging_expense_reimbursement: {
      name: "Lodging Expense Reimbursement (LER)",  
      definition: "Funding to reimburse survivor for temporary lodging in immediate aftermath",
      subjectToCap: "No",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_has_lodging_receipts"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    home_repair_replacement: {
      name: "Home Repair or Replacement",
      definition: "Funding to repair or replace a damaged home subject to statutory cap",
      subjectToCap: "Yes (HA)",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_inspection_found_minor_damage", "rule_has_insurance_settlement_info"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    transportation_repair: {
      name: "Transportation Assistance Repair",
      definition: "Funding to repair a damaged vehicle",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_passed_validations", "rule_is_only_vehicle", "rule_vehicle_registered_and_insured", "rule_has_insurance_settlement_info", "rule_has_repair_bill"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    transportation_replacement: {
      name: "Transportation Assistance Replacement",
      definition: "Funding to replace a destroyed vehicle",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_passed_validations", "rule_is_only_vehicle", "rule_vehicle_registered_and_insured", "rule_has_insurance_settlement_info", "rule_has_replacement_proof"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    funeral_assistance: {
      name: "Funeral Assistance",
      definition: "Funding to cover interment, reinterment, and/or cremation expenses",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_passed_validations", "rule_is_responsible_for_funeral", "rule_death_caused_by_disaster", "rule_has_death_certificate", "rule_has_funeral_bill"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    child_care_assistance: {
      name: "Child Care Assistance",
      definition: "Funding to cover disaster-caused childcare need",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_has_child_care_receipts"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    displacement_assistance: {
      name: "Displacement Assistance",
      definition: "Funding to reimburse survivor for temporary lodging (14 days prior to rental assistance)",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: true
    },
    medical_dental_assistance: {
      name: "Medical and Dental Assistance",
      definition: "Funding to reimburse survivor for disaster-caused medical/dental expenses",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_has_medical_receipts"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    personal_property_assistance: {
      name: "Personal Property Assistance",
      definition: "Funding to reimburse survivor for disaster-caused losses of specific items",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_inspection_found_minor_damage"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    moving_storage_expenses: {
      name: "Moving and Storage Expenses",
      definition: "Funding to reimburse survivor for moving/storing belongings from damaged structure",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_has_moving_receipts"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    miscellaneous_items: {
      name: "Miscellaneous Items",
      definition: "Reimbursement for certain items on disaster-by-disaster basis",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_has_receipts"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    generators: {
      name: "Generators",
      definition: "Reimbursement for purchase of temporary generators for disaster-impacted dwelling",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_needs_medical_power"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    },
    custom: {
      name: "Custom Program",
      definition: "Create a custom assistance program",
      subjectToCap: "Yes (ONA)",
      defaultRules: ["rule_is_in_declared_area", "rule_passed_validations"],
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false
    }
  };

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

  const usStates = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
    { code: "DC", name: "District of Columbia" },
    { code: "PR", name: "Puerto Rico" },
    { code: "VI", name: "Virgin Islands" },
    { code: "GU", name: "Guam" },
    { code: "AS", name: "American Samoa" },
    { code: "MP", name: "Northern Mariana Islands" }
  ];

  const disasterTypes = [
    "All Hazards",
    "Attacks in Public Places",
    "Avalanche",
    "Biohazard Exposure",
    "Chemicals and Hazardous Materials Incidents",
    "Cybersecurity",
    "Drought",
    "Earthquakes",
    "Emergency Alerts",
    "Explosions",
    "Extreme Heat",
    "Floods",
    "Home Fires",
    "Home Safety",
    "Household Chemical Emergencies",
    "Hurricanes",
    "Landslides & Debris Flow",
    "Pandemic",
    "Power Outages",
    "Radiation Emergencies",
    "Severe Weather",
    "Space Weather",
    "Thunderstorms & Lightning",
    "Tornadoes",
    "Tsunamis",
    "Volcanoes",
    "Wildfires",
    "Winter Weather",
    "Other"
  ];

  const addGoverningLaw = () => {
    const newLaw: GoverningLaw = {
      id: `law_${Date.now()}`,
      title: "",
      reference: "",
      description: ""
    };
    setGoverningLaws([...governingLaws, newLaw]);
  };

  const updateGoverningLaw = (id: string, field: keyof Omit<GoverningLaw, 'id'>, value: string) => {
    setGoverningLaws(laws => laws.map(law => 
      law.id === id ? { ...law, [field]: value } : law
    ));
  };

  const removeGoverningLaw = (id: string) => {
    setGoverningLaws(laws => laws.filter(law => law.id !== id));
  };

  const addProgram = () => {
    setAssistancePrograms([...assistancePrograms, {
      name: "",
      programType: "",
      maxAward: 0,
      isExpedited: false,
      inspectionWaived: false,
      rules: ["rule_is_in_declared_area", "rule_passed_validations"],
      subjectToCap: "Yes (ONA)",
      definition: ""
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

  const handleProgramTypeChange = (index: number, programType: string) => {
    if (programType in predefinedAssistanceTypes) {
      const preset = predefinedAssistanceTypes[programType as keyof typeof predefinedAssistanceTypes];
      const updated = [...assistancePrograms];
      updated[index] = {
        ...updated[index],
        programType: programType,
        name: preset.name,
        definition: preset.definition,
        subjectToCap: preset.subjectToCap,
        rules: [...preset.defaultRules],
        maxAward: preset.maxAward,
        isExpedited: preset.isExpedited,
        inspectionWaived: preset.inspectionWaived
      };
      setAssistancePrograms(updated);
    } else {
      updateProgram(index, 'programType', programType);
    }
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
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {usStates.map(state => (
                        <SelectItem key={state.code} value={state.code}>
                          {state.name} ({state.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="disaster-start-date">Disaster Start Date</Label>
                  <Input 
                    id="disaster-start-date" 
                    type="date"
                    value={basicInfo.disasterStartDate}
                    onChange={(e) => setBasicInfo({...basicInfo, disasterStartDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="disaster-type">Disaster Type</Label>
                  <Select value={basicInfo.disasterType} onValueChange={(value) => setBasicInfo({...basicInfo, disasterType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select disaster type" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {disasterTypes.map(type => (
                        <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '_').replace(/&/g, 'and')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {basicInfo.disasterType === 'other' && (
                  <div>
                    <Label htmlFor="other-disaster-type">Specify Other Disaster Type</Label>
                    <Input 
                      id="other-disaster-type" 
                      placeholder="Enter disaster type"
                      value={basicInfo.otherDisasterType}
                      onChange={(e) => setBasicInfo({...basicInfo, otherDisasterType: e.target.value})}
                    />
                  </div>
                )}
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

            {/* Governing Laws and Regulations Section */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Governing Laws and Regulations</CardTitle>
                    <CardDescription>
                      Add applicable federal and state laws that govern this disaster assistance
                    </CardDescription>
                  </div>
                  <Button onClick={addGoverningLaw} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Law
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {governingLaws.length === 0 ? (
                  <p className="text-gray-500 text-sm">No governing laws added yet. Click "Add Law" to get started.</p>
                ) : (
                  <div className="space-y-4">
                    {governingLaws.map((law) => (
                      <div key={law.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`law-title-${law.id}`}>Title</Label>
                              <Input
                                id={`law-title-${law.id}`}
                                placeholder="e.g., Stafford Act"
                                value={law.title}
                                onChange={(e) => updateGoverningLaw(law.id, 'title', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`law-reference-${law.id}`}>Reference</Label>
                              <Input
                                id={`law-reference-${law.id}`}
                                placeholder="e.g., 42 U.S.C. § 5121"
                                value={law.reference}
                                onChange={(e) => updateGoverningLaw(law.id, 'reference', e.target.value)}
                              />
                            </div>
                          </div>
                          <Button
                            onClick={() => removeGoverningLaw(law.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div>
                          <Label htmlFor={`law-description-${law.id}`}>Description/Relevance</Label>
                          <Textarea
                            id={`law-description-${law.id}`}
                            placeholder="Describe how this law applies to the disaster assistance..."
                            rows={2}
                            value={law.description}
                            onChange={(e) => updateGoverningLaw(law.id, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
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
                      <div className="flex-1 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`program-type-${index}`}>Program Type</Label>
                            <Select 
                              value={program.programType} 
                              onValueChange={(value) => handleProgramTypeChange(index, value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select program type or create custom" />
                              </SelectTrigger>
                              <SelectContent className="max-h-60 overflow-y-auto">
                                <SelectItem value="serious_needs_regular">Serious Needs Regular</SelectItem>
                                <SelectItem value="serious_needs_expedited">Serious Needs Expedited</SelectItem>
                                <SelectItem value="clean_and_sanitize">Clean and Sanitize</SelectItem>
                                <SelectItem value="rental_assistance_initial">Rental Assistance (Initial)</SelectItem>
                                <SelectItem value="rental_assistance_continuing">Rental Assistance (Continuing)</SelectItem>
                                <SelectItem value="lodging_expense_reimbursement">Lodging Expense Reimbursement</SelectItem>
                                <SelectItem value="home_repair_replacement">Home Repair or Replacement</SelectItem>
                                <SelectItem value="transportation_repair">Transportation Repair</SelectItem>
                                <SelectItem value="transportation_replacement">Transportation Replacement</SelectItem>
                                <SelectItem value="funeral_assistance">Funeral Assistance</SelectItem>
                                <SelectItem value="child_care_assistance">Child Care Assistance</SelectItem>
                                <SelectItem value="displacement_assistance">Displacement Assistance</SelectItem>
                                <SelectItem value="medical_dental_assistance">Medical and Dental Assistance</SelectItem>
                                <SelectItem value="personal_property_assistance">Personal Property Assistance</SelectItem>
                                <SelectItem value="moving_storage_expenses">Moving and Storage Expenses</SelectItem>
                                <SelectItem value="miscellaneous_items">Miscellaneous Items</SelectItem>
                                <SelectItem value="generators">Generators</SelectItem>
                                <SelectItem value="custom">Custom Program</SelectItem>
                              </SelectContent>
                            </Select>
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
                        
                        <div>
                          <Label htmlFor={`program-name-${index}`}>Program Name</Label>
                          <Input
                            id={`program-name-${index}`}
                            placeholder="Enter program name"
                            value={program.name}
                            onChange={(e) => updateProgram(index, 'name', e.target.value)}
                          />
                        </div>

                        {program.definition && (
                          <div>
                            <Label htmlFor={`program-definition-${index}`}>Program Definition</Label>
                            <Textarea
                              id={`program-definition-${index}`}
                              value={program.definition}
                              onChange={(e) => updateProgram(index, 'definition', e.target.value)}
                              rows={2}
                              className="text-sm"
                            />
                          </div>
                        )}

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor={`subject-to-cap-${index}`}>Subject to Cap</Label>
                            <Input
                              id={`subject-to-cap-${index}`}
                              value={program.subjectToCap}
                              onChange={(e) => updateProgram(index, 'subjectToCap', e.target.value)}
                              placeholder="Yes (ONA)"
                            />
                          </div>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={program.isExpedited}
                                onChange={(e) => updateProgram(index, 'isExpedited', e.target.checked)}
                              />
                              <span className="text-sm">Expedited</span>
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
                <p><strong>State:</strong> {basicInfo.state ? usStates.find(s => s.code === basicInfo.state)?.name : "Not specified"}</p>
                <p><strong>Counties:</strong> {basicInfo.counties || "Not specified"}</p>
                <p><strong>Type:</strong> {basicInfo.disasterType === 'other' ? basicInfo.otherDisasterType : basicInfo.disasterType || "Not specified"}</p>
                <p><strong>Start Date:</strong> {basicInfo.disasterStartDate || "Not specified"}</p>
                <p><strong>Application Deadline:</strong> {basicInfo.applicationDeadline || "Not specified"}</p>
                {governingLaws.length > 0 && (
                  <div>
                    <strong>Governing Laws ({governingLaws.length}):</strong>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {governingLaws.map(law => (
                        <li key={law.id} className="text-sm">
                          {law.title} {law.reference && `(${law.reference})`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
