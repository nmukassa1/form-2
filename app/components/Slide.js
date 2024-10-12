import { useFormContext } from "@/context/FormContext";
import FormSlide from "./FormSlide";

export default function Slide() {

    const {
        formData,
        currentSlide,
        currentCategory,
        handleInputChange,
      } = useFormContext();

  return (
    <div
        className="flex transition-transform duration-700 ease-in-out pr-4 gap-4"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
    >
        {formData[currentCategory].map((q, questionIndex) => (
            <FormSlide
                key={questionIndex}
                question={q.question}
                answer={q.answer}
                onChange={(e) => handleInputChange(currentCategory, questionIndex, e.target.value)}
            />
        ))}
    </div>
  )

}