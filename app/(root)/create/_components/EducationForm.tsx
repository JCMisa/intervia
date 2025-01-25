import { Input } from "@/components/ui/input";

interface PROPS {
  onHandleInputChange: (e: string) => void;
  formData: FormDataType;
}

const EducationForm = ({ onHandleInputChange, formData }: PROPS) => {
  return (
    <div>
      <h2 className="font-bold text-3xl text-primary">
        Educational Background
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Enter your relevant educational qualifications.
      </p>

      <Input
        type="text"
        value={formData?.education}
        onChange={(e) => onHandleInputChange(e.target.value)}
        placeholder={"Enter educational background..."}
      />
    </div>
  );
};

export default EducationForm;
