import GeneratedCard from '@/src/components/molecules/GeneratedCard';
import { useCart } from '@/src/state/cart';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Generated = () => {
  const router = useRouter();
  const { isLogged } = useCart();
  interface gqlRespType {
    ImageUrl:string,
    userId:string,
    id:string,
    prompt:string
    // Add other properties as needed
  }
  const [gqlResp, setGqlResp] = useState<gqlRespType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedValue = localStorage.getItem("authToken");

      if (isLogged) {
        router.push("/customer/sign-in/");
      } else if (storedValue) {
        const fetchGeneratedImages = `
          query {
            fetchGeneratedImages {
              ImageUrl
              prompt
              id
            }
          }
        `;

        try {
          const response = await axios.post("http://localhost:3000/shop-api", {
            query: fetchGeneratedImages
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedValue}`
            }
          });

          const respData = response.data.data.fetchGeneratedImages;
          
          setGqlResp(respData);
          
         
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [isLogged, router]);

  const cardCount = 5;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', marginTop: "30px", flexWrap: 'wrap', }}>
      {gqlResp.map((data) => (
        <span style={{ marginLeft: "10px", marginRight: "10px" }} key={data.id}>
         
          <GeneratedCard id={data.id} ImageUrl={data.ImageUrl} prompt={data.prompt}/>
        </span>
       
      ))}
    </div>
  );
}

export default Generated;
