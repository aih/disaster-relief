import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, FileText, Edit2, Save, X, Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import DocumentationManager from "./DocumentationManager";

interface EligibilityRule {
  id: string;
  name: string;
  description: string;
  plainLanguage: string;
  ruleType: 'validation' | 'location' | 'documentation' | 'condition';
  requiredDocuments?: string[];
  linkedDocumentationRules?: string[];
}

interface RuleCardProps {
  rule: EligibilityRule;
  onRemove: (id: string) => void;
  onUpdateRule: (updatedRule: EligibilityRule) => void;
  allRules: EligibilityRule[];
}

const RuleCard = ({ rule, onRemove, onUpdateRule, allRules }: RuleCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRule, setEditedRule] = useState<EligibilityRule>(rule);
  const [validationError, setValidationError] = useState("");

  const getRuleTypeColor = (type: string) => {
    switch (type) {
      case 'validation': return 'bg-blue-100 text-blue-800';
      case 'location': return 'bg-green-100 text-green-800';
      case 'documentation': return 'bg-orange-100 text-orange-800';
      case 'condition': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedRule(rule);
    setValidationError("");
  };

  const handleSave = () => {
    const validation = validateRuleName(editedRule.name, editedRule.ruleType);
    if (validation) {
      setValidationError(validation);
      return;
    }

    onUpdateRule(editedRule);
    setIsEditing(false);
    setValidationError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedRule(rule);
    setValidationError("");
  };

  const addDocumentToRule = (document: string) => {
    if (document.trim()) {
      setEditedRule({
        ...editedRule,
        requiredDocuments: [...(editedRule.requiredDocuments || []), document.trim()]
      });
    }
  };

  const removeDocumentFromRule = (index: number) => {
    const updatedDocs = [...(editedRule.requiredDocuments || [])];
    updatedDocs.splice(index, 1);
    setEditedRule({ ...editedRule, requiredDocuments: updatedDocs });
  };

  const documentationRules = allRules.filter(r => r.ruleType === 'documentation');

  if (isEditing) {
    return (
      <Card className="border-l-4 border-l-orange-500">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-semibold text-orange-700">Editing Rule</h4>
            <div className="flex space-x-2">
              <Button onClick={handleSave} size="sm" variant="default">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button onClick={handleCancel} size="sm" variant="outline">
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-rule-name">Rule Name</Label>
                <Input
                  id="edit-rule-name"
                  value={editedRule.name}
                  onChange={(e) => {
                    setEditedRule({ ...editedRule, name: e.target.value });
                    if (validationError) {
                      const error = validateRuleName(e.target.value, editedRule.ruleType);
                      setValidationError(error);
                    }
                  }}
                />
                {validationError && (
                  <p className="text-sm text-red-600 mt-1">{validationError}</p>
                )}
              </div>
              <div>
                <Label htmlFor="edit-rule-type">Rule Type</Label>
                <select
                  id="edit-rule-type"
                  className="w-full p-2 border rounded-md"
                  value={editedRule.ruleType}
                  onChange={(e) => {
                    const newType = e.target.value as any;
                    setEditedRule({ ...editedRule, ruleType: newType });
                    if (editedRule.name) {
                      const error = validateRuleName(editedRule.name, newType);
                      setValidationError(error);
                    }
                    // Clear documents if switching to location type
                    if (newType === 'location') {
                      setEditedRule(prev => ({ ...prev, ruleType: newType, requiredDocuments: [] }));
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
              <Label htmlFor="edit-description">Technical Description</Label>
              <Textarea
                id="edit-description"
                value={editedRule.description}
                onChange={(e) => setEditedRule({ ...editedRule, description: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="edit-plain-language">Plain Language Explanation</Label>
              <Textarea
                id="edit-plain-language"
                value={editedRule.plainLanguage}
                onChange={(e) => setEditedRule({ ...editedRule, plainLanguage: e.target.value })}
                rows={3}
              />
            </div>

            {editedRule.ruleType === 'documentation' && (
              <div>
                <Label>Required Documents</Label>
                <div className="space-y-2">
                  {editedRule.requiredDocuments?.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="flex-1 text-sm bg-gray-100 p-2 rounded">{doc}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeDocumentFromRule(index)}
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
                          addDocumentToRule((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                        addDocumentToRule(input.value);
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <h4 className="font-semibold">{rule.name}</h4>
            <Badge className={getRuleTypeColor(rule.ruleType)}>
              {rule.ruleType}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handleEdit}
              variant="ghost"
              size="sm"
              className="text-blue-500 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => onRemove(rule.id)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-600">Technical Description:</p>
            <p className="text-sm text-gray-800">{rule.description}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Plain Language Explanation:</p>
            <p className="text-sm text-gray-800 italic">"{rule.plainLanguage}"</p>
          </div>

          {rule.ruleType === 'documentation' && rule.requiredDocuments && rule.requiredDocuments.length > 0 && (
            <Collapsible>
              <CollapsibleTrigger className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                <FileText className="h-4 w-4 mr-1" />
                Required Documents ({rule.requiredDocuments.length})
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="pl-4 space-y-1">
                  {rule.requiredDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>

        <DocumentationManager
          rule={rule}
          documentationRules={documentationRules}
          onUpdateRule={onUpdateRule}
        />

        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-gray-500">Rule ID: <code className="bg-gray-100 px-1 rounded">{rule.id}</code></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RuleCard;
