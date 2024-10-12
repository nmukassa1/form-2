

const CategoryTracker = ({ categories, currentCategoryIndex, formData }) => {
  const isCategoryCompleted = (category) => {
    return formData[category].every(item => item.answer.trim() !== "");
  };

  return (
    <ul className="flex flex-wrap mb-[20px] justify-center sm:justify-normal sm:mb-0 sm:flex-col gap-2 flex-shrink-0 cursor-default">
      {categories.map((category, index) => (
        <li key={category} className={`flex gap-[8px] items-center`}>

          <div className={`h-[16px] w-[16px] border border-[#181C14] rounded-lg ${currentCategoryIndex > index  || currentCategoryIndex === index ? 'bg-[#181C14]' : ''}`}>
          </div>
          <div className="capitalize">
            {category.replace(/([A-Z])/g, ' $1')}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryTracker;