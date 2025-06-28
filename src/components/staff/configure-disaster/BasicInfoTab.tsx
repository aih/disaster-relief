
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BasicInfo, GoverningLaw } from "./types";
import { usStates, disasterTypes } from "./constants";
import GoverningLawsSection from "./GoverningLawsSection";

interface BasicInfoTabProps {
  basicInfo: BasicInfo;
  onUpdateBasicInfo: (updates: Partial<BasicInfo>) => void;
  governingLaws: GoverningLaw[];
  onAddGoverningLaw: () => void;
  onUpdateGoverningLaw: (id: string, field: keyof Omit<GoverningLaw, 'id'>, value: string) => void;
  onRemoveGoverningLaw: (id: string) => void;
}

const BasicInfoTab = ({ 
  basicInfo, 
  onUpdateBasicInfo, 
  governingLaws,
  onAddGoverningLaw,
  onUpdateGoverningLaw,
  onRemoveGoverningLaw
}: BasicInfoTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="disaster-id">Disaster Declaration ID</Label>
            <Input 
              id="disaster-id" 
              placeholder="DR-XXXX-ST-County"
              value={basicInfo.disasterId}
              onChange={(e) => onUpdateBasicInfo({disasterId: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="disaster-name">Disaster Name</Label>
            <Input 
              id="disaster-name" 
              placeholder="e.g., Hurricane Milton"
              value={basicInfo.disasterName}
              onChange={(e) => onUpdateBasicInfo({disasterName: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="state">Affected State</Label>
            <Select value={basicInfo.state} onValueChange={(value) => onUpdateBasicInfo({state: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {usStates.map(state => (
                  <SelectItem key={state.code} value={state.code}>
                    {state.name} ({state.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="disaster-start-date">Disaster Start Date</Label>
            <Input 
              id="disaster-start-date" 
              type="date"
              value={basicInfo.disasterStartDate}
              onChange={(e) => onUpdateBasicInfo({disasterStartDate: e.target.value})}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="disaster-type">Disaster Type</Label>
            <Select value={basicInfo.disasterType} onValueChange={(value) => onUpdateBasicInfo({disasterType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select disaster type" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {disasterTypes.map(type => (
                  <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '_').replace(/&/g, 'and')}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {basicInfo.disasterType === 'other' && (
            <div>
              <Label htmlFor="other-disaster-type">Specify Other Disaster Type</Label>
              <Input 
                id="other-disaster-type" 
                placeholder="Enter disaster type"
                value={basicInfo.otherDisasterType}
                onChange={(e) => onUpdateBasicInfo({otherDisasterType: e.target.value})}
              />
            </div>
          )}
          <div>
            <Label htmlFor="deadline">Application Deadline</Label>
            <Input 
              id="deadline" 
              type="date"
              value={basicInfo.applicationDeadline}
              onChange={(e) => onUpdateBasicInfo({applicationDeadline: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="counties">Declared Counties</Label>
            <Textarea 
              id="counties" 
              placeholder="List declared counties, separated by commas (e.g., Broome, Tioga, Chenango)"
              rows={3}
              value={basicInfo.counties}
              onChange={(e) => onUpdateBasicInfo({counties: e.target.value})}
            />
          </div>
        </div>
      </div>

      <GoverningLawsSection 
        governingLaws={governingLaws}
        onAddLaw={onAddGoverningLaw}
        onUpdateLaw={onUpdateGoverningLaw}
        onRemoveLaw={onRemoveGoverningLaw}
      />
    </div>
  );
};

export default BasicInfoTab;
