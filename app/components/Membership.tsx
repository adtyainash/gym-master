'use client';

const Membership = () => {
  return (
    <div className="relative min-h-screen w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url("/images/gym.png")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>
        <div className="container m-auto relative z-10">        
            <div className="flex flex-wrap items-center justify-center w-full text-center">            
                <div className="w-full md:w-1/2 lg:w-1/3 p-4 mt-16">
                <div className="flex flex-col rounded border-2 border-rich-black bg-blue-700">
                    <div className="py-5 text-rich-black bg-white">
                    <h3>Basic</h3>
                    <p className="text-5xl font-bold">
                        $19.<span className="text-3xl">95</span>
                    </p>
                    <p className="text-xs uppercase">Per Month</p>
                    </div>           
                    <div className="py-5 bg-rich-black text-white rounded-b">
                    <p>Feature of the plan</p>
                    <p>Another feature plan feature</p>
                    <p>Yet another plan feature</p>
                    <button className="px-5 py-2 mt-5 uppercase rounded bg-white text-rich-black font-semibold hover:bg-blue-700 hover:text-white">
                        Get Started
                    </button>
                    </div>            
                </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 p-4 mt-16">
                <div className="flex flex-col rounded">
                    <div style={{ background: "linear-gradient(180deg, #010B13 0%, rgba(47, 55, 62, 0.82) 102.21%, rgba(255, 255, 255, 0.00) 104.92%, rgba(247, 247, 248, 0.03) 104.93%)" }} className="py-7 text-white rounded-t">
                    <h2 className="uppercase text-yellow-300 font-extrabold">
                        Best Deal!
                    </h2>
                    <h3>Standard</h3>
                    <p className="text-5xl font-bold">
                        $49.<span className="text-3xl">95</span>
                    </p>
                    <p className="text-xs uppercase">Per Month</p>
                    </div>
                    <div className="pt-1 pb-7 bg-rich-black text-white rounded-b">
                    <p>Feature of the plan</p>
                    <p>Another feature plan feature</p>
                    <p>Yet another plan feature</p>
                    <button className="px-5 py-2 mt-5 uppercase rounded bg-yellow-300 text-white font-semibold hover:bg-blue-900 hover:text-white">
                        Get Started
                    </button>
                    </div>
                </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 p-4 mt-16">
                <div className="flex flex-col rounded border-2 border-rich-black bg-rich-black">
                    <div className="py-5 text-rich-black bg-white">
                    <h3>Advanced</h3>
                    <p className="text-5xl font-bold">
                        $99.<span className="text-3xl">95</span>
                    </p>
                    <p className="text-xs uppercase">Per Month</p>
                    </div>          
                    <div className="py-5 bg-rich-black text-white rounded-b">
                    <p>Feature of the plan</p>
                    <p>Another feature plan feature</p>
                    <p>Yet another plan feature</p>
                    <button className="px-5 py-2 mt-5 uppercase rounded bg-white text-rich-black font-semibold hover:bg-blue-700 hover:text-white">
                        Get Started
                    </button>
                    </div>            
                </div>
                </div>
            </div>    
        </div>
        <h1 className="text-yellow-300 font-extrabold">Hai</h1>
    </div>
  );
};

export default Membership;