"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Search } from "lucide-react"

export default function FinancialAnalysis() {
    const [ebitda, setEbitda] = useState("10")
    const [interestRate, setInterestRate] = useState("20")
    const [multiple, setMultiple] = useState("10")
    const [factorScore, setFactorScore] = useState(50)
    const [companyName, setCompanyName] = useState("Rodgers Chayuga")
    const [description, setDescription] = useState("Launch your development career with project-based coaching")

    // Toggle button states
    const [selectedEbitda, setSelectedEbitda] = useState("TBD")
    const [selectedInterestRate, setSelectedInterestRate] = useState("TBD")
    const [selectedMultiple, setSelectedMultiple] = useState("TBD")
    const [selectedFactorScore, setSelectedFactorScore] = useState("TBD")
    const [selectedCompanyName, setSelectedCompanyName] = useState("TBD")
    const [selectedDescription, setSelectedDescription] = useState("TBD")

    function getButtonStyle(isSelected: boolean, isTBD: boolean = false) {
        return `${isTBD ? "rounded-r-none" : "rounded-l-none"} py-5 ${isSelected ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-700 hover:bg-gray-600 text-white"}`
    }

    const style_input = "bg-gray-800 border-gray-700 py-5 mr-5"

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-800">
                <header className="max-w-7xl m-auto py-4 flex justify-between items-between">
                    <div className="flex items-center">
                        <span className="text-5xl text-orange-500">20:59</span>
                        <div className="ml-4">
                            <div className="text-sm">Stage : ANALYSIS</div>
                            <div className="text-sm">Next : STRUCTURING - 60 mins</div>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-500 font-bold">
                        JS
                    </div>
                </header>
            </div>

            {/* Main Content */}
            <div className="mt-4">
                <div className="max-w-5xl m-auto flex flex">
                    {/* Sidebar */}
                    <div className="w-16 rounded-md flex flex-col items-center space-y-8">
                        <div className="rounded-md">
                            <Camera className="text-orange-500 w-8 h-8" />
                        </div>
                        <div className="h-px w-8 bg-gray-700" />
                        <div className="p-2">
                            <Search className="text-gray-400 w-8 h-8" />
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="flex-1 bg-gray-900 rounded-lg p-8">
                        <div className="mb-4">
                            <Select>
                                <SelectTrigger className="w-full bg-gray-800 border-gray-700 py-5">
                                    <SelectValue placeholder="Select Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="location1">Location 1</SelectItem>
                                    <SelectItem value="location2">Location 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1">
                                        EBITDA <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        <div className="flex-1 flex">
                                            <Input
                                                value={ebitda}
                                                onChange={(e) => setEbitda(e.target.value)}
                                                className={`${style_input}`}
                                            />
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
                                    <label className="block mb-1">
                                        Interest Rate <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        <div className="flex-1 flex">
                                            <Input
                                                value={interestRate}
                                                onChange={(e) => setInterestRate(e.target.value)}
                                                className={`${style_input}`}
                                            />

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
                                    <label className="block mb-1">
                                        Multiple <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        <div className="flex-1 flex">
                                            <Input
                                                value={multiple}
                                                onChange={(e) => setMultiple(e.target.value)}
                                                className={`${style_input}`}
                                            />
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
                                    <label className="block mb-1">
                                        Factor Score <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2 items-center justify-between">
                                        <div className="w-full">
                                            <div className="mb-2">
                                                <Slider
                                                    value={[factorScore]}
                                                    onValueChange={(value) => setFactorScore(value[0])}
                                                    max={100}
                                                    step={1}
                                                    className="py-4"
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500 mb-2">
                                                <span>0</span>
                                                <span>100</span>
                                            </div>
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
                                    <label className="block mb-1">
                                        Company Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        <Input
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            className={`${style_input}`}
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
                                    <label className="block mb-1">Description</label>
                                    <div className="flex space-x-2">
                                        <Textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className={`h-24 ${style_input}`}
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
                                <div className="text-5xl font-bold text-orange-500 mb-2">$ 200 million</div>
                                <div className="text-gray-400 mb-8">Valuation</div>

                                <div className="w-64 h-64 relative">
                                    <PieChart />
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

function PieChart() {
    return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#1e40af"
                strokeWidth="80"
                strokeDasharray="251.2 0"
                transform="rotate(-90 50 50)"
            />
            <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="80"
                strokeDasharray="175.8 251.2"
                transform="rotate(-90 50 50)"
            />
        </svg>
    )
}
