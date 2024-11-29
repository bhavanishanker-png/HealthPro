import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function IVFCalculator() {
    const [ageRange, setAgeRange] = useState('');
    const [cycles, setCycles] = useState(1);
    const [hasICSI, setHasICSI] = useState(false);
    const [hasPGT, setHasPGT] = useState(false);
    const navigate = useNavigate();
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

        // Adjust success rate based on age
        if (ageRange === 'Under 30') successRate += 10;
        if (ageRange === 'Between 30 - 34') successRate += 5;
        if (ageRange === 'Between 35 - 37') successRate += 0;
        if (ageRange === 'Between 38 - 40') successRate -= 5;
        if (ageRange === 'Between 41 - 43') successRate -= 10;
        if (ageRange === 'Above 43') successRate -= 20;

        // Adjust based on IVF cycles
        if (cycles > 1) successRate += 5;

        // Adjust based on additional procedures
        if (hasICSI) successRate += 10; // ICSI increases chances
        if (hasPGT) successRate += 5; // PGT increases chances

        // Adjust based on medical conditions
        if (conditions.PCOS) successRate -= 5;
        if (conditions.Endometriosis) successRate -= 10;
        if (conditions.LowOvarianReserve) successRate -= 15;
        if (conditions.MaleFactorInfertility) successRate -= 5;

        // Ensure success rate stays within a reasonable range
        successRate = Math.max(0, Math.min(100, successRate));

        return successRate;
    };

    return (
        <div id="calculator" className="bg-orange-45 min-h-screen py-10 px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mx-auto bg-orange-45 p-10 flex flex-col justify-center">
                <h1 className="text-3xl font-semibold text-center mb-8">Which age range applies to you?</h1>

                {/* Age Range Selector */}
                <div className="mb-8 flex flex-col items-center">
                    <div className="mt-4 space-y-4">
                        {ageRanges.map((range, idx) => (
                            <label key={idx} className="inline-flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="ageRange"
                                    value={range}
                                    checked={ageRange === range}
                                    onChange={handleAgeRangeChange}
                                    className="hidden peer"
                                />
                                <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-orange-600 peer-checked:bg-orange-600 transition-all">
                                    <div className="w-3 h-3 bg-white rounded-full peer-checked:bg-white"></div>
                                </div>
                                <span className="ml-3 text-lg text-gray-700 peer-checked:text-orange-600 transition-colors">{range}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Number of IVF Cycles */}
                <div className="mb-8 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Number of IVF Cycles</h2>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={cycles}
                        onChange={handleCycleChange}
                        className="w-full mt-4 h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none focus:outline-none focus:ring-2"
                    />
                </div>

                {/* Procedures Radio Buttons */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Have you undergone these procedures before?</h2>
                    <div className="flex flex-col justify-between gap-5 m-6 sm:flex-row sm:gap-4">

                        {/* ICSI Procedure */}
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium">ICSI Procedure:</h3>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="ICSI"
                                    value="yes"
                                    checked={hasICSI}
                                    onChange={handleICSIChange}
                                    className="hidden peer"
                                />
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-orange-600 peer-checked:bg-orange-600">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full peer-checked:bg-white"></div>
                                </div>
                                <span className="ml-3 text-lg text-gray-700 peer-checked:text-orange-600">Yes</span>
                            </label>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="ICSI"
                                    value="no"
                                    checked={!hasICSI}
                                    onChange={handleICSIChange}
                                    className="hidden peer"
                                />
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-orange-600 peer-checked:bg-orange-600">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full peer-checked:bg-white"></div>
                                </div>
                                <span className="ml-3 text-lg text-gray-700 peer-checked:text-orange-600">No</span>
                            </label>
                        </div>

                        {/* PGT Testing */}
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium">PGT Testing:</h3>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="PGT"
                                    checked={hasPGT}
                                    onChange={handlePGTChange}
                                    className="hidden peer"
                                />
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-orange-600 peer-checked:bg-orange-600">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full peer-checked:bg-white"></div>
                                </div>
                                <span className="ml-3 text-lg text-gray-700 peer-checked:text-orange-600">Yes</span>
                            </label>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="PGT"
                                    checked={!hasPGT}
                                    onChange={handlePGTChange}
                                    className="hidden peer"
                                />
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-orange-600 peer-checked:bg-orange-600">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full peer-checked:bg-white"></div>
                                </div>
                                <span className="ml-3 text-lg text-gray-700 peer-checked:text-orange-600">No</span>
                            </label>
                        </div>
                    </div>


                    {/* Medical Conditions Checkbox */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800">Do you have any of these medical conditions?</h2>
                        <div className="flex flex-wrap gap-6 mt-6">
                            {Object.keys(conditions).map((condition) => (
                                <label key={condition} className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name={condition}
                                        checked={conditions[condition]}
                                        onChange={handleConditionChange}
                                        className="mr-2 w-5 h-5"
                                    />
                                    <span className="text-lg text-gray-700">{condition}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Calculate Button */}
                    <div className="mt-8 text-center">
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => navigate(`/result?rate=${calculateSuccessRate()}`)}
                                className="bg-orange-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-colors"
                            >
                                Calculate
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default IVFCalculator;
