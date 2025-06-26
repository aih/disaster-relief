import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Users, FileText, AlertCircle, CheckCircle, Phone, Mail, Upload, X, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SurvivorApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File[]}>({
    insurance: [],
    id: [],
    receipts: [],
    damage: [],
    vehicle: [],
    funeral: [],
    death: []
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    county: "",
    disaster: "",
    assistanceType: [],
    damageDescription: "",
    hasInsurance: "",
    previousFEMAAssistance: false,
    immediateNeed: false,
    vehicleInfo: {
      isOnlyVehicle: false,
      isRegistered: false,
      isInsured: false,
      needsRepair: false,
      needsReplacement: false
    },
    funeralInfo: {
      isResponsible: false,
      deathCausedByDisaster: false
    }
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleFileUpload = (category: string, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(prev => ({
        ...prev,
        [category]: [...prev[category], ...fileArray]
      }));
    }
  };

  const removeFile = (category: string, index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted Successfully",
      description: "Your disaster assistance application has been received. Reference ID: DR-4701-001234",
    });
    navigate('/application-status');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
              <p className="text-gray-600">Please provide your contact information and current address.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input 
                  id="firstName" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input 
                  id="lastName" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="(555) 123-4567"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input 
                id="address" 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="123 Main Street"
                required 
              />
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input 
                  id="city" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Select onValueChange={(value) => setFormData({...formData, state: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NY">New York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="county">County *</Label>
                <Select onValueChange={(value) => setFormData({...formData, county: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Broome">Broome County</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input 
                  id="zipCode" 
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  placeholder="12345"
                  required 
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Disaster Information</h2>
              <p className="text-gray-600">Tell us about the disaster that affected your property.</p>
            </div>

            <div>
              <Label htmlFor="disaster">Which disaster affected your property? *</Label>
              <Select onValueChange={(value) => setFormData({...formData, disaster: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the disaster" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DR-4701-NY">DR-4701-NY - Broome County Disaster</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>What type of assistance do you need? (Select all that apply) *</Label>
              <div className="space-y-3 mt-2">
                {[
                  { 
                    id: "sna-expedited", 
                    label: "Serious Needs Assistance (Expedited)", 
                    description: "Up to $770 - For immediate basic needs",
                    special: true
                  },
                  { 
                    id: "sna-regular", 
                    label: "Serious Needs Assistance (Regular)", 
                    description: "Up to $770 - Requires inspection for minor damage"
                  },
                  { 
                    id: "clean-sanitize", 
                    label: "Clean and Sanitize", 
                    description: "Up to $300 - No inspection required",
                    special: true
                  },
                  { 
                    id: "transport-repair", 
                    label: "Transportation Assistance (Repair)", 
                    description: "Up to $5,000 - Vehicle repair assistance"
                  },
                  { 
                    id: "transport-replace", 
                    label: "Transportation Assistance (Replace)", 
                    description: "Up to $15,000 - Vehicle replacement assistance"
                  },
                  { 
                    id: "funeral", 
                    label: "Funeral Assistance", 
                    description: "Up to $7,000 - For disaster-related deaths"
                  },
                  { 
                    id: "displacement", 
                    label: "Displacement Assistance", 
                    description: "Up to $1,638 - Temporary lodging (14 days) - No inspection required",
                    special: true
                  }
                ].map((option) => (
                  <div key={option.id} className="border rounded-lg p-3">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id={option.id}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData, 
                              assistanceType: [...formData.assistanceType, option.id]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              assistanceType: formData.assistanceType.filter(type => type !== option.id)
                            });
                          }
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={option.id} className="font-medium">{option.label}</Label>
                          {option.special && <Star className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                        {option.special && (
                          <p className="text-xs text-green-600 mt-1 font-medium">✓ Special policy active for Broome County</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="immediateNeed"
                checked={formData.immediateNeed}
                onCheckedChange={(checked) => setFormData({...formData, immediateNeed: checked as boolean})}
              />
              <Label htmlFor="immediateNeed" className="font-normal">
                I have immediate needs (qualifies for expedited assistance)
              </Label>
            </div>

            <div>
              <Label htmlFor="damageDescription">Describe the damage to your property *</Label>
              <Textarea 
                id="damageDescription"
                value={formData.damageDescription}
                onChange={(e) => setFormData({...formData, damageDescription: e.target.value})}
                placeholder="Please provide details about the damage caused by the disaster..."
                rows={4}
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Additional Information</h2>
              <p className="text-gray-600">Please provide additional details based on your assistance needs.</p>
            </div>

            <div>
              <Label>Do you have insurance that covers this damage? *</Label>
              <Select onValueChange={(value) => setFormData({...formData, hasInsurance: value})}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select insurance status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes-full">Yes, insurance covers all damage</SelectItem>
                  <SelectItem value="yes-partial">Yes, but insurance only covers some damage</SelectItem>
                  <SelectItem value="yes-denied">Yes, but insurance denied my claim</SelectItem>
                  <SelectItem value="no">No, I do not have insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.assistanceType.includes('transport-repair') || formData.assistanceType.includes('transport-replace') ? (
              <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                <h3 className="font-semibold text-blue-800">Vehicle Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isOnlyVehicle"
                      checked={formData.vehicleInfo.isOnlyVehicle}
                      onCheckedChange={(checked) => setFormData({
                        ...formData, 
                        vehicleInfo: {...formData.vehicleInfo, isOnlyVehicle: checked as boolean}
                      })}
                    />
                    <Label htmlFor="isOnlyVehicle" className="font-normal">This is my only vehicle</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isRegistered"
                      checked={formData.vehicleInfo.isRegistered}
                      onCheckedChange={(checked) => setFormData({
                        ...formData, 
                        vehicleInfo: {...formData.vehicleInfo, isRegistered: checked as boolean}
                      })}
                    />
                    <Label htmlFor="isRegistered" className="font-normal">Vehicle is registered in my name</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isInsured"
                      checked={formData.vehicleInfo.isInsured}
                      onCheckedChange={(checked) => setFormData({
                        ...formData, 
                        vehicleInfo: {...formData.vehicleInfo, isInsured: checked as boolean}
                      })}
                    />
                    <Label htmlFor="isInsured" className="font-normal">Vehicle is insured</Label>
                  </div>
                </div>
              </div>
            ) : null}

            {formData.assistanceType.includes('funeral') ? (
              <div className="bg-orange-50 p-4 rounded-lg space-y-4">
                <h3 className="font-semibold text-orange-800">Funeral Assistance Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isResponsible"
                      checked={formData.funeralInfo.isResponsible}
                      onCheckedChange={(checked) => setFormData({
                        ...formData, 
                        funeralInfo: {...formData.funeralInfo, isResponsible: checked as boolean}
                      })}
                    />
                    <Label htmlFor="isResponsible" className="font-normal">I am responsible for funeral expenses</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="deathCausedByDisaster"
                      checked={formData.funeralInfo.deathCausedByDisaster}
                      onCheckedChange={(checked) => setFormData({
                        ...formData, 
                        funeralInfo: {...formData.funeralInfo, deathCausedByDisaster: checked as boolean}
                      })}
                    />
                    <Label htmlFor="deathCausedByDisaster" className="font-normal">Death was caused by the disaster</Label>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="previousFEMA"
                checked={formData.previousFEMAAssistance}
                onCheckedChange={(checked) => setFormData({...formData, previousFEMAAssistance: checked as boolean})}
              />
              <Label htmlFor="previousFEMA" className="font-normal">
                I have received FEMA assistance for this disaster before
              </Label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Document Upload</h2>
              <p className="text-gray-600">Upload supporting documents based on your assistance needs.</p>
            </div>

            <div className="space-y-6">
              {/* Required Documents */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Required Documents</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="id-upload">Identity Verification (Driver's License, Passport, State ID) *</Label>
                    <Input
                      id="id-upload"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('id', e.target.files)}
                      className="cursor-pointer mt-2"
                    />
                    {uploadedFiles.id.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {uploadedFiles.id.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm text-gray-600">{file.name}</span>
                            <Button size="sm" variant="ghost" onClick={() => removeFile('id', index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Insurance Documentation */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Insurance Documentation</h3>
                <div className="space-y-3">
                  <Label htmlFor="insurance-upload">Insurance policy, claim forms, settlement information, or denial letters</Label>
                  <Input
                    id="insurance-upload"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => handleFileUpload('insurance', e.target.files)}
                    className="cursor-pointer"
                  />
                  {uploadedFiles.insurance.length > 0 && (
                    <div className="space-y-2">
                      {uploadedFiles.insurance.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <Button size="sm" variant="ghost" onClick={() => removeFile('insurance', index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Vehicle Documentation - only show if transportation assistance selected */}
              {(formData.assistanceType.includes('transport-repair') || formData.assistanceType.includes('transport-replace')) && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Vehicle Documentation</h3>
                  <div className="space-y-3">
                    <Label htmlFor="vehicle-upload">
                      Vehicle registration, insurance, repair bills, or replacement proof
                    </Label>
                    <Input
                      id="vehicle-upload"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => handleFileUpload('vehicle', e.target.files)}
                      className="cursor-pointer"
                    />
                    {uploadedFiles.vehicle.length > 0 && (
                      <div className="space-y-2">
                        {uploadedFiles.vehicle.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm text-gray-600">{file.name}</span>
                            <Button size="sm" variant="ghost" onClick={() => removeFile('vehicle', index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Funeral Documentation - only show if funeral assistance selected */}
              {formData.assistanceType.includes('funeral') && (
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Funeral Documentation</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="death-upload">Death Certificate *</Label>
                      <Input
                        id="death-upload"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('death', e.target.files)}
                        className="cursor-pointer mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="funeral-upload">Funeral Bills and Documentation *</Label>
                      <Input
                        id="funeral-upload"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => handleFileUpload('funeral', e.target.files)}
                        className="cursor-pointer mt-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* General Documents */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Additional Documentation</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="receipts-upload">Receipts and Disaster-Related Expenses</Label>
                    <Input
                      id="receipts-upload"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => handleFileUpload('receipts', e.target.files)}
                      className="cursor-pointer mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="damage-upload">Damage Photos</Label>
                    <Input
                      id="damage-upload"
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('damage', e.target.files)}
                      className="cursor-pointer mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Star className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800">Broome County Special Policies</h4>
                  <ul className="text-green-700 text-sm mt-1 space-y-1">
                    <li>• Expedited Serious Needs Assistance available for immediate needs</li>
                    <li>• Inspections waived for Clean and Sanitize assistance</li>
                    <li>• Inspections waived for Displacement Assistance</li>
                    <li>• Faster processing for qualifying applications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Review & Submit</h2>
              <p className="text-gray-600">Please review your information before submitting your application.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Personal Information</h3>
                <p>{formData.firstName} {formData.lastName}</p>
                <p>{formData.phone} {formData.email && `• ${formData.email}`}</p>
                <p>{formData.address}, {formData.city}, {formData.county} County, {formData.state} {formData.zipCode}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Disaster & Assistance</h3>
                <p>Disaster: {formData.disaster}</p>
                <p>Assistance Programs: {formData.assistanceType.length} selected</p>
                <p>Insurance: {formData.hasInsurance}</p>
                {formData.immediateNeed && <p className="text-green-600 font-medium">✓ Immediate needs reported (expedited processing)</p>}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">Next Steps for DR-4701-NY</h4>
                  <ul className="text-blue-700 text-sm mt-1 space-y-1">
                    <li>• You will receive a confirmation email with reference number DR-4701-XXXXXX</li>
                    <li>• Expedited assistance may be processed within 24-48 hours if qualified</li>
                    <li>• Some programs have waived inspection requirements for faster processing</li>
                    <li>• You can check your application status online or by calling 1-800-621-3362</li>
                    <li>• Continue to save receipts for disaster-related expenses</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6" />
              <div>
                <h1 className="text-xl font-bold">DR-4701-NY Broome County Application</h1>
                <p className="text-green-200 text-sm">Federal Emergency Management Agency</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-621-3362</span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="text-green-600 border-white hover:bg-white"
              >
                Exit Application
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Application Form */}
        <Card>
          <CardContent className="p-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              <div className="space-x-4">
                <Button variant="outline">Save & Continue Later</Button>
                {currentStep === totalSteps ? (
                  <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                    Submit Application
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                    Next Step
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Need Help?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium">Call FEMA</p>
                  <p className="text-gray-600">1-800-621-3362</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium">TTY</p>
                  <p className="text-gray-600">1-800-462-7585</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium">Online Help</p>
                  <p className="text-gray-600">DisasterAssistance.gov</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SurvivorApplication;
