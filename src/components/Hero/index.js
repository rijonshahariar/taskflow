import React from "react";
import { Link } from "react-router-dom";
const Buttons = () => {
    return (
        <div>
            <Link to="/tasks">
                <button className="py-[5px] px-[18px] bg-black text-white font-medium text-md  rounded">
                    Try TaskFlow Free
                </button>
            </Link>
        </div>
    );
};
const Hero = () => {
    return (
        <div className="md:container md:mx-auto flex flex-col-reverse lg:flex-row items-center justify-between md:px-[20px] md:py-[120px] ">
            {/* Text Section */}
            <div className="text-center lg:text-left lg:pl-20 space-y-5">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                    One tool.
                    <br />
                    Every task.
                </h1>
                <p className="text-greyish font-medium text-lg">
                    Powered by AI, TaskFlow adapts to your workflow.<br /> Get more done effortlessly.
                </p>
                <Buttons />
                <div>
                    <p className="text-greyish mt-10 mb-2 text-sm">Trusted by 1 million users.</p>
                </div>
            </div>

            {/* Image Section */}
            <div className="mt-5 md:mt-0 mb-5 lg:ml-20">
                <img
                    className="lg:mr-20 w-[320px] h:[500px] md:w-[400px] md:[500px] lg:w-[500px] lg:h-auto"
                    src="/team.svg"
                    alt="taskflow-image"
                />
            </div>

            
        </div>

    );
};

export default Hero;