
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { GoverningLaw } from "./types";

interface GoverningLawsSectionProps {
  governingLaws: GoverningLaw[];
  onAddLaw: () => void;
  onUpdateLaw: (id: string, field: keyof Omit<GoverningLaw, 'id'>, value: string) => void;
  onRemoveLaw: (id: string) => void;
}

const GoverningLawsSection = ({ 
  governingLaws, 
  onAddLaw, 
  onUpdateLaw, 
  onRemoveLaw 
}: GoverningLawsSectionProps) => {
  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Governing Laws and Regulations</CardTitle>
            <CardDescription>
              Add applicable federal and state laws that govern this disaster assistance
            </CardDescription>
          </div>
          <Button onClick={onAddLaw} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Law
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {governingLaws.length === 0 ? (
          <p className="text-gray-500 text-sm">No governing laws added yet. Click "Add Law" to get started.</p>
        ) : (
          <div className="space-y-4">
            {governingLaws.map((law) => (
              <div key={law.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`law-title-${law.id}`}>Title</Label>
                      <Input
                        id={`law-title-${law.id}`}
                        placeholder="e.g., Stafford Act"
                        value={law.title}
                        onChange={(e) => onUpdateLaw(law.id, 'title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`law-reference-${law.id}`}>Reference</Label>
                      <Input
                        id={`law-reference-${law.id}`}
                        placeholder="e.g., 42 U.S.C. § 5121"
                        value={law.reference}
                        onChange={(e) => onUpdateLaw(law.id, 'reference', e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => onRemoveLaw(law.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <Label htmlFor={`law-description-${law.id}`}>Description/Relevance</Label>
                  <Textarea
                    id={`law-description-${law.id}`}
                    placeholder="Describe how this law applies to the disaster assistance..."
                    rows={2}
                    value={law.description}
                    onChange={(e) => onUpdateLaw(law.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoverningLawsSection;
