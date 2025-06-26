
export const generateRegoCode = (policyData: any): string => {
  const packageName = policyData.counties ? policyData.counties.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'disaster_policy';

  return `# fema_eligibility/policies/${policyData.disasterId}/${packageName}.rego

package ${packageName}

# Disaster Configuration for ${policyData.disasterId}
# Location: ${policyData.counties}, ${policyData.state}
# Generated with Rego Extensions: Temporal Logic, Geospatial Functions, Enhanced Data Integration

import future.keywords.if
import future.keywords.in

# Global Eligibility Criteria
# These must be true for any assistance.
global_eligibility if {
    input.survivor.in_declared_area
    input.survivor.passed_validations
}

# Serious Needs Assistance (Expedited) - Countywide
allow_serious_needs_assistance_expedited if {
    global_eligibility
    input.survivor.in_geofenced_area
    input.survivor.reported_immediate_need
}

# Serious Needs Assistance (Regular)
allow_serious_needs_assistance_regular if {
    global_eligibility
    input.survivor.inspection.minor_damage_found
}

# Clean and Sanitize
# Inspections are waived for Clean and Sanitize in ${policyData.counties}
allow_clean_and_sanitize if {
    global_eligibility
    # Note: Inspection requirement omitted (waived for this county)
}

# Transportation Assistance (Replace)
allow_transportation_assistance_replace if {
    global_eligibility
    input.survivor.vehicle.only_vehicle
    input.survivor.vehicle.duly_registered
    input.survivor.vehicle.duly_insured
    input.survivor.documents.insurance_settlement_present
    input.survivor.vehicle.uninsured_losses
    input.survivor.documents.proof_of_loss_present
    input.survivor.documents.replacement_estimate_or_appraisal_present
}

# Transportation Assistance (Repair)
allow_transportation_assistance_repair if {
    global_eligibility
    input.survivor.vehicle.only_vehicle
    input.survivor.vehicle.duly_registered
    input.survivor.vehicle.duly_insured
    input.survivor.documents.insurance_settlement_present
    input.survivor.vehicle.uninsured_losses
    input.survivor.documents.repair_bill_estimate_present
}

# Displacement Assistance
# Inspections are waived for Displacement Assistance in ${policyData.counties}
allow_displacement_assistance if {
    global_eligibility
    # Note: Inspection requirement omitted (waived for this county)
}

# Funeral Assistance
allow_funeral_assistance if {
    global_eligibility
    input.survivor.responsible_for_funeral_costs
    input.survivor.decedent_died_from_disaster
    input.survivor.documents.death_certificate_present
    input.survivor.documents.funeral_bill_present
}

# Child Care Assistance
allow_child_care_assistance if {
    global_eligibility
    input.survivor.child_is_legal_responsibility
    input.survivor.need_for_child_care_caused_by_disaster
    input.survivor.child_care_criteria_met
    input.survivor.documents.proof_of_cost_present
}

# Medical and Dental Assistance
allow_medical_and_dental_assistance if {
    global_eligibility
    input.survivor.documents.medical_or_dental_need_caused_by_disaster
    (input.survivor.documents.insurance_settlement_details_present; input.survivor.uninsured)
    input.survivor.documents.receipts_or_quotes_present
}

# Personal Property Assistance
allow_personal_property_assistance if {
    global_eligibility
    input.survivor.documents.personal_property_damaged_or_destroyed
    input.survivor.documents.quotes_or_receipts_for_damaged_property_present
}

# Moving and Storage Expenses
allow_moving_and_storage_expenses if {
    global_eligibility
    input.survivor.documents.moving_and_storage_necessary_due_to_disaster
    input.survivor.documents.quotes_or_receipts_for_moving_and_storage_present
}

# Maximum Awards Configuration
max_awards := {
    "serious_needs_assistance_expedited": 770.00,
    "serious_needs_assistance_regular": 770.00,
    "clean_and_sanitize": 300.00,
    "displacement_assistance": 1638.00,
    "transportation_assistance_replace": 5000.00,
    "transportation_assistance_repair": 5000.00,
    "funeral_assistance": 9000.00,
    "child_care_assistance": 1000.00,
    "medical_and_dental_assistance": 1000.00,
    "personal_property_assistance": 2500.00,
    "moving_and_storage_expenses": 1000.00
}

# Special Provisions for ${policyData.counties}
special_provisions := {
    "clean_and_sanitize": ["INSPECTION_WAIVED"],
    "displacement_assistance": ["INSPECTION_WAIVED"],
    "serious_needs_assistance_expedited": ["GEOFENCING_ENABLED", "EXPEDITED_PROCESSING"]
}

# Temporal Logic Extensions (Enhanced Rego)
# temporal_rule_example if {
#     time.now_ns() - input.disaster.declaration_date < time.parse_duration_ns("30d")
# }

# Geospatial Extensions (Enhanced Rego)  
# geofenced_area_check if {
#     geo.within_polygon(input.survivor.location, input.disaster.geofenced_boundaries)
# }

# Data Integration Extensions (Enhanced Rego)
# external_data_validation if {
#     ssa.verify_identity(input.survivor.ssn)
#     irs.validate_tax_status(input.survivor.tax_id)
# }`;
};
