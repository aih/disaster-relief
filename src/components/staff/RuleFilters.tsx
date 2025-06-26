
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RuleFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterChange: (value: string) => void;
}

const RuleFilters = ({ searchTerm, onSearchChange, filterType, onFilterChange }: RuleFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search rules by name, description, or plain language..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <Select value={filterType} onValueChange={onFilterChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="validation">Validation</SelectItem>
            <SelectItem value="location">Location</SelectItem>
            <SelectItem value="documentation">Documentation</SelectItem>
            <SelectItem value="condition">Condition</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RuleFilters;
