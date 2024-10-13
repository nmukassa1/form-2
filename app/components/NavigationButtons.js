"use client"
import axios from "axios";
import { useFormContext } from "@/context/FormContext";
import { useEffect, useState } from "react";

export default function NavigationButtons() {

    const {setCurrentSlide, currentCategoryIndex, setCurrentCategoryIndex, currentSlide, categories, formData, currentCategory} = useFormContext();
    const [showModal, setShowModal] = useState(false);

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

    const openModal = () => {
      setShowModal(true);
    }

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   //Validate form
    //   const name = prompt(`What's your name?`);
    //   const email = prompt(`What's your email?`);
    //   const details = { name, email };
    //   const newFormData = { ...formData, details };
    
    //   try {
    //     const response = await axios.post('/api/sendEmail', newFormData);
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error('Error submitting form:', error);
    //   }
    // };

    return (
      <div className="flex justify-between mt-4 relative">
        {/* Next Button */}
        <button
          type="button"
          onClick={prevSlide}
          disabled={currentCategoryIndex === 0 && currentSlide === 0}
          className={`px-4 py-2 bg-earthy-clay text-earthy-beige rounded-md disabled:bg-earthy-stone ${currentCategoryIndex === 0 && currentSlide === 0 ? 'hover:cursor-not-allowed' : '' } `}
        >
          Previous
        </button>
        {/* Back Button */}
        <button
          type="button"
          onClick={
            currentCategoryIndex === categories.length - 1 &&
            currentSlide === formData[currentCategory].length - 1
              ? openModal
              : nextSlide
          }
          className="px-4 py-2 bg-earthy-forest text-earthy-beige rounded-md"
        >
          {currentCategoryIndex === categories.length - 1 &&
          currentSlide === formData[currentCategory].length - 1
            ? 'Finish'
            : 'Next'}
        </button>
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </div>
    );
  }

  function Modal({showModal, setShowModal}){
    const {formData} = useFormContext();
    const [details, setDetails] = useState({ name: '', email: '' });
    const [emailSent, setEmailSent] = useState(false);

    // useEffect(() => {
    //   if (emailSent) {
       
    //   }
    // }, [emailSent])

    const closeModal = (e) => {
      e.preventDefault();
      setShowModal(false);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      //Validate form
      if(!details.name || !details.email){
        alert('Please fill in all fields');
        return;
      }
      const newFormData = { ...formData, details: details };
    
      try {
        const response = await axios.post('/api/sendEmail', newFormData);
        setEmailSent(true);
        console.log(response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    return (
      // <div className="h-screen w-screen bg-black fixed right-0 top-0 opacity-[30%] overflow-hidden">
      <div className={`${showModal ? 'absolute' : 'hidden'} top-[-220px] right-0 h-[200px] w-[300px] bg-white border-2 border-black rounded-lg p-4`}>
        {!emailSent ? (
        <form  onSubmit={handleSubmit} >
          <div className="relative">
            <button className="absolute top-0 right-0" onClick={closeModal}>X</button>
            <h2 className="text-lg font-bold">Enter your details</h2>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={details.name} onChange={(e) => setDetails((prev) => ({ ...prev, name: e.target.value }))} 
                className="border-2 border-black ml-2 px-2 focus:outline-none"
              />
            </div>

            <div className="my-2">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={details.email} onChange={(e) => setDetails((prev) => ({ ...prev, email: e.target.value }))} 
                className="border-2 border-black ml-2 px-2 focus:outline-none"
              />
            </div>
            <button type="submit" className="bg-earthy-forest text-earthy-beige rounded-md px-2 py-1">Submit</button>
          </div>
        </form>
        ): (
          <div>
            <h2>Form Submited</h2>
            <p>I'll will be in touch shortly</p>
            <small>Nyah Mukassa</small>
            <br />
            <small>nmukassa1@gmail.com</small>
          </div>
        ) 
        }
      </div>
      // </div>
    )
  }