
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, FileText } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface EligibilityRule {
  id: string;
  name: string;
  description: string;
  plainLanguage: string;
  ruleType: 'validation' | 'location' | 'documentation' | 'condition';
  requiredDocuments?: string[];
}

interface RuleCardProps {
  rule: EligibilityRule;
  onRemove: (id: string) => void;
}

const RuleCard = ({ rule, onRemove }: RuleCardProps) => {
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
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <h4 className="font-semibold">{rule.name}</h4>
            <Badge className={getRuleTypeColor(rule.ruleType)}>
              {rule.ruleType}
            </Badge>
          </div>
          <Button
            onClick={() => onRemove(rule.id)}
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
  );
};

export default RuleCard;
