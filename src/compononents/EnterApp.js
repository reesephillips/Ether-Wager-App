import React from 'react'
import { Button } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import {  VStack } from '@chakra-ui/react'

import { NavLink } from 'react-router-dom'

export default function EnterApp() {

  return (
    <Center h="100vh">
      <VStack spacing='40px'>
        <Heading as='h1' size='lg'>Ether Wage Hub</Heading>
        <Button colorScheme='blue'><NavLink to="betpage">Enter App</NavLink></Button>
      </VStack>
    </Center>
  )
}
