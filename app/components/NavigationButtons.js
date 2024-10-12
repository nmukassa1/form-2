export default function NavigationButtons({
    prevSlide,
    nextSlide,
    handleSubmit,
    currentCategoryIndex,
    currentSlide,
    categories,
    formData,
    currentCategory,
  }) {
    return (
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={prevSlide}
          disabled={currentCategoryIndex === 0 && currentSlide === 0}
          className={`px-4 py-2 bg-earthy-clay text-earthy-beige rounded-md disabled:bg-earthy-stone ${currentCategoryIndex === 0 && currentSlide === 0 ? 'hover:cursor-not-allowed' : '' } `}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={
            currentCategoryIndex === categories.length - 1 &&
            currentSlide === formData[currentCategory].length - 1
              ? handleSubmit
              : nextSlide
          }
          className="px-4 py-2 bg-earthy-forest text-earthy-beige rounded-md"
        >
          {currentCategoryIndex === categories.length - 1 &&
          currentSlide === formData[currentCategory].length - 1
            ? 'Submit Form'
            : 'Next'}
        </button>
      </div>
    );
  }