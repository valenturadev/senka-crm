
const TravelRadioButton = ({ value, checked, onChange, label }) => {
    return (

        <label className=" mx-2 inline-flex items-center cursor-pointer">
            <input
                type="radio"
                value={value}
                checked={checked}
                onChange={onChange}
                className="sr-only"
            />
            <span className={`py-2 px-[52px] rounded-xl  font-medium ${checked ? 'bg-red-500 text-white' : 'border border-gray-900 bg-white-200 text-gray-600'} transition-all duration-300  hover:border-red-500`}>
        {label}
      </span>
        </label>
    );
};

export default TravelRadioButton;
