
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, FileText } from "lucide-react";
import { useState } from "react";

interface AssistanceProgram {
  name: string;
  max_award: number;
  rules: string[];
}

interface DisasterDefinition {
  id: string;
  name: string;
  declared_counties: string[];
  programs: AssistanceProgram[];
  special_policies: string[];
  status: "Active" | "Draft" | "Archived";
  created_date: string;
}

const DisasterReview = () => {
  // Sample data based on the policy.py structure
  const [disasters] = useState<DisasterDefinition[]>([
    {
      id: "DR-4701-NY-Broome",
      name: "DR-4701-NY-Broome",
      declared_counties: ["Broome"],
      programs: [
        {
          name: "Serious Needs Assistance (Expedited)",
          max_award: 770.00,
          rules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_is_in_geofence", "rule_reported_immediate_need"]
        },
        {
          name: "Serious Needs Assistance (Regular)",
          max_award: 770.00,
          rules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_inspection_found_minor_damage"]
        },
        {
          name: "Clean and Sanitize",
          max_award: 300.00,
          rules: ["rule_is_in_declared_area", "rule_passed_validations"]
        },
        {
          name: "Transportation Assistance (Repair)",
          max_award: 5000.00,
          rules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_is_only_vehicle", "rule_vehicle_registered_and_insured", "rule_has_insurance_settlement_info", "rule_has_repair_bill"]
        },
        {
          name: "Transportation Assistance (Replace)",
          max_award: 15000.00,
          rules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_is_only_vehicle", "rule_vehicle_registered_and_insured", "rule_has_insurance_settlement_info", "rule_has_replacement_proof"]
        },
        {
          name: "Funeral Assistance",
          max_award: 7000.00,
          rules: ["rule_is_in_declared_area", "rule_passed_validations", "rule_is_responsible_for_funeral", "rule_death_caused_by_disaster", "rule_has_death_certificate", "rule_has_funeral_bill"]
        },
        {
          name: "Displacement Assistance",
          max_award: 1638.00,
          rules: ["rule_is_in_declared_area", "rule_passed_validations"]
        }
      ],
      special_policies: [
        "Expedited Serious Needs Assistance is ACTIVATED",
        "Inspections are WAIVED for Clean and Sanitize",
        "Inspections are WAIVED for Displacement Assistance"
      ],
      status: "Active",
      created_date: "2024-03-15"
    }
  ]);

  const [selectedDisaster, setSelectedDisaster] = useState<DisasterDefinition | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (selectedDisaster) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Disaster Definition Details</h2>
            <p className="text-gray-600">Review complete disaster policy configuration</p>
          </div>
          <Button variant="outline" onClick={() => setSelectedDisaster(null)}>
            Back to List
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Disaster ID</label>
                  <p className="text-lg font-semibold">{selectedDisaster.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedDisaster.status)}>
                      {selectedDisaster.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Declared Counties</label>
                  <p className="text-lg">{selectedDisaster.declared_counties.join(", ")}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created Date</label>
                  <p className="text-lg">{selectedDisaster.created_date}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Policies */}
          <Card>
            <CardHeader>
              <CardTitle>Special Policies</CardTitle>
              <CardDescription>Unique provisions for this disaster</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedDisaster.special_policies.map((policy, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{policy}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assistance Programs */}
          <Card>
            <CardHeader>
              <CardTitle>Assistance Programs</CardTitle>
              <CardDescription>Available programs and their configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDisaster.programs.map((program, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{program.name}</h4>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(program.max_award)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Eligibility Rules:</p>
                      <div className="flex flex-wrap gap-2">
                        {program.rules.map((rule, ruleIndex) => (
                          <Badge key={ruleIndex} variant="outline" className="text-xs">
                            {rule.replace('rule_', '').replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <span>Stored Disaster Definitions</span>
        </CardTitle>
        <CardDescription>
          Review and manage existing disaster policy configurations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Disaster ID</TableHead>
              <TableHead>Counties</TableHead>
              <TableHead>Programs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disasters.map((disaster) => (
              <TableRow key={disaster.id}>
                <TableCell className="font-medium">{disaster.name}</TableCell>
                <TableCell>{disaster.declared_counties.join(", ")}</TableCell>
                <TableCell>{disaster.programs.length} programs</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(disaster.status)}>
                    {disaster.status}
                  </Badge>
                </TableCell>
                <TableCell>{disaster.created_date}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedDisaster(disaster)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DisasterReview;
