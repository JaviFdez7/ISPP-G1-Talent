import React, { useState } from 'react';

export default function DropdownComponent({ name, imgSrc, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-10/12 max-w-6xl h-100 p-1 rounded shadow-md flex flex-col justify-between mt-10  ml-10 mr-10"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                marginLeft: "50",
                marginRight: "100",
                borderColor: "orange",
                borderWidth: "1px",
            }}>

            <div className="flex flex-col items-center"> 
                <h2  
                    className="text-2xl font-bold text-center text-white mt-5 mb-5 cursor-pointer"
                    style={{ borderBottom: '1px solid orange' , userSelect: 'none'}}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center"> 
                        <img src={imgSrc} className="rounded-full border border-gray-300 mb-4"
                            style={{ width: "3vw", height: "6vh" }}
                        />
                        <span className="ml-2">{name}</span>
                        <span>{isOpen ? '▲' : '▼'}</span>
                    </div>
                    
                </h2>
                {isOpen && (
                    <div className="flex justify-center w-3/4 mb-10">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}