import { useState } from 'react';

interface DiscreteSliderProps {
    min: number;
    max: number;
    step: number;
    value?: number;
    onChange?: (value: number) => void;
    label?: string;
}

const DiscreteSlider: React.FC<DiscreteSliderProps> = ({
    min,
    max,
    step,
    value: propValue,
    onChange,
}) => {
    const [value, setValue] = useState(propValue ?? min);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = Number(e.target.value);
        setValue(newVal);
        onChange?.(newVal);
    };

    const marks = [];
    for (let i = min; i <= max; i += step) {
        marks.push(i);
    }

    return (
        <div className="w-full">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="w-full appearance-none rounded h-2"
                style={{
                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((value - min) / (max - min)) * 100
                        }%, #d1d5db ${((value - min) / (max - min)) * 100}%, #d1d5db 100%)`,
                }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
                {marks.map((mark, i) => (
                    <span key={mark} className="" style={{ width: i == marks.length - 1 ? "4%" : `${100 / (marks.length - 1)}%` }}>
                        {mark}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default DiscreteSlider;
