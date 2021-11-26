import { useWeb3React } from "@web3-react/core";
import { Container } from "@chakra-ui/react"
import Head from "next/head";
import Nav from '../components/Nav';
import Main from "../components/Main";

import { GetServerSideProps } from 'next'

function Minting({data}) {

  return (
    <div>
      <Head>
        <title>Covid Cats NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Container bg="teal.100" minW="720px" maxW="90%" marginTop="3" > */}
      <Container minW="720px" maxW="90%" marginTop="3" >
        <header >
          <Nav />
        </header>

      <main>
        <Main data={data}/>
      </main>
      </Container>

    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { image_engine_main } = require('../image-engine/index')
  
  // User requests page -> getServerSideProps requests prop -> prop needs to be returned before page rendered
  // We have wrapped "image_engine_main" in a promise, it can only resolve once the event listener 
  
  // We want to return a dummy initData value before the Mint button is pressed
  // When Mint button pressed, we want to run through the image_engine_main() function
  // Call refreshData() logic once we have metadata_link returned

  try {
    const metadata_link = await image_engine_main();
    console.log(metadata_link)
    console.log("GOT METADATA LINK")
    const data = metadata_link
    return {props: { data }}

  } catch(err) {
    console.log(err)
  }

  // const metadata_link = await image_engine_main();
  // const data = numeral;

  // return {props: { data }}
}

export default Minting;