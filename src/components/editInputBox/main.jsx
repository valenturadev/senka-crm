
const EditInputBox = ({ label, id, placeholder, value, onChange, classNa, readOnly = false }) => {
    return (
        <div className="relative">
            <label
                htmlFor={id}
                className={`absolute dark:text-white px-2 font-normal left-[7px] -top-[13.2px] bg-[#dfe1e3] dark:bg-[#232D45] text-gray-500 pointer-events-none transition-all duration-300`}
            >
                {label}
            </label>
            <input
                type="text"
                id={id}
                placeholder={placeholder}
                readOnly={readOnly}
                value={value}
                onChange={onChange}
                className={`block w-full ${classNa} dark:text-white px-4 py-2 border dark:bg-[#232D45] ${readOnly ? "bg-[#87bef5]" : "bg-[#F1F5F9]"} border-gray-500 rounded-xl focus:ring focus:ring-red-300 focus:outline-none focus:border-red-300 transition-all duration-300`}
            />
        </div>
    );
};

export default EditInputBox;
