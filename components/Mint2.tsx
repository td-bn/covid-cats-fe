import { Box, Flex, Select, Text, Image, Button, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import React, { ReactElement, useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../util';

function Mint2(): ReactElement {
  

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
    <Box id="mint" _focus={{bg: "white"}}>
        <Flex justifyContent = "center" mb="25px">
            <Image border = "2px black solid" maxHeight= "100%" width = "384px" src="cat_0.png" alt="CovidCat" /> 
        </Flex>
        <Flex flexDirection = "column" alignItems="center">
            <Text fontSize="2xl" fontWeight="bold">0/10000 CovidCats left at 0.1 ETH each</Text>
            {/* TO-DO connect "0/10000" and "0.1" number to view functions on CovidCats smart contract */}
            <br/>
            <Select maxWidth="25vw" borderColor="gray.400" variant="outline" placeholder="Select number to mint">
              <option value="option1">1</option>
              <option value="option2">2</option>
              <option value="option3">3</option>
              <option value="option3">4</option>
              <option value="option3">5</option>
            </Select>
            <br/>
            <Button colorScheme="blue" onClick={async () => {await mintNFT(1)}}>Mint</Button>

            <Box mt="10" minW="35vw">
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

export default Mint2
