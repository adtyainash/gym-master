'use client';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface Purchase {
  membershipId: number;
  name: string;
  price: number;
  description: string;
  duration: number;
}

async function getPurchase(membershipId: string): Promise<Purchase> {
  const res = await fetch(`/api/membership/${membershipId}`, {
    next: {
      revalidate: 60,
    },
  });

  return res.json();
}

const PurchaseDetails = () => {
  const { membershipId } = useParams();
  const { data: session } = useSession();
  const [isPurchased, setIsPurchased] = useState(false);
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [durationData, setDurationData] = useState(0);
  const [membStatus, setMembStatus] = useState(false);

  useEffect(() => {
    const fetchPurchase = async () => {
      if (membershipId) {
        try {
          const purchaseData: Purchase = await getPurchase(membershipId as string);
          console.log('Purchase Data:', purchaseData);
          setPurchase(purchaseData);
          setDurationData(purchaseData.duration || 0);
          setMembStatus(true);
        } catch (error) {
          console.error('Error fetching purchase data:', error);
        }
      }
    };
  
    fetchPurchase();
  }, [membershipId]);
  

  const handlePurchase = async () => {
      const userId = session?.user.id;
    try{
      const response = await fetch('/api/payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, membershipId: parseInt(membershipId as string, 10) }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Purchase created successfully:', data);
        setIsPurchased(true);
      } else {
        const errorData = await response.json();
        console.error('Error creating purchase:', errorData);
      }


      const putResponse = await fetch ('/api/users/' + userId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({membershipStatus: membStatus, membershipDuration: durationData})
      });
      const body = JSON.stringify({membershipStatus: membStatus, membershipDuration: durationData})
      console.log(durationData)
      console.log(body)

      if (putResponse.ok) {
        const data = await putResponse.json();
        console.log('Purchase created successfully:', data);
        setIsPurchased(true);
      } else {
        const errorData = await putResponse.json();
        console.error('Error creating purchase:', errorData);
      }

    } catch(error){
      console.log(error)
    }
  };

  if (!purchase) {
    return <div>Page is loading...</div>;
  }

  return (
    <main>
      <div className='flex justify-center'>
      <div className="card bg-neutral shadow-lg rounded-lg p-6 w-full max-w-sm mt-16">
        <h2 className='text-xl text-center text-bold text-white'>Your Purchase Detail</h2>
        <h3 className='my-4'>Membership name : {purchase.name}</h3>
        <h3 className='mb-4'>Total price : {purchase.price}</h3>
        {/* Render other purchase details */}
        {!isPurchased && (
          <button onClick={handlePurchase} className="btn btn-primary">
            Purchase Now
          </button>
        )}
        {isPurchased && <p className='text-green-600 text-center'>Purchase Successful!</p>}
      </div>
      </div>
    </main>
  );
};

export default PurchaseDetails;
