import Styles from '@/src/styles/promptGenerator.module.css'
import React, { useState } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';
import { useCart } from '@/src/state/cart';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { Stack } from '@/src/components/atoms/Stack';
const PromptGenerator = () => {
  const router = useRouter();
const [inputValue, setInputValue] = useState('');  
const [imageUrl, setImageUrl] = useState('http://localhost:3001/images/promptJwelery.png');
const [spinnerStatus,setSpinnerStatus]= useState('none')    
const GeneratorAi= async () =>{
  
  setSpinnerStatus('block')
  const generateAiImagesMutation = (prompt:string) => `
  mutation {
    generateAiImages(prompt: "${prompt}") 
  }
`;


const dynamicPrompt = inputValue
const storedValue = localStorage.getItem("authToken");
if (storedValue){
  axios.post("http://localhost:3000/shop-api", {
  query: generateAiImagesMutation(dynamicPrompt)
}, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${storedValue}`
    // If you have any additional headers, include them here
  }
})
  .then(response => {
    if(response.data.data.generateAiImages){
      const imageUrl_=response.data.data.generateAiImages
    setImageUrl(imageUrl_);
    }
    else{
      router.push(`/customer/sign-in/`);
    }
    
  })
  .catch(error => {
    console.error('GraphQL Error:', error);
    router.push(`/customer/sign-in/`);
    // Handle errors here
  }).finally(()=>{
    setSpinnerStatus('none')
  });
}
else{
  router.push(`/customer/sign-in/`);
}

}

const editRedirect=()=>{
 
  // if(isLogged!){
  //   router.push(`/customer/sign-in/`);
  // }
  // else{
    const storedValue = localStorage.getItem("authToken");
    router.push(`/edit/diamond-necklace/?imageurl=${imageUrl}&prompt=${inputValue}&usertoken=${storedValue}`);

  // 
}
  return (
    <>
  <div className={Styles.dashboard}>
  <div style={{ display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
    <h2 style={{marginBottom:'1vh',position:"absolute",top:"1100px" }}>Enter the prompt to bring your personalized jewelry to life</h2>
  <input
        type="text"
        placeholder="Type here..."
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: '90%', padding: '25px',borderRadius:'30px',border:"solid",borderWidth:"0.5px",fontSize:"25px",position:"absolute",top:"1650px"}}
      />
      <AddCircleRoundedIcon style={{width:"500px",height:"70px",position:"absolute",top:"1660px",left:"1300px"}} onClick={GeneratorAi}/>
      <Stack gap="4rem" column>
        
                        {/* 
                        <MainBar title={t('most-wanted')} categories={props.categories} />
                        <MainGrid>
                            {props.products.map(p => (
                                <ProductTile collections={props.categories} product={p} key={p.slug} />
                            ))}
                        </MainGrid> */}
                    </Stack>
                    {/* <ProductCard variant={sampleVariant} /> */}

    <div id="generatedImage">
      {imageUrl && ( 
        <Image
        src={imageUrl}
        alt="Picture of the author"
        width={450} 
        height={450} 
        blurDataURL="data:..." 
        placeholder="blur" 
        style={{
          position: "absolute",
          top: "1180px",
          left:"550px",
          borderRadius: "50px", // Updated border-radius
          background: "#eaeaf8", // Updated background
          boxShadow: "20px 20px 60px #e1e1ee, -20px -20px 60px #f3f3ff", // Updated box-shadow
        
        }}
        onClick={editRedirect}
      />

      )}
    
    </div>
    <Spinner
  thickness='3px'
  speed='0.65s'
  emptyColor='gray.200'
  color='red.500'
  size='xl'
  id="aiImageSpinner"
  style={{position:"relative",top:"-70px",height:"150px",width:"150px",display:spinnerStatus}}
/>
    
      
    </div>
    

  </div>
  
 
  
      
    
  
    </>
  )
}

export default PromptGenerator
