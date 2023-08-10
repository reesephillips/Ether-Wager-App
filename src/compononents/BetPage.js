import React, { useState, useEffect } from 'react'
import BetSelection from './BetSelection';
import { connectWallet } from '../utils/interact';
import { Button } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'

export default function BetPage() {

  const [walletConnected, setConnected] = useState(false);
  const [walletAddress, setWallet] = useState("");

  const connectWalletPressed = async () => {
    console.log('Connecting wallet...');
    const walletResponse = await connectWallet();
    console.log('Wallet response:', walletResponse);
    setWallet(walletResponse.address);
    setConnected(true);
  };

  useEffect(() => {
    getCurrentWalletConnected()
  }, [])
  

  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          setWallet(addressArray[0])
        } else {
          setWallet("")
        }
      } catch (err) {
        console.log(err.message)
      }
    } else {
      console.log("You must install metamask")
    }
  };

  return (
    <div className='connectWallet'>
    { 
      walletConnected ? (
        <BetSelection walletAddress={walletAddress} />
      )
      :
      <Center h="100vh">
        <VStack spacing='40px'>
          <Button colorScheme='blue' onClick={connectWalletPressed}>Connect Wallet</Button>
        </VStack>
      </Center>
    }
    </div>
  )
}
