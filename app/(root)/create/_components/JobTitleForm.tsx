import { Input } from "@/components/ui/input";

interface PROPS {
  onHandleInputChange: (e: string) => void;
  formData: FormDataType;
}

const JobTitleForm = ({ onHandleInputChange, formData }: PROPS) => {
  return (
    <div>
      <h2 className="font-bold text-3xl text-primary">Job Title/Position</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        The specific job you are applying for.
      </p>

      <Input
        type="text"
        value={formData?.jobTitle}
        onChange={(e) => onHandleInputChange(e.target.value)}
        placeholder={"Enter job title..."}
      />
    </div>
  );
};

export default JobTitleForm;
