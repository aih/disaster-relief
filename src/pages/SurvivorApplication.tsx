
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Users, FileText, AlertCircle, CheckCircle, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SurvivorApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    disaster: "",
    assistanceType: [],
    damageDescription: "",
    hasInsurance: "",
    previousFEMAAssistance: false
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

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
      description: "Your disaster assistance application has been received. Reference ID: DA-2024-001234",
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

            <div className="grid md:grid-cols-3 gap-4">
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
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="LA">Louisiana</SelectItem>
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
                  <SelectItem value="DR-4729">DR-4729 - Hurricane Helena (Florida)</SelectItem>
                  <SelectItem value="DR-4730">DR-4730 - Wildfire Complex (California)</SelectItem>
                  <SelectItem value="DR-4728">DR-4728 - Severe Storms (Texas)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>What type of assistance do you need? (Select all that apply) *</Label>
              <div className="space-y-3 mt-2">
                {[
                  { id: "housing", label: "Housing Assistance (Temporary lodging, home repairs)" },
                  { id: "other", label: "Other Needs Assistance (Personal property, transportation)" },
                  { id: "sba", label: "Small Business Administration (SBA) Loan Referral" },
                  { id: "hazard", label: "Hazard Mitigation Assistance" }
                ].map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
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
                    <Label htmlFor={option.id} className="font-normal">{option.label}</Label>
                  </div>
                ))}
              </div>
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
              <p className="text-sm text-gray-500 mt-1">
                Include information about structural damage, personal property loss, and any immediate needs.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Insurance & Previous Assistance</h2>
              <p className="text-gray-600">Help us understand your insurance coverage and previous FEMA assistance.</p>
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

            {formData.hasInsurance && formData.hasInsurance.startsWith('yes') && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Important Insurance Information</h4>
                    <p className="text-blue-700 text-sm mt-1">
                      FEMA assistance may be reduced by the amount of insurance you receive. 
                      You will need to provide documentation of your insurance settlement or denial.
                    </p>
                  </div>
                </div>
              </div>
            )}

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

            {formData.previousFEMAAssistance && (
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-orange-800">Previous Assistance Notice</h4>
                    <p className="text-orange-700 text-sm mt-1">
                      We will review your previous assistance and may need additional documentation 
                      to process your current application.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
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
                <p>{formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Disaster & Assistance</h3>
                <p>Disaster: {formData.disaster}</p>
                <p>Assistance Type: {formData.assistanceType.join(', ')}</p>
                <p>Insurance: {formData.hasInsurance}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">Next Steps</h4>
                  <ul className="text-blue-700 text-sm mt-1 space-y-1">
                    <li>• You will receive a confirmation email with your application reference number</li>
                    <li>• FEMA will contact you within 10 days to schedule an inspection (if applicable)</li>
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
                <h1 className="text-xl font-bold">Disaster Assistance Application</h1>
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
