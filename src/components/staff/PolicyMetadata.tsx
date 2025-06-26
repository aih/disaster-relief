
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PolicyMetadataProps {
  policyData: {
    disasterName: string;
    disasterId: string;
    state: string;
    counties: string;
    disasterType: string;
  };
  onUpdate: (updates: Partial<PolicyMetadataProps['policyData']>) => void;
}

const PolicyMetadata = ({ policyData, onUpdate }: PolicyMetadataProps) => {
  const usStates = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
    { code: "DC", name: "District of Columbia" },
    { code: "PR", name: "Puerto Rico" },
    { code: "VI", name: "U.S. Virgin Islands" },
    { code: "GU", name: "Guam" },
    { code: "AS", name: "American Samoa" },
    { code: "MP", name: "Northern Mariana Islands" }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="disaster-id">Disaster Declaration ID</Label>
          <Input 
            id="disaster-id" 
            placeholder="DR-XXXX-ST-County"
            value={policyData.disasterId}
            onChange={(e) => onUpdate({ disasterId: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="disaster-name">Disaster Name</Label>
          <Input 
            id="disaster-name" 
            placeholder="e.g., Hurricane Milton"
            value={policyData.disasterName}
            onChange={(e) => onUpdate({ disasterName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Select value={policyData.state} onValueChange={(value) => onUpdate({ state: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {usStates.map((state) => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="counties">Affected Counties</Label>
          <Input 
            id="counties" 
            placeholder="e.g., Broome, Tioga"
            value={policyData.counties}
            onChange={(e) => onUpdate({ counties: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="disaster-type">Disaster Type</Label>
          <Select value={policyData.disasterType} onValueChange={(value) => onUpdate({ disasterType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select disaster type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hurricane">Hurricane</SelectItem>
              <SelectItem value="flooding">Flooding</SelectItem>
              <SelectItem value="wildfire">Wildfire</SelectItem>
              <SelectItem value="tornado">Tornado</SelectItem>
              <SelectItem value="severe_storms">Severe Storms</SelectItem>
              <SelectItem value="earthquake">Earthquake</SelectItem>
              <SelectItem value="drought">Drought</SelectItem>
              <SelectItem value="winter_storm">Winter Storm</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PolicyMetadata;
