import { Box, Button, Flex, Heading, Spacer, Center, Text, SimpleGrid, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, HStack } from '@chakra-ui/react';
import React, { ReactElement, useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../util';

function Mint(): ReactElement {

  const {library, active, account, chainId} = useWeb3React();
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  

  const mintNFT = async(num: number) => {
    if (!active) {
      setErrorMessage("Not connected to MetaMask");
      setFailed(true);
      return;
    }

    const contract = getContract(chainId, library, account, "CovidCats");

    try {
      const signer = library.getSigner();
      const tx = await contract.connect(signer).claim();
      await tx.wait();
      alert("Transaction Successful, you should see NFT assigned to you in a while");
    } catch(err) {
      if ('error' in err) {
        setErrorMessage(err.error.message);
      } else {
        setErrorMessage("See browser console for more details");
      }
      console.log(err);
      setFailed(true);
    }
  };

  return (
    <Box id="mint" >
      <Heading as="h2" size="xl">Minting</Heading>
      <Flex>
        <Spacer maxW="15%" />
        <SimpleGrid columns={[2, null, 4]} spacing="10">
          <Button bg="teal.300" w="32" onClick={async () => {await mintNFT(1)}}>Mint x1</Button>
          <Button disabled={true} bg="teal.300" w="32">Mint x2</Button>
          <Button disabled={true} bg="teal.300" w="32">Mint x5</Button>
          <Button disabled={true} bg="teal.300" w="32">Mint x10</Button>
        </SimpleGrid>
        <Spacer maxW="5%" />
      </Flex>

      <Flex mt="4">
        <Box ml="15%" minW="50%">
          {
            failed && 
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Transaction Failed</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
              <CloseButton position="absolute" right="8px" top="8px" onClick={ () => setFailed(false)}/>
            </Alert>
          }
        </Box>
      </Flex>
    </Box>
  )
}

export default Mint
