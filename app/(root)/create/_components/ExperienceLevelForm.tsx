import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PROPS {
  onHandleInputChange: (e: string) => void;
  formData: FormDataType;
}

const ExperienceLevelForm = ({ onHandleInputChange, formData }: PROPS) => {
  return (
    <div>
      <h2 className="font-bold text-3xl text-primary">Experience Level</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Select your current experience level (e.g. entry-level, mid-level,
        senior).
      </p>

      <Select
        onValueChange={(value) => onHandleInputChange(value)}
        value={formData?.experienceLevel}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Experience Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"entryLevel"}>Entry Level</SelectItem>
          <SelectItem value={"midLevel"}>Mid Level</SelectItem>
          <SelectItem value={"senior"}>Senior</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ExperienceLevelForm;
