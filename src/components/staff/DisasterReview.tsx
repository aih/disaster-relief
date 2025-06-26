
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Edit, Trash2, FileText, Save, X } from "lucide-react";
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
  version: string;
  disaster_type: string;
  governing_laws?: { title: string; reference: string; description: string; }[];
}

const DisasterReview = () => {
  // Updated sample data with version numbers and survivor application aligned rules
  const [disasters, setDisasters] = useState<DisasterDefinition[]>([
    {
      id: "DR-4701-NY-Broome",
      name: "DR-4701-NY-Broome",
      declared_counties: ["Broome"],
      version: "v1.2.0",
      disaster_type: "severe_storms",
      governing_laws: [
        {
          title: "Robert T. Stafford Disaster Relief and Emergency Assistance Act",
          reference: "42 U.S.C. § 5121 et seq.",
          description: "Primary federal law governing disaster assistance programs"
        }
      ],
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
  const [editingDisaster, setEditingDisaster] = useState<DisasterDefinition | null>(null);

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

  const handleEdit = (disaster: DisasterDefinition) => {
    setEditingDisaster({ ...disaster });
    setSelectedDisaster(null);
  };

  const handleSave = () => {
    if (editingDisaster) {
      // Increment version number
      const versionParts = editingDisaster.version.replace('v', '').split('.');
      const newVersion = `v${versionParts[0]}.${versionParts[1]}.${parseInt(versionParts[2]) + 1}`;
      
      const updatedDisaster = { ...editingDisaster, version: newVersion };
      
      setDisasters(disasters.map(d => 
        d.id === editingDisaster.id ? updatedDisaster : d
      ));
      setEditingDisaster(null);
    }
  };

  const handleCancel = () => {
    setEditingDisaster(null);
  };

  const updateEditingDisaster = (field: string, value: any) => {
    if (editingDisaster) {
      setEditingDisaster({ ...editingDisaster, [field]: value });
    }
  };

  const updateProgram = (programIndex: number, field: string, value: any) => {
    if (editingDisaster) {
      const updatedPrograms = [...editingDisaster.programs];
      updatedPrograms[programIndex] = { ...updatedPrograms[programIndex], [field]: value };
      setEditingDisaster({ ...editingDisaster, programs: updatedPrograms });
    }
  };

  if (editingDisaster) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Edit Disaster Definition</h2>
            <p className="text-gray-600">Modify disaster policy configuration</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Basic Information Edit */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-disaster-id">Disaster ID</Label>
                  <Input
                    id="edit-disaster-id"
                    value={editingDisaster.id}
                    onChange={(e) => updateEditingDisaster('id', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-disaster-name">Disaster Name</Label>
                  <Input
                    id="edit-disaster-name"
                    value={editingDisaster.name}
                    onChange={(e) => updateEditingDisaster('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-counties">Declared Counties</Label>
                  <Input
                    id="edit-counties"
                    value={editingDisaster.declared_counties.join(", ")}
                    onChange={(e) => updateEditingDisaster('declared_counties', e.target.value.split(", "))}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <select
                    id="edit-status"
                    className="w-full p-2 border rounded-md"
                    value={editingDisaster.status}
                    onChange={(e) => updateEditingDisaster('status', e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Programs Edit */}
          <Card>
            <CardHeader>
              <CardTitle>Assistance Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {editingDisaster.programs.map((program, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`program-name-${index}`}>Program Name</Label>
                        <Input
                          id={`program-name-${index}`}
                          value={program.name}
                          onChange={(e) => updateProgram(index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`max-award-${index}`}>Maximum Award ($)</Label>
                        <Input
                          id={`max-award-${index}`}
                          type="number"
                          value={program.max_award}
                          onChange={(e) => updateProgram(index, 'max_award', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Eligibility Rules</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
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

  if (selectedDisaster) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Disaster Definition Details</h2>
            <p className="text-gray-600">Review complete disaster policy configuration</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => handleEdit(selectedDisaster)} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" onClick={() => setSelectedDisaster(null)}>
              Back to List
            </Button>
          </div>
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
                  <label className="text-sm font-medium text-gray-500">Version</label>
                  <div className="mt-1">
                    <Badge variant="outline" className="text-sm font-mono">
                      {selectedDisaster.version}
                    </Badge>
                  </div>
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
                  <label className="text-sm font-medium text-gray-500">Disaster Type</label>
                  <p className="text-lg capitalize">{selectedDisaster.disaster_type.replace('_', ' ')}</p>
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

          {/* Governing Laws */}
          {selectedDisaster.governing_laws && selectedDisaster.governing_laws.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Governing Laws and Regulations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedDisaster.governing_laws.map((law, index) => (
                    <div key={index} className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold">{law.title}</h4>
                      <p className="text-sm text-gray-600 font-mono">{law.reference}</p>
                      <p className="text-sm mt-1">{law.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

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
              <TableHead>Version</TableHead>
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
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {disaster.version}
                  </Badge>
                </TableCell>
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
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(disaster)}
                    >
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
