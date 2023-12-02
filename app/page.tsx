'use client';

import Image from 'next/image';
import Link from 'next/link';

const GymMaster = () => {
  return (
    <div className="relative min-h-screen w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url("/images/gym.png")' }}>
      {/* Black overlay with semi-transparency */}
      <div className="absolute inset-0 bg-neutral bg-opacity-75"></div>
      <div className="hero-content flex justify-center items-center w-full h-full absolute">
      <Image src="/images/Logo_GymMaster2.png" className="h-64 rounded-lg shadow-2xl" alt='' width={256} height={256}/>
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-platinum">Welcome to GymMaster</h1>
          <p className="py-6 text-platinum">Manage your gym experience with ease and efficiency. Join our classes today and start your fitness journey!</p>
          <Link href="/sign-up" passHref>
          <button className="btn btn-primary text-platinum font-bold py-2 px-4">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GymMaster;