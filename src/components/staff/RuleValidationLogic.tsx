
interface RuleValidationLogicProps {
  ruleName: string;
  ruleType: string;
  onValidationChange: (error: string) => void;
}

export const useRuleValidation = () => {
  const validateRuleName = (name: string, ruleType: string) => {
    const startsWithHas = name.toLowerCase().startsWith('has');
    
    if (startsWithHas && ruleType !== 'documentation') {
      return "Rule names starting with 'Has' must be Documentation type rules";
    }
    
    if (ruleType === 'documentation' && !startsWithHas) {
      return "Documentation rules must start with 'Has'";
    }
    
    return "";
  };

  const getPlaceholderText = (ruleType: string) => {
    switch (ruleType) {
      case 'documentation': return 'e.g., Has Insurance Documentation';
      case 'location': return 'e.g., Is in Affected Area';
      case 'condition': return 'e.g., Is Primary Residence';
      case 'validation': return 'e.g., Passed Identity Check';
      default: return 'Enter rule name';
    }
  };

  return { validateRuleName, getPlaceholderText };
};
