import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle } from "lucide-react";
import RuleCard from "./RuleCard";
import AddRuleForm from "./AddRuleForm";
import RuleFilters from "./RuleFilters";

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
      id: "rule_is_in_geofence",
      name: "Is in Geofence",
      description: "Applicant's location is within the GPS-defined disaster boundary",
      plainLanguage: "Your address must be within the specific geographic area affected by the disaster.",
      ruleType: "location",
    },
    {
      id: "rule_reported_immediate_need",
      name: "Reported Immediate Need",
      description: "Applicant has reported urgent immediate needs for assistance",
      plainLanguage: "You must have urgent needs that require immediate assistance, such as lack of shelter, food, or water.",
      ruleType: "condition",
    },
    {
      id: "rule_inspection_found_minor_damage",
      name: "Inspection Found Minor Damage",
      description: "Property inspection confirmed minor damage requiring assistance",
      plainLanguage: "An inspector must have visited your property and confirmed that you have damage that qualifies for assistance.",
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
    },
    {
      id: "rule_has_insurance_settlement_info",
      name: "Has Insurance Settlement Info",
      description: "Insurance settlement or denial documentation must be provided",
      plainLanguage: "You must provide documentation showing what your insurance company paid or why they denied your claim.",
      ruleType: "documentation",
      requiredDocuments: ["Insurance settlement letter", "Insurance denial letter", "Adjuster report"]
    },
    {
      id: "rule_has_repair_bill",
      name: "Has Repair Bill",
      description: "Documentation of vehicle repair costs must be provided",
      plainLanguage: "You must provide receipts or estimates showing the cost to repair your vehicle.",
      ruleType: "documentation",
      requiredDocuments: ["Repair shop estimate", "Itemized repair invoice", "Before/after photos"]
    },
    {
      id: "rule_has_replacement_proof",
      name: "Has Replacement Proof",
      description: "Documentation proving vehicle replacement is necessary",
      plainLanguage: "You must provide proof that your vehicle cannot be repaired and needs to be replaced.",
      ruleType: "documentation",
      requiredDocuments: ["Total loss declaration", "Salvage title", "Insurance adjuster report stating total loss"]
    },
    {
      id: "rule_is_responsible_for_funeral",
      name: "Is Responsible for Funeral",
      description: "Applicant must be legally responsible for funeral expenses",
      plainLanguage: "You must be the person legally responsible for paying the funeral costs of the deceased.",
      ruleType: "condition",
    },
    {
      id: "rule_death_caused_by_disaster",
      name: "Death Caused by Disaster",
      description: "The death must be directly attributable to the declared disaster",
      plainLanguage: "The person's death must have been directly caused by the disaster or its immediate effects.",
      ruleType: "condition",
    }
  ]);

  const [isAddingRule, setIsAddingRule] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.plainLanguage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || rule.ruleType === filterType;
    
    return matchesSearch && matchesType;
  });

  const addRule = (rule: EligibilityRule) => {
    setRules([...rules, rule]);
    setIsAddingRule(false);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
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
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h3 className="text-lg font-semibold">Current Eligibility Rules ({filteredRules.length})</h3>
          <Button onClick={() => setIsAddingRule(true)} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add New Rule
          </Button>
        </div>

        <RuleFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterChange={setFilterType}
        />

        {isAddingRule && (
          <AddRuleForm
            onAdd={addRule}
            onCancel={() => setIsAddingRule(false)}
          />
        )}

        <div className="space-y-4">
          {filteredRules.map((rule) => (
            <RuleCard
              key={rule.id}
              rule={rule}
              onRemove={removeRule}
            />
          ))}
        </div>

        {filteredRules.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No rules match your search criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EligibilityRules;
