import { Box, Flex, Select, Container, Progress, Text, Image, Button, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import { ContractFactory, ethers } from "ethers"
import React, { ReactElement, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../util';
import { useRouter } from 'next/router';

function Mint2({data}): ReactElement {

  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [numberAvailableToMint, setNumberAvailableToMint] = useState(10000);
  const [awaitingMetadata, setAwaitingMetadata] = useState(false)

  const router = useRouter();
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
      alert("Transaction success, please don't close the screen until you have your NFT image");
      setIsMinting(false)
      setAwaitingMetadata(true)
      router.push('/minting')
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

  const handleSetURI = async(_tokenURI:string) => {
    try {
      const signer = library.getSigner();
      const tx = await contract.connect(signer).claim({value: ethers.utils.parseEther("0.1")});
      await tx.wait();
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <Box id="mint">
        <Flex justifyContent = "center" mb="25px">
            <Image border = "2px black solid" maxHeight= "100%" width = "384px" src="cat_0.png" alt="CovidCat" /> 
        </Flex>
        <Flex flexDirection = "column" alignItems="center">
            {chainId === 4 && <Text fontSize="2xl" fontWeight="bold">{numberAvailableToMint}/10000 CovidCats left at 0.1 ETH each</Text>}
            {chainId !== 4 && <Text fontSize="2xl" fontWeight="bold" color="red" textTransform="uppercase">Please switch to Rinkeby network</Text>}
            <br/>
            <Button colorScheme="blue" isLoading={isMinting} onClick={handleMint}>Mint</Button>
            <br/>

            {
              awaitingMetadata &&
              <Container fontSize="1.1rem" textAlign="center">
                  <Text>NFT claimed! Generating image...</Text>
                  <Text>Be patient. Will take 3-5 minutes</Text>
                  <Text>Please don&#39;t close the page until you have the metadata</Text>
                  <br/>
                  <Progress size="lg" isIndeterminate />
              </Container>
            }

            {data &&
              <Flex mt={10} flexDirection = "column" alignItems="center">
                <Text fontSize="2.3rem" fontWeight="700">CONGRATULATIONS 🥳</Text>
                <Box boxSize="sm">
                  <Image src={data[0]} alt={data[0]} />
                </Box>
                <Text>{data[1]}</Text>
                {/* <Button colorScheme="blue" onClick={handleSetURI}>Set onchain metadata</Button> */}
              </Flex> 
            }

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