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
        <div className="items-center flex flex-col">
            {/* Text Section */}
            <div className="
          font-bold
          2xl:w-1/3
          md:w-2/3
          xl:w-1/2
          lg:px-0
          px-8
    

            text-5xl
            xl:text-6xl     
            flex
            justify-center
            xl:font-medium
            xl:pt-14
            text-center 
            pt-6
            "
            >
                One tool.
                Every task.
            </div>

            <p
                className="
            text-2xl
            pt-4
            text-center
            w-2/3
            mx-auto
            "
            >
                Powered by AI, TaskFlow adapts to your workflow.
                Get more done effortlessly.
            </p>

            <div className="flex gap-4 pt-6 items-center justify-center">
                <Link href="/">
                    <Buttons />
                </Link>
            </div>

            {/* Image Section */}
            <div className="pt-10 xl:pt-10 items-center justify-center">
                <img
                    className="w-[320px] h:[500px] md:w-[400px] md:[500px] lg:w-[500px] lg:h-auto"
                    src="/team.svg"
                    alt="taskflow-image"
                />
            </div>


        </div>

    );
};

export default Hero;