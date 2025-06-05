
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, CheckCircle } from "lucide-react";

interface ConfigureDisasterProps {
  onSave: () => void;
}

const ConfigureDisaster = ({ onSave }: ConfigureDisasterProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5 text-green-500" />
          <span>Configure New Disaster</span>
        </CardTitle>
        <CardDescription>
          Set up eligibility criteria and program parameters for a new disaster declaration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="disaster-id">Disaster Declaration ID</Label>
              <Input id="disaster-id" placeholder="DR-XXXX" />
            </div>
            <div>
              <Label htmlFor="disaster-name">Disaster Name</Label>
              <Input id="disaster-name" placeholder="e.g., Hurricane Milton" />
            </div>
            <div>
              <Label htmlFor="state">Affected State</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="LA">Louisiana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="disaster-type">Disaster Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select disaster type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hurricane">Hurricane</SelectItem>
                  <SelectItem value="wildfire">Wildfire</SelectItem>
                  <SelectItem value="flood">Flooding</SelectItem>
                  <SelectItem value="tornado">Tornado</SelectItem>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="max-award">Maximum Award Amount</Label>
              <Input id="max-award" placeholder="$0.00" type="number" />
            </div>
            <div>
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input id="deadline" type="date" />
            </div>
            <div>
              <Label htmlFor="counties">Affected Counties</Label>
              <Textarea 
                id="counties" 
                placeholder="List affected counties, separated by commas"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Eligibility Criteria</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="income-limit">Income Limit (% of AMI)</Label>
                <Input id="income-limit" placeholder="e.g., 120%" />
              </div>
              <div>
                <Label htmlFor="damage-threshold">Minimum Damage Threshold</Label>
                <Input id="damage-threshold" placeholder="$0.00" type="number" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="occupancy">Occupancy Requirements</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select requirement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary Residence Only</SelectItem>
                    <SelectItem value="secondary">Include Secondary Homes</SelectItem>
                    <SelectItem value="rental">Include Rental Properties</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="insurance">Insurance Requirements</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select requirement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="required">Insurance Required</SelectItem>
                    <SelectItem value="not-required">No Insurance Required</SelectItem>
                    <SelectItem value="verified">Verified Coverage Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-6">
          <Button onClick={onSave} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
          <Button variant="outline">Save as Draft</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigureDisaster;
