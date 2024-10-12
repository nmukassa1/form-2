"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import CategoryTracker from '@/app/components/CategoryTracker';

const FormContext = createContext();

export const FormProvider = ({ children }) => {

  const [formData, setFormData] = useState({
    about: [
      { question: "Can you give me a brief overview of your business?", answer: "" },
      { question: "What is your story? What inspired you to start?", answer: "" },
      { question: "Who is your target audience (age, demographics, interests)?", answer: "" },
      { question: "What is your goal with wanting an online store? (Expand customer reach, Improve convenience for Customers, Build Brand Awareness)", answer: "" },
      { question: "Do you currently have customers? If so, what is your main source of traffic (word of mouth, social media, etc)?", answer: "" },
      { question: "Anything else you'd like me to know?", answer: "" },
    ],
    brandStyle: [
      { question: "If you have one, how would you describe your brand style?", answer: "" },
      { question: "Do you have a colour scheme for your brand? If not, do you have an idea of what you'd like or have an idea of how you would like your site to feel?", answer: "" },
      { question: "Do you have product images or is that something you need?", answer: "" },
      { question: "Anything else you'd like me to know?", answer: "" },
    ],
    whatYouOffer: [
      { question: "What products do you offer (variants, size, etc)?", answer: "" },
      { question: "What sets your product apart from competitors?", answer: "" },
      { question: "Is their a particular product that you want to priortize in your inventory?", answer: "" },
      { question: "Anything else you'd like me to know?", answer: "" },
    ],
    inspiration: [
      { question: "Are there any e-commerce websites or brands you admire or want to model your site after?", answer: "" },
      { question: "What are some non-negotiable design elements to include? (Animations, colors, etc)", answer: "" },
      { question: "Anything else you'd like me to know?", answer: "" },
    ],
    other: [
      { question: "Is their any legal information that needs to be made clear (ingredients, 18+ product, etc)", answer: "" },
    ]
  });

  const [formId, setFormId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  
  const categories = Object.keys(formData);

  useEffect(() => {
    const savedFormId = localStorage.getItem('formId');
    if (savedFormId) {
      loadForm(savedFormId);
    }
  }, []);

  const loadForm = async (id) => {
    const { data } = await supabase.from('client_forms').select('*').eq('id', id).single();
    if (data) {
      setFormData(data.form_data);
      setFormId(id);
    }
  };


  const handleInputChange = (category, questionIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].map((q, i) =>
        i === questionIndex ? { ...q, answer: value } : q
      ),
    }));
  };

  const handleSubmit = async () => {
    // await saveForm();
    // alert('Form submitted!');
    console.log(formData); 
    
  };

  const nextSlide = () => {
    const currentCategory = categories[currentCategoryIndex];
    const isLastQuestionInCategory = currentSlide === formData[currentCategory].length - 1;
  
    if (isLastQuestionInCategory) {
      setCurrentCategoryIndex((prev) => Math.min(prev + 1, categories.length - 1));
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentCategoryIndex((prev) => Math.max(prev - 1, 0));
      const previousCategory = categories[Math.max(currentCategoryIndex - 1, 0)];
      setCurrentSlide(formData[previousCategory].length - 1);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const currentCategory = categories[currentCategoryIndex];

  return (
    <FormContext.Provider
      value={{
        formData,
        formId,
        currentSlide,
        currentCategoryIndex,
        categories,
        currentCategory,
        setFormData,
        setFormId,
        setCurrentSlide,
        setCurrentCategoryIndex,
        loadForm,
        handleInputChange,
        handleSubmit,
        nextSlide,
        prevSlide,
      }}
    >
         <CategoryTracker categories={categories} currentCategoryIndex={currentCategoryIndex} formData={formData} />
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);