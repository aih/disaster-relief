
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Scan, Bot, AlertTriangle, CheckCircle, Upload } from "lucide-react";

interface DocumentTask {
  id: string;
  fileName: string;
  type: 'insurance' | 'id' | 'receipts' | 'damage-photos' | 'other';
  status: 'processing' | 'ocr-complete' | 'needs-review' | 'approved' | 'rejected';
  caseId: string;
  uploadedAt: string;
  autoProcessed: boolean;
  quality: 'high' | 'medium' | 'low';
}

const DocumentProcessing = () => {
  const documentTasks: DocumentTask[] = [
    {
      id: "DOC-001",
      fileName: "insurance_policy.pdf",
      type: "insurance",
      status: "ocr-complete",
      caseId: "DA-2024-001234",
      uploadedAt: "2 hours ago",
      autoProcessed: true,
      quality: "high"
    },
    {
      id: "DOC-002",
      fileName: "drivers_license.jpg", 
      type: "id",
      status: "approved",
      caseId: "DA-2024-001235",
      uploadedAt: "4 hours ago",
      autoProcessed: true,
      quality: "high"
    },
    {
      id: "DOC-003",
      fileName: "damage_photo_1.jpg",
      type: "damage-photos",
      status: "needs-review",
      caseId: "DA-2024-001236",
      uploadedAt: "1 day ago",
      autoProcessed: false,
      quality: "low"
    }
  ];

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'insurance': return <FileText className="h-4 w-4" />;
      case 'id': return <FileText className="h-4 w-4" />;
      case 'receipts': return <FileText className="h-4 w-4" />;
      case 'damage-photos': return <Upload className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-blue-500';
      case 'ocr-complete': return 'bg-green-500';
      case 'approved': return 'bg-green-500';
      case 'needs-review': return 'bg-orange-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Scan className="h-5 w-5 text-purple-500" />
          <span>Document Processing</span>
        </CardTitle>
        <CardDescription>
          Automated OCR processing and document quality assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Processing Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Processing Queue</p>
              <p className="text-2xl font-bold text-blue-800">12</p>
              <p className="text-xs text-blue-500">Documents</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Auto-Processed</p>
              <p className="text-2xl font-bold text-green-800">456</p>
              <p className="text-xs text-green-500">This week</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-sm text-orange-600 font-medium">Needs Review</p>
              <p className="text-2xl font-bold text-orange-800">23</p>
              <p className="text-xs text-orange-500">Low quality</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">OCR Accuracy</p>
              <p className="text-2xl font-bold text-purple-800">94%</p>
              <p className="text-xs text-purple-500">Average</p>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="space-y-3">
            <h3 className="font-semibold">Recent Document Uploads</h3>
            {documentTasks.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getDocumentIcon(doc.type)}
                      <span className="font-medium">{doc.fileName}</span>
                    </div>
                    <Badge className={`${getStatusColor(doc.status)} text-white`}>
                      {doc.status.replace('-', ' ')}
                    </Badge>
                    <Badge className={getQualityColor(doc.quality)}>
                      {doc.quality} quality
                    </Badge>
                    {doc.autoProcessed && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <Bot className="h-3 w-3 mr-1" />
                        Auto-processed
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {doc.caseId}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Type: {doc.type.replace('-', ' ')}</p>
                    <p className="text-xs text-gray-500">Uploaded: {doc.uploadedAt}</p>
                  </div>
                  <div className="space-x-2">
                    {doc.status === 'needs-review' && (
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Review
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Document
                    </Button>
                    <Button size="sm" variant="outline">
                      Assign to Case
                    </Button>
                  </div>
                </div>

                {doc.status === 'processing' && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>OCR Processing</span>
                      <span>Processing...</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* OCR Quality Alert */}
          <div className="border rounded-lg p-4 bg-orange-50">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-orange-800">Quality Issues Detected</h3>
            </div>
            <p className="text-sm text-orange-700 mb-3">
              3 documents uploaded today have low OCR quality and may need manual review.
            </p>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              Review Low Quality Documents
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentProcessing;
