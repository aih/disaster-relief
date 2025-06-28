
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { SpecialProvisions } from "./types";

interface SpecialProvisionsTabProps {
  specialProvisions: SpecialProvisions;
  onUpdateSpecialProvisions: (updates: Partial<SpecialProvisions>) => void;
}

const SpecialProvisionsTab = ({ specialProvisions, onUpdateSpecialProvisions }: SpecialProvisionsTabProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Special Disaster Provisions</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h4 className="font-semibold mb-3">Processing Enhancements</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={specialProvisions.expeditedSNA}
                onChange={(e) => onUpdateSpecialProvisions({expeditedSNA: e.target.checked})}
              />
              <div>
                <span className="font-medium">Expedited Serious Needs Assistance</span>
                <p className="text-sm text-gray-600">Enable immediate assistance for urgent needs</p>
              </div>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={specialProvisions.autoAdjudication}
                onChange={(e) => onUpdateSpecialProvisions({autoAdjudication: e.target.checked})}
              />
              <div>
                <span className="font-medium">Auto-Adjudication</span>
                <p className="text-sm text-gray-600">Automatically approve cases meeting all criteria</p>
              </div>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={specialProvisions.geofenceActivated}
                onChange={(e) => onUpdateSpecialProvisions({geofenceActivated: e.target.checked})}
              />
              <div>
                <span className="font-medium">Geofence Validation</span>
                <p className="text-sm text-gray-600">Use GPS coordinates for area verification</p>
              </div>
            </label>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-3">Inspection Waivers</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={specialProvisions.cleanSanitizeWaiver}
                onChange={(e) => onUpdateSpecialProvisions({cleanSanitizeWaiver: e.target.checked})}
              />
              <div>
                <span className="font-medium">Clean & Sanitize Waiver</span>
                <p className="text-sm text-gray-600">Waive inspection requirement for cleaning assistance</p>
              </div>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={specialProvisions.displacementWaiver}
                onChange={(e) => onUpdateSpecialProvisions({displacementWaiver: e.target.checked})}
              />
              <div>
                <span className="font-medium">Displacement Assistance Waiver</span>
                <p className="text-sm text-gray-600">Waive inspection for temporary lodging assistance</p>
              </div>
            </label>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Important Note</p>
                <p className="text-yellow-700">Inspection waivers should only be used when disaster conditions make inspections impractical or unsafe.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SpecialProvisionsTab;
