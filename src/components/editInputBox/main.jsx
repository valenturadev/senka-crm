import React from 'react';
import moment from 'moment';

const EditInputBox = ({ label, id, placeholder, value, onChange, classNa, readOnly = false }) => {
    let formattedValue = value; // Initialize with the original value

    if (moment.isMoment(value)) {
        // Check if value is a valid Moment.js object
        formattedValue = moment(value).format('DD/MM/YYYY');
    }

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
                value={formattedValue}
                onChange={onChange}
                className={`block w-full ${classNa} dark:text-white px-4 py-2 border dark:bg-[#232D45] ${readOnly ? "bg-[#bddeff]" : "bg-[#F1F5F9]"} border-gray-500 rounded-xl focus:ring focus:ring-red-300 focus:outline-none focus:border-red-300 transition-all duration-300`}
            />
        </div>
    );
};

export default EditInputBox;
