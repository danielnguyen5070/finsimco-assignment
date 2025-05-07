import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FloatingAccordionProps {
    title: string;
    content: string;
}

const FloatingAccordion: React.FC<FloatingAccordionProps> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(true);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full relative inline-block" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-base px-4 border bg-gray-800 border-gray-700 py-2 mr-5 rounded-md shadow transition"
            >
                {title}
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 w-full p-4 rounded-lg shadow-lg bg-gray-800 mt-1 z-50">
                    <p className="text-sm text-gray-300">{content}</p>
                </div>
            )}
        </div>
    );
};

export default FloatingAccordion;
