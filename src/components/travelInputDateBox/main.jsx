import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import tr from 'date-fns/locale/tr';
registerLocale('tr', tr)

const TraveInputDateBox = ({ label, id, selectedDate, onChange }) => {
    return (
        <div className="relative flex flex-col">
            <label
                htmlFor={id}
                className={`absolute dark:text-white px-2 font-normal left-[7px] -top-[13.2px] dark:bg-[#232D45] bg-[#d2e5f7] text-gray-500 pointer-events-none transition-all duration-300`}
            >
                {label}
            </label>
            <DatePicker
                selected={selectedDate}
                locale="tr"
                onChange={onChange}
                className={`block w-full dark:text-white px-4 py-2 border dark:bg-[#232D45] bg-[#F1F5F9] border-gray-500 rounded-xl focus:ring focus:ring-red-300 focus:outline-none focus:border-red-300 transition-all duration-300`} />
        </div>
    );
};

export default TraveInputDateBox;