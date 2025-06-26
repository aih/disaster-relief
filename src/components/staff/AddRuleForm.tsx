
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RuleBasicFields from "./RuleBasicFields";
import RuleDocumentsManager from "./RuleDocumentsManager";
import { useRuleValidation } from "./RuleValidationLogic";

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
  const { validateRuleName } = useRuleValidation();

  const updateRule = (updates: Partial<EligibilityRule>) => {
    setNewRule(prev => ({ ...prev, ...updates }));
  };

  const updateDocuments = (documents: string[]) => {
    setNewRule(prev => ({ ...prev, requiredDocuments: documents }));
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

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="text-base">Add New Eligibility Rule</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RuleBasicFields
          newRule={newRule}
          onUpdate={updateRule}
          validationError={validationError}
          onValidationChange={setValidationError}
        />

        <RuleDocumentsManager
          ruleType={newRule.ruleType || 'validation'}
          documents={newRule.requiredDocuments || []}
          onDocumentsChange={updateDocuments}
        />

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
