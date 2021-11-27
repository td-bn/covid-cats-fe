import { Box, Flex, Select, Container, Progress, Text, Image, Button, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import { ContractFactory, ethers } from "ethers"
import React, { ReactElement, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../util';
import { abi } from '../util/abi'
const axios = require("axios")

function Mint2(): ReactElement {

  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [numberAvailableToMint, setNumberAvailableToMint] = useState(10000);
  const [awaitingMetadata, setAwaitingMetadata] = useState(false)
  const [gotMetadata, setGotMetadata] = useState(false)
  const [mintingDisabled, setMintingDisabled] = useState(false)
  const [imageLink, setImageLink] = useState("")
  const [metadataLink, setMetadataLink] = useState("")
  const [tokenID, setTokenID] = useState(1)

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
      setMintingDisabled(true)
      setAwaitingMetadata(true)
      // await turnOnMoralisEventListener()
      await getMintEvent_ethers_js()
      // Turn on ethers.js event listener, perform same action on events in turnOnMoralisEventListener()
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

  const turnOnMoralisEventListener = async() => {

    try {
      const res = await axios.post("/api")
      setGotMetadata(true)
      setImageLink(res.data[0])
      setMetadataLink(res.data[1])
      setTokenID(res.data[2])
      setAwaitingMetadata(false)
    } catch (e) { 
      console.log(e)
    }
  }

  // Wrote this Mint event listener that doesn't call the Next.js API route until we have the random numbers
  // Once we have the random numbers, it should be less than 3s to get the metadata link
  // Heroku doesn't allow us more than 30s to get the response, and it is going to take >30s to Mint and then get the event listener
  async function getMintEvent_ethers_js() {
    const covidcats_contract = new ethers.Contract(contract.address, abi, library);
    
    console.log("LISTENING FOR MINT EVENT")
    covidcats_contract.once("Mint", async (_minter: string, _tokenID: any) => {
      const id = _tokenID.toNumber();
      const random_numbers = await findMintEvent(id)
      console.log(random_numbers)

      const decoded_random_numbers = random_numbers.map(element => Number(element))

      console.log("SENDING API REQUEST")
      const res = await axios.post("/api", {random_number_array: decoded_random_numbers})
      setGotMetadata(true)
      setImageLink(res.data[0])
      setMetadataLink(res.data[1])
      setTokenID(res.data[2])
      setAwaitingMetadata(false)
    })
  }

  // For any tokenID, find the corresponding Mint event and get trait data from event log data
  async function findMintEvent(_tokenId: number) {
    const covidcats_contract = new ethers.Contract(contract.address, abi, library);
    
    // Get the Mint event by tokenId
    const eventFilter = covidcats_contract.filters.Mint(null, _tokenId)
    const event = await covidcats_contract.queryFilter(eventFilter);
    
    // Use ethers.js library to decode this Mint event
    const iface = new ethers.utils.Interface(abi)
    const data = event[0].data
    const topics = event[0].topics
    const decoded_event = iface.parseLog({ data, topics })

    // Return NFT traits
    const nft_traits = decoded_event.args[2]
    return nft_traits;
  }
  
  // const handleSetURI = async() => {

  //   if (!active) {
  //     setErrorMessage("Not connected to MetaMask");
  //     setFailed(true);
  //     return;
  //   }
  
  //   try {
  //     const signer = library.getSigner();
  //     // const tx = await contract.connect(signer)._setTokenURI(tokenID, metadataLink);
  //     const tx = await contract.connect(signer)._setTokenURI(tokenID, metadataLink);
  //     await tx.wait();
  //   } catch (err) {
  //     console.log(err)
  //   }
  // };

  return (
    <Box id="mint">
        <Flex justifyContent = "center" mb="25px">
            <Image border = "2px black solid" maxHeight= "100%" width = "384px" src="cat_0.png" alt="CovidCat" /> 
        </Flex>
        <Flex flexDirection = "column" alignItems="center">
            {chainId === 4 && <Text fontSize="2xl" fontWeight="bold">{numberAvailableToMint}/10000 CovidCats left at 0.1 ETH each</Text>}
            {chainId !== 4 && <Text fontSize="2xl" fontWeight="bold" color="red" textTransform="uppercase">Please switch to Rinkeby network</Text>}
            <br/>
            <Button colorScheme="blue" isLoading={isMinting} isDisabled={mintingDisabled} onClick={handleMint}>Mint</Button>
            <br/>
            {/* <Button colorScheme="blue" onClick={turnOnMoralisEventListener}>Test</Button> */}

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

            {gotMetadata &&
              <Flex mt={10} flexDirection = "column" alignItems="center">
                <Text fontSize="2.3rem" fontWeight="700">CONGRATULATIONS 🥳</Text>
                <Box boxSize="sm">
                  <Image src={imageLink} alt={imageLink} />
                </Box>
                <Text>{metadataLink}</Text>
                {/* {<Button colorScheme="blue" onClick={handleSetURI}>Set onchain metadata</Button>} */}
              </Flex> 
            }

            {/* {<Button colorScheme="blue" onClick={handleSetURI}>Set onchain metadata</Button>} */}

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