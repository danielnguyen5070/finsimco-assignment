import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
    title: string;
    content: string;
    initiallyOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, initiallyOpen = true }) => {
    const [isOpen, setIsOpen] = useState(initiallyOpen);

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm mb-4">
            <button
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-gray-800">{title}</span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            <div
                className={`transition-all duration-300 ease-in-out px-4 overflow-hidden ${isOpen ? 'max-h-96 py-2' : 'max-h-0 py-0'
                    }`}
            >
                <p className="text-sm text-gray-700">{content}</p>
            </div>
        </div>
    );
};

export default Accordion;
