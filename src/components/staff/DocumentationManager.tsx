
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, Unlink, FileText } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface EligibilityRule {
  id: string;
  name: string;
  description: string;
  plainLanguage: string;
  ruleType: 'validation' | 'location' | 'documentation' | 'condition';
  requiredDocuments?: string[];
  linkedDocumentationRules?: string[];
}

interface DocumentationManagerProps {
  rule: EligibilityRule;
  documentationRules: EligibilityRule[];
  onUpdateRule: (updatedRule: EligibilityRule) => void;
}

const DocumentationManager = ({ rule, documentationRules, onUpdateRule }: DocumentationManagerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleDocumentationRule = (docRuleId: string, isChecked: boolean) => {
    const currentLinked = rule.linkedDocumentationRules || [];
    const updatedLinked = isChecked 
      ? [...currentLinked, docRuleId]
      : currentLinked.filter(id => id !== docRuleId);

    onUpdateRule({
      ...rule,
      linkedDocumentationRules: updatedLinked
    });
  };

  if (rule.ruleType === 'location' || rule.ruleType === 'documentation') {
    return null;
  }

  return (
    <div className="mt-4 pt-4 border-t">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-600 hover:text-blue-800"
      >
        <Link className="h-4 w-4 mr-2" />
        Link Documentation Rules ({rule.linkedDocumentationRules?.length || 0})
      </Button>

      {isExpanded && (
        <Card className="mt-2 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Available Documentation Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {documentationRules.map((docRule) => (
              <div key={docRule.id} className="flex items-start space-x-3">
                <Checkbox
                  id={`doc-rule-${docRule.id}`}
                  checked={rule.linkedDocumentationRules?.includes(docRule.id) || false}
                  onCheckedChange={(checked) => 
                    handleToggleDocumentationRule(docRule.id, checked as boolean)
                  }
                />
                <div className="flex-1">
                  <label 
                    htmlFor={`doc-rule-${docRule.id}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {docRule.name}
                  </label>
                  <p className="text-xs text-gray-600 mt-1">{docRule.plainLanguage}</p>
                  {docRule.requiredDocuments && docRule.requiredDocuments.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-gray-500">Required Documents:</p>
                      <ul className="text-xs text-gray-600 ml-2">
                        {docRule.requiredDocuments.map((doc, index) => (
                          <li key={index}>• {doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {rule.linkedDocumentationRules && rule.linkedDocumentationRules.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {rule.linkedDocumentationRules.map((docRuleId) => {
            const docRule = documentationRules.find(r => r.id === docRuleId);
            return docRule ? (
              <Badge key={docRuleId} variant="outline" className="text-xs">
                <FileText className="h-3 w-3 mr-1" />
                {docRule.name}
              </Badge>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentationManager;
