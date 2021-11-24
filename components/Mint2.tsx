import { Box, Flex, Select, Text, Image, Button, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import { ContractFactory, ethers } from "ethers"
import React, { ReactElement, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../util';

function Mint2(): ReactElement {

  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [numberAvailableToMint, setNumberAvailableToMint] = useState(10000);

  const {library, active, account, chainId} = useWeb3React();
  const contract = chainId === 4 ? getContract(chainId, library, account, "CovidCats") : null

  // Hook to enable frontend to fetch remainingSupply from CovidCats.sol
  useEffect(() => {
    (async() => {
      try {
        const remainingSupply = await contract.remainingSupply()
        setNumberAvailableToMint(Number(remainingSupply));
      } catch (err) {
        console.log(err)
      }
    })();
  })

  const handleMint = async() => {
    await mintNFT()
  }
  
  const mintNFT = async() => {
    if (!active) {
      setErrorMessage("Not connected to MetaMask");
      setFailed(true);
      return;
    }

    setIsMinting(true);

    try {
      const signer = library.getSigner();
      const tx = await contract.connect(signer).claim({value: ethers.utils.parseEther("0.1")});
      await tx.wait();
      setIsMinting(false);
      alert("Transaction Successful, you should see NFT assigned to you in a while");
    } catch(err) {
      if ('error' in err) {
        setErrorMessage(err.error.message);
      } else {
        setErrorMessage("See browser console for more details");
      }
      console.log(err);
      setIsMinting(false);
      setFailed(true);
    }
  };

  return (
    <Box id="mint" _focus={{bg: "white"}}>
        <Flex justifyContent = "center" mb="25px">
            <Image border = "2px black solid" maxHeight= "100%" width = "384px" src="cat_0.png" alt="CovidCat" /> 
        </Flex>
        <Flex flexDirection = "column" alignItems="center">
            {chainId === 4 && <Text fontSize="2xl" fontWeight="bold">{numberAvailableToMint}/10000 CovidCats left at 0.1 ETH each</Text>}
            {chainId !== 4 && <Text fontSize="2xl" fontWeight="bold" color="red" textTransform="uppercase">Please switch to Rinkeby network</Text>}
            {/* TO-DO connect "0/10000" and "0.1" number to view functions on CovidCats smart contract */}
            {/* <br/> */}
            {/* <Select 
              value={amountToMint} 
              onChange={(e) => setAmountToMint(Number(e.target.value))}
              maxWidth="25vw" borderColor="gray.400" variant="outline" placeholder="Select number to mint"
              >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select> */}
            <br/>
            <Button colorScheme="blue" isLoading={isMinting} onClick={handleMint}>Mint</Button>

            <Box mt="8" maxW="60vw">
              {
                failed && 
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>Transaction Failed</AlertTitle>
                  <AlertDescription mr={5}>{errorMessage}</AlertDescription>
                  <CloseButton position="absolute" right="8px" top="8px" onClick={ () => setFailed(false)}/>
                </Alert>
              }
            </Box>
        </Flex>
    </Box>
  )
}

export default Mint2

