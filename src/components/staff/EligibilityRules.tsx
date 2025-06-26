
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, FileText, CheckCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface EligibilityRule {
  id: string;
  name: string;
  description: string;
  plainLanguage: string;
  ruleType: 'validation' | 'location' | 'documentation' | 'condition';
  requiredDocuments?: string[];
}

const EligibilityRules = () => {
  const [rules, setRules] = useState<EligibilityRule[]>([
    {
      id: "rule_is_in_declared_area",
      name: "Is in Declared Area",
      description: "Applicant must be located within the federally declared disaster area",
      plainLanguage: "Your damage must have occurred in a county that was declared a disaster area by the federal government.",
      ruleType: "location",
    },
    {
      id: "rule_passed_validations",
      name: "Passed Validations",
      description: "Applicant has passed all required identity and eligibility validations",
      plainLanguage: "You must provide valid identification and meet basic eligibility requirements for disaster assistance.",
      ruleType: "validation",
    },
    {
      id: "rule_has_death_certificate",
      name: "Has Death Certificate",
      description: "Death certificate must be provided for funeral assistance claims",
      plainLanguage: "You must provide an official death certificate showing the person died as a result of the disaster.",
      ruleType: "documentation",
      requiredDocuments: ["Official death certificate", "Medical examiner report (if applicable)"]
    },
    {
      id: "rule_has_funeral_bill",
      name: "Has Funeral Bill",
      description: "Funeral expenses documentation must be provided",
      plainLanguage: "You must provide receipts or invoices from the funeral home showing the costs you paid.",
      ruleType: "documentation",
      requiredDocuments: ["Funeral home invoice", "Itemized receipt of services", "Proof of payment"]
    },
    {
      id: "rule_is_only_vehicle",
      name: "Is Only Vehicle",
      description: "The damaged vehicle must be the applicant's only means of transportation",
      plainLanguage: "The damaged vehicle must be your only working vehicle that you depend on for transportation.",
      ruleType: "condition",
    },
    {
      id: "rule_vehicle_registered_and_insured",
      name: "Vehicle Registered and Insured",
      description: "Vehicle must have been properly registered and insured at time of disaster",
      plainLanguage: "Your vehicle must have been legally registered and had active insurance when the disaster occurred.",
      ruleType: "documentation",
      requiredDocuments: ["Vehicle registration", "Insurance policy documents", "Insurance declaration page"]
    }
  ]);

  const [newRule, setNewRule] = useState<Partial<EligibilityRule>>({
    name: "",
    description: "",
    plainLanguage: "",
    ruleType: "validation",
    requiredDocuments: []
  });

  const [isAddingRule, setIsAddingRule] = useState(false);

  const addRule = () => {
    if (newRule.name && newRule.description && newRule.plainLanguage) {
      const rule: EligibilityRule = {
        id: `rule_${newRule.name?.toLowerCase().replace(/\s+/g, '_')}`,
        name: newRule.name,
        description: newRule.description,
        plainLanguage: newRule.plainLanguage,
        ruleType: newRule.ruleType || 'validation',
        requiredDocuments: newRule.requiredDocuments || []
      };
      setRules([...rules, rule]);
      setNewRule({
        name: "",
        description: "",
        plainLanguage: "",
        ruleType: "validation",
        requiredDocuments: []
      });
      setIsAddingRule(false);
    }
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
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

  const getRuleTypeColor = (type: string) => {
    switch (type) {
      case 'validation': return 'bg-blue-100 text-blue-800';
      case 'location': return 'bg-green-100 text-green-800';
      case 'documentation': return 'bg-orange-100 text-orange-800';
      case 'condition': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-blue-500" />
          <span>Eligibility Rules Management</span>
        </CardTitle>
        <CardDescription>
          Define and manage eligibility rules with plain language explanations and documentation requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Current Eligibility Rules</h3>
          <Button onClick={() => setIsAddingRule(true)} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add New Rule
          </Button>
        </div>

        {isAddingRule && (
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
                    placeholder="e.g., Has Insurance Documentation"
                    value={newRule.name}
                    onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="rule-type">Rule Type</Label>
                  <select
                    id="rule-type"
                    className="w-full p-2 border rounded-md"
                    value={newRule.ruleType}
                    onChange={(e) => setNewRule({ ...newRule, ruleType: e.target.value as any })}
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

              {(newRule.ruleType === 'documentation') && (
                <div>
                  <Label>Required Documents</Label>
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
                <Button onClick={addRule} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
                <Button onClick={() => setIsAddingRule(false)} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {rules.map((rule) => (
            <Card key={rule.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold">{rule.name}</h4>
                    <Badge className={getRuleTypeColor(rule.ruleType)}>
                      {rule.ruleType}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => removeRule(rule.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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

                  {rule.requiredDocuments && rule.requiredDocuments.length > 0 && (
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

                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500">Rule ID: <code className="bg-gray-100 px-1 rounded">{rule.id}</code></p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EligibilityRules;
