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

const IndustryForm = ({ onHandleInputChange, formData }: PROPS) => {
  return (
    <div>
      <h2 className="font-bold text-3xl text-primary">Job Industry</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Select the industry or field related to the job you are applying for.
      </p>

      <Select
        onValueChange={(value) => onHandleInputChange(value)}
        value={formData?.industry}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"Information Technology"}>
            Information Technology
          </SelectItem>
          <SelectItem value={"Healthcare"}>Healthcare</SelectItem>
          <SelectItem value={"Finance"}>Finance</SelectItem>
          <SelectItem value={"Marketing"}>Marketing</SelectItem>
          <SelectItem value={"Manufacturing"}>Manufacturing</SelectItem>
          <SelectItem value={"Education"}>Education</SelectItem>
          <SelectItem value={"Retail"}>Retail</SelectItem>
          <SelectItem value={"Engineering"}>Engineering</SelectItem>
          <SelectItem value={"Hospitality"}>Hospitality</SelectItem>
          <SelectItem value={"Media"}>Media</SelectItem>
          <SelectItem value={"Others"}>Others</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default IndustryForm;
