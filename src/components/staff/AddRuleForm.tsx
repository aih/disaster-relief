
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface EligibilityRule {
  id: string;
  name: string;
  description: string;
  plainLanguage: string;
  ruleType: 'validation' | 'location' | 'documentation' | 'condition';
  requiredDocuments?: string[];
}

interface AddRuleFormProps {
  onAdd: (rule: EligibilityRule) => void;
  onCancel: () => void;
}

const AddRuleForm = ({ onAdd, onCancel }: AddRuleFormProps) => {
  const [newRule, setNewRule] = useState<Partial<EligibilityRule>>({
    name: "",
    description: "",
    plainLanguage: "",
    ruleType: "validation",
    requiredDocuments: []
  });
  const [validationError, setValidationError] = useState("");

  const validateRuleName = (name: string, ruleType: string) => {
    const startsWithHas = name.toLowerCase().startsWith('has');
    
    if (startsWithHas && ruleType !== 'documentation') {
      return "Rule names starting with 'Has' must be Documentation type rules";
    }
    
    if (ruleType === 'documentation' && !startsWithHas) {
      return "Documentation rules must start with 'Has'";
    }
    
    return "";
  };

  const getPlaceholderText = (ruleType: string) => {
    switch (ruleType) {
      case 'documentation': return 'e.g., Has Insurance Documentation';
      case 'location': return 'e.g., Is in Affected Area';
      case 'condition': return 'e.g., Is Primary Residence';
      case 'validation': return 'e.g., Passed Identity Check';
      default: return 'Enter rule name';
    }
  };

  const canHaveDocuments = (ruleType: string) => {
    return ruleType === 'documentation' || ruleType === 'validation' || ruleType === 'condition';
  };

  const addRule = () => {
    if (newRule.name && newRule.description && newRule.plainLanguage) {
      const validation = validateRuleName(newRule.name, newRule.ruleType || 'validation');
      if (validation) {
        setValidationError(validation);
        return;
      }

      const rule: EligibilityRule = {
        id: `rule_${newRule.name?.toLowerCase().replace(/\s+/g, '_')}`,
        name: newRule.name,
        description: newRule.description,
        plainLanguage: newRule.plainLanguage,
        ruleType: newRule.ruleType || 'validation',
        requiredDocuments: newRule.requiredDocuments || []
      };
      onAdd(rule);
      setNewRule({
        name: "",
        description: "",
        plainLanguage: "",
        ruleType: "validation",
        requiredDocuments: []
      });
      setValidationError("");
    }
  };

  const addDocumentToNewRule = (document: string) => {
    if (document.trim()) {
      setNewRule({
        ...newRule,
        requiredDocuments: [...(newRule.requiredDocuments || []), document.trim()]
      });
    }
  };

  const removeDocumentFromNewRule = (index: number) => {
    const updatedDocs = [...(newRule.requiredDocuments || [])];
    updatedDocs.splice(index, 1);
    setNewRule({ ...newRule, requiredDocuments: updatedDocs });
  };

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="text-base">Add New Eligibility Rule</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input
              id="rule-name"
              placeholder={getPlaceholderText(newRule.ruleType || 'validation')}
              value={newRule.name}
              onChange={(e) => {
                setNewRule({ ...newRule, name: e.target.value });
                if (validationError) {
                  const error = validateRuleName(e.target.value, newRule.ruleType || 'validation');
                  setValidationError(error);
                }
              }}
            />
            {validationError && (
              <p className="text-sm text-red-600 mt-1">{validationError}</p>
            )}
          </div>
          <div>
            <Label htmlFor="rule-type">Rule Type</Label>
            <select
              id="rule-type"
              className="w-full p-2 border rounded-md"
              value={newRule.ruleType}
              onChange={(e) => {
                const newType = e.target.value as any;
                setNewRule({ ...newRule, ruleType: newType });
                if (newRule.name) {
                  const error = validateRuleName(newRule.name, newType);
                  setValidationError(error);
                }
                // Clear documents if switching to location type
                if (newType === 'location') {
                  setNewRule(prev => ({ ...prev, ruleType: newType, requiredDocuments: [] }));
                }
              }}
            >
              <option value="validation">Validation</option>
              <option value="location">Location</option>
              <option value="documentation">Documentation</option>
              <option value="condition">Condition</option>
            </select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="rule-description">Technical Description</Label>
          <Textarea
            id="rule-description"
            placeholder="Technical description for system use"
            value={newRule.description}
            onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="plain-language">Plain Language Explanation</Label>
          <Textarea
            id="plain-language"
            placeholder="How this rule would be explained to applicants in simple terms"
            value={newRule.plainLanguage}
            onChange={(e) => setNewRule({ ...newRule, plainLanguage: e.target.value })}
            rows={3}
          />
        </div>

        {canHaveDocuments(newRule.ruleType || 'validation') && (
          <div>
            <Label>Required Documents {newRule.ruleType !== 'documentation' && <span className="text-sm text-gray-500">(optional)</span>}</Label>
            <div className="space-y-2">
              {newRule.requiredDocuments?.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="flex-1 text-sm bg-gray-100 p-2 rounded">{doc}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeDocumentFromNewRule(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <div className="flex space-x-2">
                <Input
                  placeholder="Add required document"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addDocumentToNewRule((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                    addDocumentToNewRule(input.value);
                    input.value = '';
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Button onClick={addRule} size="sm" disabled={!!validationError}>
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
          <Button onClick={onCancel} variant="outline" size="sm">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddRuleForm;
