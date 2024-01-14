import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading,Text, Image, Button, ButtonGroup, Divider } from '@chakra-ui/react'

const GeneratedCard = (props:any) => {
  const {prompt,ImageUrl,id}=props
  console.log(ImageUrl)
  
  return (
    <>
    <Card maxW='xl'>
  <CardBody>
    <Image
      src={ImageUrl}
      alt="Loading Images"
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Ai Generated Images</Heading>
      <Text>
        {prompt}
      </Text>
      {/* <Text color='blue.600' fontSize='2xl'>
        $450
      </Text> */}
    </Stack>
  </CardBody>
  <Divider />
  {/* <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        
      </Button>
    </ButtonGroup>
  </CardFooter> */}
</Card>
    
    </>
  )
}

export default GeneratedCard

