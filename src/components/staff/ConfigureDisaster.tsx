
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { 
  ConfigureDisasterProps, 
  AssistanceProgram, 
  GoverningLaw, 
  BasicInfo, 
  SpecialProvisions 
} from "./configure-disaster/types";
import { predefinedAssistanceTypes } from "./configure-disaster/constants";
import BasicInfoTab from "./configure-disaster/BasicInfoTab";
import AssistanceProgramsTab from "./configure-disaster/AssistanceProgramsTab";
import SpecialProvisionsTab from "./configure-disaster/SpecialProvisionsTab";
import ReviewTab from "./configure-disaster/ReviewTab";

const ConfigureDisaster = ({ onSave }: ConfigureDisasterProps) => {
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
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

  const [specialProvisions, setSpecialProvisions] = useState<SpecialProvisions>({
    expeditedSNA: false,
    cleanSanitizeWaiver: false,
    displacementWaiver: false,
    geofenceActivated: false,
    autoAdjudication: false,
  });

  // Basic Info handlers
  const updateBasicInfo = (updates: Partial<BasicInfo>) => {
    setBasicInfo(prev => ({ ...prev, ...updates }));
  };

  // Governing Laws handlers
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

  // Assistance Programs handlers
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

  // Special Provisions handlers
  const updateSpecialProvisions = (updates: Partial<SpecialProvisions>) => {
    setSpecialProvisions(prev => ({ ...prev, ...updates }));
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

          <TabsContent value="basic">
            <BasicInfoTab
              basicInfo={basicInfo}
              onUpdateBasicInfo={updateBasicInfo}
              governingLaws={governingLaws}
              onAddGoverningLaw={addGoverningLaw}
              onUpdateGoverningLaw={updateGoverningLaw}
              onRemoveGoverningLaw={removeGoverningLaw}
            />
          </TabsContent>

          <TabsContent value="programs">
            <AssistanceProgramsTab
              assistancePrograms={assistancePrograms}
              onAddProgram={addProgram}
              onRemoveProgram={removeProgram}
              onUpdateProgram={updateProgram}
              onProgramTypeChange={handleProgramTypeChange}
              onAddRuleToProgram={addRuleToProgram}
              onRemoveRuleFromProgram={removeRuleFromProgram}
            />
          </TabsContent>

          <TabsContent value="provisions">
            <SpecialProvisionsTab
              specialProvisions={specialProvisions}
              onUpdateSpecialProvisions={updateSpecialProvisions}
            />
          </TabsContent>

          <TabsContent value="review">
            <ReviewTab
              basicInfo={basicInfo}
              assistancePrograms={assistancePrograms}
              governingLaws={governingLaws}
              onSave={onSave}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConfigureDisaster;
