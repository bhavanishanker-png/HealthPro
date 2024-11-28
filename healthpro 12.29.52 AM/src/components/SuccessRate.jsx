import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SuccessRate = () => {
    // Retrieve the state passed from the navigation
    const location = useLocation();
    const successRateFromState = location.state?.successRate || 64; // Default to 64 if not found

    const [successRate, setSuccessRate] = useState(successRateFromState);

    useEffect(() => {
        if (successRateFromState) {
            setSuccessRate(successRateFromState);
        }
    }, [successRateFromState]);

    return (
        <div className="flex flex-col sm:flex-row justify-center items-center min-h-screen bg-gray-900 text-white px-4 md:px-8">
            <div className="w-full max-w-lg p-6 bg-gray-900 rounded-xl shadow-lg sm:mr-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 text-center">Your estimated IVF Success Rate is</h2>
                <div className="flex justify-center mb-4">
                    <div className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-green-500 rounded-full text-2xl sm:text-3xl md:text-4xl text-white">
                        <span>{successRate}%</span>
                    </div>
                </div>
                <p className="mt-4 text-center text-lg sm:text-xl">With 1 IVF Cycle</p>
            </div>
            <div className="mt-6 sm:mt-0 sm:w-auto">
                <img
                    src="https://s3-alpha-sig.figma.com/img/3083/cfdf/a3342bdeb14d22fce3f84a7131648fe0?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m3rcPSzyYXFQ3av1UzjVwX~ywz9ut1Jmpzmx6Z~RWwUd~~r9UxNnyNl4R9JldCD4zDCW7Q2IeQvOvnDs6u4pyH3CTfoUnO5v492UL1iuyJt3I3zHG387QUApgjGytHwEVS51em2fW5HQXigaiOLgI6ldEf-XgFWD-AZPB6squ7fJ1sPU5SEgs04SJJgSlkJzl1Ka-Ed1OsDBqFXjBxAf7zZ~60XEh1fn~sDWw58OaB~z-10gRcakHkeVapNSDVELmye3t0JjF7zlsu5d9JV7LvBxi6ry6D-l1bYi0r8uWHVFccwd~tuvdXccvuZZNeoqnR6oiSRnQkxLHAzIzIkmVQ__"
                    alt="Couple"
                    className="rounded-lg shadow-lg mx-auto max-w-full h-auto"
                />
            </div>
        </div>
    );
};

export default SuccessRate;
