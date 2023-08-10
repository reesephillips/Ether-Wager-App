import React, { useState, useEffect } from 'react';
import { Radio, RadioGroup, Stack, NumberInput, VStack, Heading, NumberInputField, Flex, Box, Button, useToast } from '@chakra-ui/react';
import '../styles/BetSelection.css'
import { placeBet, claimUserWinnings } from '../utils/interact';


export default function BetSelection(props) {
  const [betAmount, setBetAmount] = useState(0);
  const [betSelection, setBetSelection] = useState(1);
  const [showAnimation, setShowAnimation] = useState(false);
  
  const toast = useToast()

  const handleBetAmountChanged = (event) => {
    setBetAmount(event.target.value);
    console.log(betAmount);
  }

  const handleSelectionChange = (value) => {
    setBetSelection(value);
  }

  const handleBet = async () => {

    if (betAmount <= 0) {
        toast({
          title: 'No Bet Amount Placed',
          description: 'Must enter a bet amount',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      return;
    } else {

      setShowAnimation(true)

      try {
        const { thestatus, description } = await placeBet(betSelection, 1, betAmount);
        toast({
          title: 'Bet Placed',
          description: description,
          status: thestatus,
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Bet Failed',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      setShowAnimation(false)
    }
  }

  const handleClaimWinnings = async () => {

      setShowAnimation(true)

      try {
        const { thestatus, description } = await claimUserWinnings(betSelection, 1, betAmount);
        toast({
          title: 'Winnings claimed',
          description: description,
          status: thestatus,
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      setShowAnimation(false)
  }


  useEffect(() => {
    console.log(betAmount);
  }, [betAmount]);

  useEffect(() => {
    console.log(betSelection);
  }, [betSelection]);


  return (
    <div className='container'>
      {
        showAnimation ? (
          <div className={`animation ${showAnimation ? "visible" : ""}`} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)" }}>
              <p>Transaction Pending...</p>
                <div className="spinner-container">
                  <div className="spinner"></div>
                </div>
            </div>
          </div>
        ) : null
      }
      <div className='wallet-address-box'>
        <span>{"Connected: " +
          String(props.walletAddress).substring(0, 6) +
          "..." +
          String(props.walletAddress).substring(38)}
        </span>
      </div>
      <div className='form'>
        <Flex minH='100vh' align='center' justify='center'>
          <Box bg='gray.100' p={8} borderRadius='md' boxShadow='md'>
            <VStack spacing={6}>
              <Heading as='h1' size='xl'>
                Choose your bet
              </Heading>
              <Heading as ='h2' size='md'>
                Enter ETH Amount
              </Heading>
              <NumberInput precision={2}>
                <NumberInputField onChange={handleBetAmountChanged} />
              </NumberInput>
              <RadioGroup onChange={handleSelectionChange} value={betSelection}>
                <Stack direction='row'>
                  <Stack direction='row'>
                    <Radio value='1'>First</Radio>
                    <Radio value='2'>Second</Radio>
                    <Radio value='3'>Third</Radio>
                    <Radio value='4'>Fourth</Radio>
                  </Stack>
                </Stack>
              </RadioGroup>
              <Button colorScheme='blue' onClick={handleBet}>Bet</Button>
              <Button colorScheme='blue' onClick={handleClaimWinnings}>Claim Winnings</Button>
            </VStack>
          </Box>
        </Flex>
      </div>
    </div>
  )
}
