import { useWeb3React } from "@web3-react/core";
import { Container } from "@chakra-ui/react"
import Head from "next/head";
import Nav from '../components/Nav';
import Main from "../components/Main";

const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

function Home() {

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
        <Main />
      </main>
      </Container>

    </div>
  );
}

export default Home;
