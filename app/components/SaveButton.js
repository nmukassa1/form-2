"use client"

import { useFormContext } from "@/context/FormContext";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function SaveButton() {

  const { formData, formId, setFormId } = useFormContext();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      // setTimeout(() => {
      //   setShowModal(false);
      // }, 3000);
    }
  }, [showModal])

  const saveForm = async () => {
    try {
      const entry = { form_data: formData };
      // console.log(formData);
      
      if (formId) { 
        await supabase.from('client_forms').update(entry).eq('id', formId);
        setShowModal(true);
      } else {
        const { data, error } = await supabase.from('client_forms').insert([entry]).select('id');

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setFormId(data[0].id);
          localStorage.setItem('formId', data[0].id);
          setShowModal(true);
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

        <div className={`h-[200px] w-[90vw] sm:w-[500px] bg-white border-2 border-black rounded-lg fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ${showModal ? 'grid' : 'hidden'} content-center`}>
          <h1>Form Saved</h1>
          <p>You can continue filling it out later on the same device. You can close window</p>
        </div>
      </div>
    );
  }