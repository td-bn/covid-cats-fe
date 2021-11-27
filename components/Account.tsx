import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { Button, Text, Box} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../util";

type AccountProps = {
  triedToEagerConnect: boolean;
};

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <Box>
        {isWeb3Available ? (
          <Button
            bg="teal.300"
            borderRadius="25px"
            disabled={connecting}
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
          </Button>
        ) : (
          <Button bg="teal.300" onClick={startOnboarding}>Install Metamask</Button>
        )}
      </Box>
    );
  }

  // TODO - DISPLAYING THE ACCOUNT BUTTON FOR CHAINS ON WHICH "const { account } = useWeb3React();" is undefined
  return (
    <a
      {...{
        href: formatEtherscanLink("Account", [chainId, account]),
        target: "_blank",
        rel: "noopener noreferrer",
      }}
    >
      <Text fontWeight="bold" fontSize="md" p="12px 25px" borderRadius="25px" border="1px lightgray solid" _hover={{borderColor:"black"}}>{ENSName || `${shortenHex(account, 4)}`}</Text>
    </a>
  );

};

export default Account;
