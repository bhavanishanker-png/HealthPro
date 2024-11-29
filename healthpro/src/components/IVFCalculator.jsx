import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function IVFCalculator() {
    const [ageRange, setAgeRange] = useState('');
    const [cycles, setCycles] = useState(1);
    const [hasICSI, setHasICSI] = useState(false);
    const [hasPGT, setHasPGT] = useState(false);
    const navigate = useNavigate()
    const [conditions, setConditions] = useState({
        PCOS: false,
        Endometriosis: false,
        LowOvarianReserve: false,
        MaleFactorInfertility: false,
    });

    const ageRanges = [
        'Under 30       ',
        'Between 30 - 34',
        'Between 35 - 37',
        'Between 38 - 40',
        'Between 41 - 43',
        'Above 43       ',
    ];

    const handleConditionChange = (e) => {
        const { name, checked } = e.target;
        setConditions((prev) => ({ ...prev, [name]: checked }));
    };

    const handleAgeRangeChange = (e) => {
        setAgeRange(e.target.value);
    };

    const handleCycleChange = (e) => {
        setCycles(e.target.value);
    };

    const handleICSIChange = (e) => {
        setHasICSI(e.target.value === "yes");
    };

    const handlePGTChange = () => {
        setHasPGT(!hasPGT);
    };

    const calculateSuccessRate = () => {
        let successRate = 50;

        if (ageRange === 'Under 30') successRate += 10;
        if (ageRange === 'Above 43') successRate -= 20;

        if (cycles > 1) successRate += 5;
        if (hasICSI) successRate += 10;
        if (hasPGT) successRate += 5;

        if (conditions.Endometriosis) successRate -= 5;
        if (conditions.LowOvarianReserve) successRate -= 10;
        return successRate;
    };

    return (
        <div id="calculator" className="bg-orange-50 min-h-screen py-10 px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mx-auto bg-orange-50 p-10 flex flex-col justify-center">
                <h1 className="text-3xl font-semibold text-center mb-8">Which age range applies to you?</h1>
                {/* Age Range Selector */}
                <div className="mb-8 flex flex-col items-center">
                    <div className="mt-4">
                        {ageRanges.map((range, idx) => (
                            <label key={idx} className="ml-2 inline-flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="ageRange"
                                    value={range}
                                    checked={ageRange === range}
                                    onChange={handleAgeRangeChange}
                                    className="hidden peer" // Hides the default radio button
                                />
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-orange-600 peer-checked:bg-orange-600 transition-all">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full peer-checked:bg-white"></div>
                                </div>
                                <span className="ml-3 text-lg text-gray-700 peer-checked:text-orange-600 transition-colors">{range}</span>
                            </label>

                        ))}
                    </div>
                </div>

                {/* Number of IVF Cycles */}
                <div className="mb-8 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Number of IVF Cycles</h2>
                    <div className="flex flex-col items-center">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={cycles}
                            onChange={handleCycleChange}
                            className="w-6/6 mt-4 h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />

                        <p className="text-center mt-4 text-lg font-medium text-gray-700">{cycles} Cycle(s)</p>
                    </div>

                </div>

                {/* ICSI & PGT Procedure */}
                <div className="mb-6 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4">Have you undergone these procedures before?</h2>
                    <div className="mt-2 space-x-6 sm:flex sm:space-y-0 sm:flex-row sm:space-x-6 md:flex md:flex-row">
                        <div className="flex items-center mr-4">
                            <h3 className="mr-4 text-lg">ICSI Procedure:</h3>
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="icsi"
                                    value="yes"
                                    checked={hasICSI === true}
                                    onChange={handleICSIChange}
                                    className="hidden peer" // Hide the default radio button
                                />
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-orange-600 peer-checked:bg-orange-600 transition-all">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full peer-checked:bg-white"></div>
                                </div>
                                <span className="text-lg text-gray-700 peer-checked:text-orange-600 transition-colors">Yes</span>
                            </label>

                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="icsi"
                                    value="no"
                                    checked={hasICSI === false}
                                    onChange={handleICSIChange}
                                    className="hidden peer"
                                />
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-orange-600 peer-checked:bg-orange-600 transition-all">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full peer-checked:bg-white"></div>
                                </div>
                                <span className="text-lg text-gray-700 peer-checked:text-orange-600 transition-colors">No</span>
                            </label>
                        </div>

                        <div className="flex items-center">
                            <h3 className="mr-4 text-lg">PGT Testing:</h3>
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="pgtTesting" // Unique name
                                    value="yes"
                                    checked={hasPGT === true}
                                    onChange={handlePGTChange}
                                    className="hidden peer"
                                />
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-orange-600 peer-checked:bg-orange-600 transition-all">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full peer-checked:bg-white"></div>
                                </div>
                                <span className="text-lg text-gray-700 peer-checked:text-orange-600 transition-colors">Yes</span>
                            </label>

                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="pgtTesting" // Unique name
                                    value="no"
                                    checked={hasPGT === false}
                                    onChange={handlePGTChange}
                                    className="hidden peer"
                                />
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-orange-600 peer-checked:bg-orange-600 transition-all">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full peer-checked:bg-white"></div>
                                </div>
                                <span className="text-lg text-gray-700 peer-checked:text-orange-600 transition-colors">No</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Medical Conditions */}
                <div className="mb-8 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4">Do you have any of these medical conditions?</h2>
                    <div className="mt-4 space-y-3">
                        {Object.keys(conditions).map((condition) => (
                            <label key={condition} className="inline-flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name={condition}
                                    checked={conditions[condition]}
                                    onChange={handleConditionChange}
                                    className="hidden peer" // Hide the default checkbox
                                />
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center peer-checked:border-orange-600 peer-checked:bg-orange-600 transition-all">
                                    <svg
                                        className="w-3 h-3 text-white hidden peer-checked:block"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-lg capitalize text-gray-700 peer-checked:text-orange-600 transition-colors">
                                    {condition.replace(/([A-Z])/g, ' $1')}
                                </span>
                            </label>

                        ))}
                    </div>
                </div>

                {/* Calculate Button */}
                <div className="mt-10 text-center">
                    <button
                        onClick={() => {
                            const successRate = calculateSuccessRate();
                            alert(`Estimated Success Rate: ${calculateSuccessRate()}%`);
                            navigate('/success-rate', { state: { successRate } });
                        }}
                        className="px-8 py-3 bg-orange-600 text-white rounded-lg text-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                        Calculate
                    </button>

                </div>
            </div>
        </div>
    );
}

export default IVFCalculator;
