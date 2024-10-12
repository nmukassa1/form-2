import { useFormContext } from "@/context/FormContext";
import { supabase } from "@/lib/supabaseClient";

export default function SaveButton() {

  const { formData, formId, setFormId } = useFormContext();

  const saveForm = async () => {
    try {
      const entry = { form_data: formData };
      if (formId) { 
        await supabase.from('client_forms').update(entry).eq('id', formId);
        alert('Form saved!');
      } else {
        const { data, error } = await supabase.from('client_forms').insert([entry]).select('id');

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setFormId(data[0].id);
          localStorage.setItem('formId', data[0].id);
          alert('Form saved!');
        } else {
          console.error('No data returned after insert');
        }
      }
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

    return (
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={saveForm}
          className="px-4 py-2 bg-earthy-sand text-earthy-forest rounded-md"
        >
          Save & Continue Later
        </button>
      </div>
    );
  }