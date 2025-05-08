"use client"

import { useState, useEffect } from "react"
import DiscreteSlider from "@/components/DiscreteSlider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import svg_camera from "@/assets/camera.svg"
import svg_doc from "@/assets/document.svg"
import PieChart from "@/components/PieChart"
import FloatingAccordion from "@/components/FloatingAccordion"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function FinancialAnalysis() {
    const [ebitda, setEbitda] = useState("10")
    const [interestRate, setInterestRate] = useState("20")
    const [multiple, setMultiple] = useState("10")
    const [factorScore, setFactorScore] = useState(50)
    const [companyName, setCompanyName] = useState("Rodgers Chayuga")
    const [description, setDescription] = useState("Launch your development career with project-based coaching")
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        console.log("User signed out");
        // Add your actual sign-out logic here
    };
    // Toggle button states
    const [selectedEbitda, setSelectedEbitda] = useState("TBD")
    const [selectedInterestRate, setSelectedInterestRate] = useState("TBD")
    const [selectedMultiple, setSelectedMultiple] = useState("TBD")
    const [selectedFactorScore, setSelectedFactorScore] = useState("TBD")
    const [selectedCompanyName, setSelectedCompanyName] = useState("TBD")
    const [selectedDescription, setSelectedDescription] = useState("TBD")
    const [timeLeft, setTimeLeft] = useState(1259); // 20:59 in seconds

    const EBITDA = 1000;
    const valuation = EBITDA * parseInt(multiple) * factorScore;
    const team1Share = valuation * 0.6;
    const team2Share = valuation * 0.4;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    function getButtonStyle(isSelected: boolean, isTBD: boolean = false) {
        return `${isTBD ? "rounded-r-none" : "rounded-l-none"} py-5 ${isSelected ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-700 hover:bg-gray-600 text-white"}`
    }
    const style_input = "bg-gray-800 border-gray-700 py-5 "
    const guidanceText =
        "Welcome to the negotiation simulation! In this exercise, your team will input financial terms such as EBITDA, Multiple, and Interest Rate. These inputs will dynamically determine the valuation and visual representation in the pie chart. Be sure to collaborate, review each term carefully, and aim for a fair outcome. This guidance appears only once to help you get started confidently. Good luck, and negotiate wisely!";
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-800">
                <header className="max-w-7xl m-auto py-4 flex justify-between items-between">
                    <div className="flex items-center">
                        <span className="text-5xl text-orange-500 w-32">{formatTime(timeLeft)}</span>
                        <div className="ml-4">
                            <div className="text-sm text-gray-300">Stage : ANALYSIS</div>
                            <div className="text-sm text-gray-400">Next : STRUCTURING - 60 mins</div>
                        </div>
                    </div>
                    {/* Dropdown menu */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-500 font-bold">
                            JS
                        </button>

                        {isOpen && (
                            <div className="p-4 absolute right-0 mt-2 w-40 bg-gray-800 rounded shadow-lg z-10">
                                <Button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-sm"
                                >
                                    Log out
                                </Button>
                            </div>
                        )}
                    </div>
                </header>
            </div>

            {/* Main Content */}
            <div className="mt-7">
                <div className="max-w-5xl m-auto flex flex">
                    {/* Sidebar */}
                    <div className="w-16 rounded-md flex flex-col items-center space-y-8 mr-6">
                        <div className="rounded-md mt-2">
                            {/* import svg from "@/assets/logo.svg" */}
                            <Dialog>
                                <DialogTrigger>
                                    <img src={svg_camera} alt="Logo" className="w-12 h-12" />
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-7xl bg-black border-0 text-white rounded-lg shadow-lg">
                                    <DialogHeader>
                                        <DialogTitle></DialogTitle>
                                        <DialogDescription>
                                            <div className="aspect-video w-full mt-2">
                                                <iframe
                                                    className="w-full h-full rounded-md"
                                                    src="https://www.youtube.com/embed/lA8uv9tDLJI"
                                                    title="Simulation Guidance Video"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="h-px w-14 bg-gray-700 opacity-65" />
                        <div className="">
                            <Dialog>
                                <DialogTrigger>
                                    <img src={svg_doc} alt="Logo" className="w-12 h-12" />
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-xl bg-gray-900 border-0 text-white rounded-lg shadow-lg">
                                    <DialogHeader>
                                        <DialogTitle></DialogTitle>
                                        <DialogDescription>
                                            <p className="text-gray-300 mt-2">{guidanceText}</p>
                                            <p className="text-gray-300 mt-2">{guidanceText}</p>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="flex-1 bg-gray-900 rounded-lg p-8">
                        <div className="mb-4 w-full">
                            <FloatingAccordion
                                title="First Time Guidance"
                                content={guidanceText}
                            />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2 text-sm text-gray-300">
                                        EBITDA <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        <div className="flex-1 flex">
                                            <div className="relative w-full mr-5">
                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">$</span>
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">million</span>
                                                <Input
                                                    value={ebitda}
                                                    onChange={(e) => setEbitda(e.target.value)}
                                                    className={`pr-16 pl-6 ${style_input}`}
                                                />
                                            </div>

                                        </div>
                                        <div className="flex">
                                            <Button
                                                className={getButtonStyle(selectedEbitda === "TBD", true)}
                                                onClick={() => setSelectedEbitda("TBD")}
                                            >
                                                TBD
                                            </Button>
                                            <Button
                                                className={getButtonStyle(selectedEbitda === "OK", false)}
                                                onClick={() => setSelectedEbitda("OK")}
                                            >
                                                OK
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-300">
                                        Interest Rate <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        <div className="flex-1 flex">
                                            <div className="relative w-full mr-5">
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">%</span>
                                                <Input
                                                    value={interestRate}
                                                    onChange={(e) => setInterestRate(e.target.value)}
                                                    className={`${style_input}`}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <Button
                                                className={getButtonStyle(selectedInterestRate === "TBD", true)}
                                                onClick={() => setSelectedInterestRate("TBD")}
                                            >
                                                TBD
                                            </Button>
                                            <Button
                                                className={getButtonStyle(selectedInterestRate === "OK", false)}
                                                onClick={() => setSelectedInterestRate("OK")}
                                            >
                                                OK
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-300">
                                        Multiple <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        <div className="flex-1 flex">
                                            <div className="relative w-full mr-5">
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">x</span>
                                                <Input
                                                    value={multiple}
                                                    onChange={(e) => setMultiple(e.target.value)}
                                                    className={`${style_input}`}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <Button
                                                className={getButtonStyle(selectedMultiple === "TBD", true)}
                                                onClick={() => setSelectedMultiple("TBD")}
                                            >
                                                TBD
                                            </Button>
                                            <Button
                                                className={getButtonStyle(selectedMultiple === "OK", false)}
                                                onClick={() => setSelectedMultiple("OK")}
                                            >
                                                OK
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-300">
                                        Factor Score <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        <div className="flex-1 flex mr-7">
                                            <DiscreteSlider min={1} max={5} step={1} label="Interest Rate (%)" onChange={(v) => setFactorScore(v)} />
                                        </div>

                                        <div className="flex justify-end">
                                            <div className="flex">
                                                <Button
                                                    className={getButtonStyle(selectedFactorScore === "TBD", true)}
                                                    onClick={() => setSelectedFactorScore("TBD")}
                                                >
                                                    TBD
                                                </Button>
                                                <Button
                                                    className={getButtonStyle(selectedFactorScore === "OK", false)}
                                                    onClick={() => setSelectedFactorScore("OK")}
                                                >
                                                    OK
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-300">
                                        Company Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        <Input
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            className={`${style_input} mr-7`}
                                        />
                                        <div className="flex">
                                            <Button
                                                className={getButtonStyle(selectedCompanyName === "TBD", true)}
                                                onClick={() => setSelectedCompanyName("TBD")}
                                            >
                                                TBD
                                            </Button>
                                            <Button
                                                className={getButtonStyle(selectedCompanyName === "OK", false)}
                                                onClick={() => setSelectedCompanyName("OK")}
                                            >
                                                OK
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-300">Description</label>
                                    <div className="flex space-x-2">
                                        <Textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className={`h-24 ${style_input} mr-7 pt-2`}
                                        />
                                        <div className="flex justify-end">
                                            <div className="flex">
                                                <Button
                                                    className={getButtonStyle(selectedDescription === "TBD", true)}
                                                    onClick={() => setSelectedDescription("TBD")}
                                                >
                                                    TBD
                                                </Button>
                                                <Button
                                                    className={getButtonStyle(selectedDescription === "OK", false)}
                                                    onClick={() => setSelectedDescription("OK")}
                                                >
                                                    OK
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <div>
                                    <div className="text-5xl font-medium text-orange-500 mb-2">$ 200 million</div>
                                    <div className="text-gray-400 mb-8 italic text-sm">Valuation</div>
                                </div>

                                <div className="w-72 h-72 relative">
                                    <PieChart team1Share={team1Share} team2Share={team2Share} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Button className="w-full py-5 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500">
                                SUBMIT
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
