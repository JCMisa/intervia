import { Textarea } from "@/components/ui/textarea";

interface PROPS {
  onHandleInputChange: (e: string) => void;
  formData: FormDataType;
}

const JobDescriptionForm = ({ onHandleInputChange, formData }: PROPS) => {
  return (
    <div>
      <h2 className="font-bold text-3xl text-primary">Job Title</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Key responsibilities and requirements of the job.
      </p>

      <Textarea
        rows={5}
        value={formData?.jobDescription}
        onChange={(e) => onHandleInputChange(e.target.value)}
        placeholder={"Describe more..."}
      />
    </div>
  );
};

export default JobDescriptionForm;
