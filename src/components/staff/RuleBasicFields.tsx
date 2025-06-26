
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRuleValidation } from "./RuleValidationLogic";

interface EligibilityRule {
  id: string;
  name: string;
  description: string;
  plainLanguage: string;
  ruleType: 'validation' | 'location' | 'documentation' | 'condition';
  requiredDocuments?: string[];
}

interface RuleBasicFieldsProps {
  newRule: Partial<EligibilityRule>;
  onUpdate: (updates: Partial<EligibilityRule>) => void;
  validationError: string;
  onValidationChange: (error: string) => void;
}

const RuleBasicFields = ({ newRule, onUpdate, validationError, onValidationChange }: RuleBasicFieldsProps) => {
  const { validateRuleName, getPlaceholderText } = useRuleValidation();

  const handleNameChange = (name: string) => {
    onUpdate({ name });
    if (validationError) {
      const error = validateRuleName(name, newRule.ruleType || 'validation');
      onValidationChange(error);
    }
  };

  const handleTypeChange = (ruleType: string) => {
    const newType = ruleType as any;
    const updates: Partial<EligibilityRule> = { ruleType: newType };
    
    // Clear documents if switching to location type
    if (newType === 'location') {
      updates.requiredDocuments = [];
    }
    
    onUpdate(updates);
    
    if (newRule.name) {
      const error = validateRuleName(newRule.name, newType);
      onValidationChange(error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rule-name">Rule Name</Label>
          <Input
            id="rule-name"
            placeholder={getPlaceholderText(newRule.ruleType || 'validation')}
            value={newRule.name || ''}
            onChange={(e) => handleNameChange(e.target.value)}
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
            value={newRule.ruleType || 'validation'}
            onChange={(e) => handleTypeChange(e.target.value)}
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
          value={newRule.description || ''}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="plain-language">Plain Language Explanation</Label>
        <Textarea
          id="plain-language"
          placeholder="How this rule would be explained to applicants in simple terms"
          value={newRule.plainLanguage || ''}
          onChange={(e) => onUpdate({ plainLanguage: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  );
};

export default RuleBasicFields;
