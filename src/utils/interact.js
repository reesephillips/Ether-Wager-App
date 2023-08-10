import Bets from '../abis/Bets.json'
import { ethers } from "ethers";

const contractAddress = '0x8551c0507b1702ccef14646d314c6c8932e944dc';

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const placeBet = async (player, betNum, betAmount) => {

  try {
    
      const { ethereum } = window;
      
      if (window.ethereum) {

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner()
        const connectedContract = new ethers.Contract(contractAddress, Bets.abi, signer)

        const tx = await connectedContract.bet(player, betNum, {
            value: ethers.utils.parseEther(betAmount), // Betting fee of 5 ether
          });

        await tx.wait();
        console.log('Bet placed successfully!');
        return {
          thestatus: 'success',
          description: 'Bet placed Successfully'
        }

      } else {
        console.log('ethereum object doesnt exist')
        return {
          thestatus: 'error',
          description: 'ethereum object doesnt exist'
        }
      }

  } catch (error) {
    console.error('Error placing bet:', error);
    return {
      thestatus: 'error',
      description: 'Error Placing bet: ' + error
    }
  }

}

export const claimUserWinnings = async () => {

  try {
    
      const { ethereum } = window;
      
      if (window.ethereum) {

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner()
        const connectedContract = new ethers.Contract(contractAddress, Bets.abi, signer)

        const tx = await connectedContract.claimWinnings();

        await tx.wait();

        console.log('Winnings claimed!');
        return {
          thestatus: 'success',
          description: 'Winnings claimed successfully'
        }

      } else {
        console.log('ethereum object doesnt exist')
        return {
          thestatus: 'error',
          description: 'ethereum object doesnt exist'
        }
      }

  } catch (error) {
    console.error('Error claiming:', error);
    return {
      thestatus: 'error',
      description: 'Error claiming ' + error
    }
  }

}