
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Trash2 } from "lucide-react";
import { AssistanceProgram } from "./types";
import { availableRules } from "./constants";

interface AssistanceProgramCardProps {
  program: AssistanceProgram;
  index: number;
  onUpdate: (index: number, field: keyof AssistanceProgram, value: any) => void;
  onRemove: (index: number) => void;
  onProgramTypeChange: (index: number, programType: string) => void;
  onAddRule: (programIndex: number, rule: string) => void;
  onRemoveRule: (programIndex: number, ruleIndex: number) => void;
}

const AssistanceProgramCard = ({
  program,
  index,
  onUpdate,
  onRemove,
  onProgramTypeChange,
  onAddRule,
  onRemoveRule
}: AssistanceProgramCardProps) => {
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`program-type-${index}`}>Program Type</Label>
                <Select 
                  value={program.programType} 
                  onValueChange={(value) => onProgramTypeChange(index, value)}
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
                  onChange={(e) => onUpdate(index, 'maxAward', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`program-name-${index}`}>Program Name</Label>
              <Input
                id={`program-name-${index}`}
                placeholder="Enter program name"
                value={program.name}
                onChange={(e) => onUpdate(index, 'name', e.target.value)}
              />
            </div>

            {program.definition && (
              <div>
                <Label htmlFor={`program-definition-${index}`}>Program Definition</Label>
                <Textarea
                  id={`program-definition-${index}`}
                  value={program.definition}
                  onChange={(e) => onUpdate(index, 'definition', e.target.value)}
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
                  onChange={(e) => onUpdate(index, 'subjectToCap', e.target.value)}
                  placeholder="Yes (ONA)"
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={program.isExpedited}
                    onChange={(e) => onUpdate(index, 'isExpedited', e.target.checked)}
                  />
                  <span className="text-sm">Expedited</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={program.inspectionWaived}
                    onChange={(e) => onUpdate(index, 'inspectionWaived', e.target.checked)}
                  />
                  <span className="text-sm">Inspection Waived</span>
                </label>
              </div>
            </div>
          </div>
          <Button
            onClick={() => onRemove(index)}
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
                    onClick={() => onRemoveRule(index, ruleIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <Select onValueChange={(value) => onAddRule(index, value)}>
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
  );
};

export default AssistanceProgramCard;
