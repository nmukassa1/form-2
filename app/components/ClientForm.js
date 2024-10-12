"use client"; // Indicates that this file is a client-side component in Next.js

import { useFormContext } from '@/context/FormContext';
import NavigationButtons from './NavigationButtons';
import SaveButton from './SaveButton';
import Slide from './Slide';

export default function ClientForm() {
  const {
    formData,
    currentSlide,
    currentCategoryIndex,
    categories,
    currentCategory,
    handleInputChange,
    nextSlide,
    prevSlide,
    handleSubmit,
  } = useFormContext();

  return (
      <div className="relative sm:w-[600px] bg-earthy-beige sm:mx-auto text-center sm:text-left">
        <div className="overflow-hidden relative">
          <CategoryHeader currentCategory={currentCategory} />
          <Slide />
        </div>

        <NavigationButtons
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          handleSubmit={handleSubmit}
          currentCategoryIndex={currentCategoryIndex}
          currentSlide={currentSlide}
          categories={categories}
          formData={formData}
          currentCategory={currentCategory}
        />

        <SaveButton />
      </div>
  );
}

function CategoryHeader({ currentCategory }) {
  return (
    <h3 className="text-[2rem] font-bold mb-4 capitalize text-black-DEFAULT">
      {currentCategory.replace(/([A-Z])/g, ' $1')}
    </h3>
  );
}