
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
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
  linkedDocumentationRules?: string[];
}

const EligibilityRules = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    ruleType: 'all' as 'all' | 'validation' | 'location' | 'documentation' | 'condition',
    hasDocuments: 'all' as 'all' | 'yes' | 'no'
  });

  // Updated rules aligned with survivor application fields
  const [rules, setRules] = useState<EligibilityRule[]>([
    {
      id: "rule_is_in_declared_area",
      name: "Is In Declared Area",
      description: "Validates that the applicant's address is within the federally declared disaster area boundaries",
      plainLanguage: "You must live in an area that was officially declared a disaster area by the federal government",
      ruleType: "location"
    },
    {
      id: "rule_passed_validations",
      name: "Passed Basic Validations",
      description: "Ensures all required application fields are completed and identity verification is successful",
      plainLanguage: "Your application must be complete and your identity must be verified",
      ruleType: "validation"
    },
    {
      id: "rule_is_in_geofence",
      name: "Is In Geofence",
      description: "GPS coordinates match the specific geographic boundaries affected by the disaster",
      plainLanguage: "Your exact location must be within the disaster-affected area",
      ruleType: "location"
    },
    {
      id: "rule_reported_immediate_need",
      name: "Reported Immediate Need",
      description: "Applicant has indicated urgent needs for basic necessities in their application",
      plainLanguage: "You have urgent needs for food, water, shelter, or other basic necessities",
      ruleType: "condition"
    },
    {
      id: "rule_inspection_found_minor_damage",
      name: "Inspection Found Minor Damage",
      description: "FEMA inspection confirmed minor damage to primary residence requiring assistance",
      plainLanguage: "A FEMA inspector confirmed your home has damage that qualifies for assistance",
      ruleType: "condition"
    },
    {
      id: "rule_is_only_vehicle",
      name: "Is Only Vehicle",
      description: "The damaged vehicle is the applicant's only means of transportation",
      plainLanguage: "The damaged vehicle is your only way to get around",
      ruleType: "condition"
    },
    {
      id: "rule_vehicle_registered_and_insured",
      name: "Vehicle Registered and Insured",
      description: "Vehicle was properly registered and insured at the time of the disaster",
      plainLanguage: "Your vehicle was legally registered and had insurance when the disaster happened",
      ruleType: "condition"
    },
    {
      id: "has_insurance_settlement_info",
      name: "Has Insurance Settlement Information",
      description: "Documentation showing insurance claim details and settlement amounts for transparency",
      plainLanguage: "You need to provide information about any insurance money you received or will receive",
      ruleType: "documentation",
      requiredDocuments: ["Insurance Settlement Letter", "Claim Denial Letter", "Insurance Policy Declaration"],
      linkedDocumentationRules: []
    },
    {
      id: "has_repair_bill",
      name: "Has Repair Bill",
      description: "Itemized repair estimate or bill showing costs for vehicle damage repair",
      plainLanguage: "You need a detailed bill or estimate showing how much it costs to fix your vehicle",
      ruleType: "documentation",
      requiredDocuments: ["Vehicle Repair Estimate", "Mechanic Invoice", "Parts Receipt"],
      linkedDocumentationRules: []
    },
    {
      id: "has_replacement_proof",
      name: "Has Vehicle Replacement Proof",
      description: "Documentation proving purchase or intent to purchase replacement vehicle",
      plainLanguage: "You need proof that you bought or are buying a replacement vehicle",
      ruleType: "documentation",
      requiredDocuments: ["Vehicle Purchase Agreement", "Sales Receipt", "Dealer Invoice"],
      linkedDocumentationRules: []
    },
    {
      id: "rule_is_responsible_for_funeral",
      name: "Is Responsible for Funeral",
      description: "Applicant is legally or financially responsible for funeral arrangements",
      plainLanguage: "You are responsible for paying for the funeral costs",
      ruleType: "condition"
    },
    {
      id: "rule_death_caused_by_disaster",
      name: "Death Caused by Disaster",
      description: "Medical or official documentation confirms death was directly caused by the disaster",
      plainLanguage: "The death was directly caused by the disaster",
      ruleType: "condition"
    },
    {
      id: "has_death_certificate",
      name: "Has Death Certificate",
      description: "Official death certificate from vital records office",
      plainLanguage: "You need the official death certificate",
      ruleType: "documentation",
      requiredDocuments: ["Death Certificate", "Medical Examiner Report"],
      linkedDocumentationRules: []
    },
    {
      id: "has_funeral_bill",
      name: "Has Funeral Service Bill",
      description: "Itemized funeral service invoice showing expenses eligible for reimbursement",
      plainLanguage: "You need a detailed bill from the funeral home showing all costs",
      ruleType: "documentation",
      requiredDocuments: ["Funeral Home Invoice", "Burial Service Receipt", "Cremation Service Bill"],
      linkedDocumentationRules: []
    }
  ]);

  const addRule = (newRule: Omit<EligibilityRule, 'id'>) => {
    const rule: EligibilityRule = {
      ...newRule,
      id: `rule_${Date.now()}`
    };
    setRules([...rules, rule]);
    setShowAddForm(false);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRule = (updatedRule: EligibilityRule) => {
    setRules(rules.map(rule => rule.id === updatedRule.id ? updatedRule : rule));
  };

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = activeFilters.ruleType === 'all' || rule.ruleType === activeFilters.ruleType;
    
    const matchesDocuments = activeFilters.hasDocuments === 'all' || 
                           (activeFilters.hasDocuments === 'yes' && rule.requiredDocuments && rule.requiredDocuments.length > 0) ||
                           (activeFilters.hasDocuments === 'no' && (!rule.requiredDocuments || rule.requiredDocuments.length === 0));
    
    return matchesSearch && matchesType && matchesDocuments;
  });

  const getRuleTypeCount = (type: string) => {
    return rules.filter(rule => rule.ruleType === type).length;
  };

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Add New Eligibility Rule</h2>
            <p className="text-gray-600">Create a new rule for disaster assistance eligibility</p>
          </div>
          <Button variant="outline" onClick={() => setShowAddForm(false)}>
            Cancel
          </Button>
        </div>
        <AddRuleForm 
          onSubmit={addRule}
          onCancel={() => setShowAddForm(false)}
          existingRules={rules}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>Eligibility Rules Management</span>
              </CardTitle>
              <CardDescription>
                Define and manage rules that determine disaster assistance eligibility
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{rules.length}</div>
              <div className="text-sm text-gray-600">Total Rules</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{getRuleTypeCount('validation')}</div>
              <div className="text-sm text-gray-600">Validation</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{getRuleTypeCount('location')}</div>
              <div className="text-sm text-gray-600">Location</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{getRuleTypeCount('documentation')}</div>
              <div className="text-sm text-gray-600">Documentation</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{getRuleTypeCount('condition')}</div>
              <div className="text-sm text-gray-600">Condition</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search rules by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(activeFilters.ruleType !== 'all' || activeFilters.hasDocuments !== 'all') && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </Button>
          </div>

          {showFilters && (
            <RuleFilters
              activeFilters={activeFilters}
              onFiltersChange={setActiveFilters}
            />
          )}
        </CardContent>
      </Card>

      {/* Rules List */}
      <div className="space-y-4">
        {filteredRules.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No rules match your current search and filter criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredRules.map((rule) => (
            <RuleCard
              key={rule.id}
              rule={rule}
              onRemove={removeRule}
              onUpdateRule={updateRule}
              allRules={rules}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EligibilityRules;
