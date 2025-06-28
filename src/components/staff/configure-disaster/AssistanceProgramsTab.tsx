
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AssistanceProgram } from "./types";
import { predefinedAssistanceTypes } from "./constants";
import AssistanceProgramCard from "./AssistanceProgramCard";

interface AssistanceProgramsTabProps {
  assistancePrograms: AssistanceProgram[];
  onAddProgram: () => void;
  onRemoveProgram: (index: number) => void;
  onUpdateProgram: (index: number, field: keyof AssistanceProgram, value: any) => void;
  onProgramTypeChange: (index: number, programType: string) => void;
  onAddRuleToProgram: (programIndex: number, rule: string) => void;
  onRemoveRuleFromProgram: (programIndex: number, ruleIndex: number) => void;
}

const AssistanceProgramsTab = ({
  assistancePrograms,
  onAddProgram,
  onRemoveProgram,
  onUpdateProgram,
  onProgramTypeChange,
  onAddRuleToProgram,
  onRemoveRuleFromProgram
}: AssistanceProgramsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Assistance Programs</h3>
        <Button onClick={onAddProgram} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Program
        </Button>
      </div>

      <div className="space-y-4">
        {assistancePrograms.map((program, index) => (
          <AssistanceProgramCard
            key={index}
            program={program}
            index={index}
            onUpdate={onUpdateProgram}
            onRemove={onRemoveProgram}
            onProgramTypeChange={onProgramTypeChange}
            onAddRule={onAddRuleToProgram}
            onRemoveRule={onRemoveRuleFromProgram}
          />
        ))}
      </div>
    </div>
  );
};

export default AssistanceProgramsTab;
