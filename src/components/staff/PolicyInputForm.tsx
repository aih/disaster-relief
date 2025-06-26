
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PolicyMetadata from "./PolicyMetadata";
import GoverningItemsManager from "./GoverningItemsManager";

interface PolicyInputFormProps {
  policyData: {
    disasterName: string;
    disasterId: string;
    state: string;
    counties: string;
    disasterType: string;
    plainTextPolicy: string;
    governingItems: string[];
  };
  onUpdate: (updates: any) => void;
  onNext: () => void;
}

const PolicyInputForm = ({ policyData, onUpdate, onNext }: PolicyInputFormProps) => {
  const handleMetadataUpdate = (updates: any) => {
    onUpdate(updates);
  };

  const handleGoverningItemsChange = (items: string[]) => {
    onUpdate({ governingItems: items });
  };

  return (
    <div className="space-y-6">
      <PolicyMetadata 
        policyData={policyData}
        onUpdate={handleMetadataUpdate}
      />

      <GoverningItemsManager 
        items={policyData.governingItems}
        onItemsChange={handleGoverningItemsChange}
      />

      <div>
        <Label htmlFor="policy-text">Policy Document (Plain Text)</Label>
        <Textarea 
          id="policy-text"
          placeholder="Paste the plain-language policy document here. Include details about:
- Available assistance programs and maximum awards
- Eligibility requirements for each program
- Special provisions or waivers
- Documentation requirements
- Any expedited processing criteria

Example: 'For Broome County, expedited Serious Needs Assistance up to $770 is available for immediate needs. Clean and Sanitize assistance up to $300 requires no inspection...'"
          rows={12}
          className="font-mono text-sm"
          value={policyData.plainTextPolicy}
          onChange={(e) => onUpdate({ plainTextPolicy: e.target.value })}
        />
      </div>

      <Button 
        onClick={onNext}
        disabled={!policyData.disasterId || !policyData.plainTextPolicy}
        className="w-full"
      >
        Process Policy Text with AI
      </Button>
    </div>
  );
};

export default PolicyInputForm;
