import React from 'react'
import Image from 'next/image';

const FooterGym = () => {
  return (
<footer className="footer items-center p-4 bg-neutral text-neutral-content">
  <aside className="items-center grid-flow-col">
  <Image src="/images/Logo_Footer.png" className="h-4" alt='' width={33} height={16} />
    <p data-testid="gymmaster">&copy; {new Date().getFullYear()} Gym Master</p>
  </aside> 
</footer>
  )
}

export default FooterGym;