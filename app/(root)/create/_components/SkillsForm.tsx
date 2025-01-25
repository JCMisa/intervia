import { Textarea } from "@/components/ui/textarea";

interface PROPS {
  onHandleInputChange: (e: string) => void;
  formData: FormDataType;
}

const SkillsForm = ({ onHandleInputChange, formData }: PROPS) => {
  return (
    <div>
      <h2 className="font-bold text-3xl text-primary">Skills/Qualifications</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Skills and qualifications that are relevant to the job.
      </p>

      <Textarea
        rows={3}
        value={formData?.skills}
        onChange={(e) => onHandleInputChange(e.target.value)}
        placeholder={"Enter skills here..."}
      />
    </div>
  );
};

export default SkillsForm;
