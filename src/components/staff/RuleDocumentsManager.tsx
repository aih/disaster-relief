
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface RuleDocumentsManagerProps {
  ruleType: string;
  documents: string[];
  onDocumentsChange: (documents: string[]) => void;
}

const RuleDocumentsManager = ({ ruleType, documents, onDocumentsChange }: RuleDocumentsManagerProps) => {
  const [newDocument, setNewDocument] = useState("");

  const canHaveDocuments = (type: string) => {
    return type === 'documentation';
  };

  const addDocument = () => {
    if (newDocument.trim()) {
      onDocumentsChange([...documents, newDocument.trim()]);
      setNewDocument("");
    }
  };

  const removeDocument = (index: number) => {
    const updatedDocs = [...documents];
    updatedDocs.splice(index, 1);
    onDocumentsChange(updatedDocs);
  };

  if (!canHaveDocuments(ruleType)) {
    return null;
  }

  return (
    <div>
      <Label>Required Documents</Label>
      <div className="space-y-2">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="flex-1 text-sm bg-gray-100 p-2 rounded">{doc}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeDocument(index)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <div className="flex space-x-2">
          <Input
            placeholder="Add required document"
            value={newDocument}
            onChange={(e) => setNewDocument(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addDocument();
              }
            }}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={addDocument}
            disabled={!newDocument.trim()}
          >
            Add
          </Button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        For validation/condition rules, link to existing Documentation rules instead of adding documents here.
      </p>
    </div>
  );
};

export default RuleDocumentsManager;
