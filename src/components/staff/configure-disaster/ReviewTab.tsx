
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { BasicInfo, AssistanceProgram, GoverningLaw } from "./types";
import { usStates } from "./constants";

interface ReviewTabProps {
  basicInfo: BasicInfo;
  assistancePrograms: AssistanceProgram[];
  governingLaws: GoverningLaw[];
  onSave: () => void;
}

const ReviewTab = ({ basicInfo, assistancePrograms, governingLaws, onSave }: ReviewTabProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Configuration Review</h3>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Disaster ID:</strong> {basicInfo.disasterId || "Not specified"}</p>
          <p><strong>Name:</strong> {basicInfo.disasterName || "Not specified"}</p>
          <p><strong>State:</strong> {basicInfo.state ? usStates.find(s => s.code === basicInfo.state)?.name : "Not specified"}</p>
          <p><strong>Counties:</strong> {basicInfo.counties || "Not specified"}</p>
          <p><strong>Type:</strong> {basicInfo.disasterType === 'other' ? basicInfo.otherDisasterType : basicInfo.disasterType || "Not specified"}</p>
          <p><strong>Start Date:</strong> {basicInfo.disasterStartDate || "Not specified"}</p>
          <p><strong>Application Deadline:</strong> {basicInfo.applicationDeadline || "Not specified"}</p>
          {governingLaws.length > 0 && (
            <div>
              <strong>Governing Laws ({governingLaws.length}):</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                {governingLaws.map(law => (
                  <li key={law.id} className="text-sm">
                    {law.title} {law.reference && `(${law.reference})`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Assistance Programs ({assistancePrograms.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assistancePrograms.map((program, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-3">
                <p className="font-medium">{program.name || `Program ${index + 1}`}</p>
                <p className="text-sm text-gray-600">Max Award: ${program.maxAward}</p>
                <p className="text-sm text-gray-600">Rules: {program.rules.length} configured</p>
                {(program.isExpedited || program.inspectionWaived) && (
                  <p className="text-sm text-green-600">
                    Special: {program.isExpedited ? "Expedited" : ""} {program.inspectionWaived ? "Inspection Waived" : ""}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4 pt-6">
        <Button onClick={onSave} className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="h-4 w-4 mr-2" />
          Save Disaster Configuration
        </Button>
        <Button variant="outline">Save as Draft</Button>
      </div>
    </div>
  );
};

export default ReviewTab;
