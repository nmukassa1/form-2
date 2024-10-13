import { useFormContext } from "@/context/FormContext";

export default function FormSlide({ question, answer, onChange, questionIndex, value }) {

  const { formData, setFormData, currentCategory } = useFormContext();

  const handleInputChange = (category, questionIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].map((q, i) =>
        i === questionIndex ? { ...q, answer: value } : q
      ),
    }));
  };

    return (
      <div className="w-full flex-shrink-0">
        <div className="mb-4">
          <p className="block text-black-DEFAULT text-[1rem] mb-2">{question}</p>
          <textarea
            value={answer}
            onChange={(e) => {
              // onChange(e);
              handleInputChange(currentCategory, questionIndex, e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            className="w-full p-2 border-2 border-black rounded-md bg-transparent focus:outline-none min-h-[170px] max-h-[230px]"
          ></textarea>
          <p className='text-grey'>(optional)</p>
        </div>
      </div>
    );
  }