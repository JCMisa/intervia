import { Textarea } from "@/components/ui/textarea";

interface PROPS {
  onHandleInputChange: (e: string) => void;
  formData: FormDataType;
}

const KeyCompetenciesForm = ({ onHandleInputChange, formData }: PROPS) => {
  return (
    <div>
      <h2 className="font-bold text-3xl text-primary">Key Competencies</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Core competencies or areas of expertise required for the job.
      </p>

      <Textarea
        rows={5}
        value={formData?.keyCompetencies}
        onChange={(e) => onHandleInputChange(e.target.value)}
        placeholder={"Enter core competencies..."}
      />
    </div>
  );
};

export default KeyCompetenciesForm;
