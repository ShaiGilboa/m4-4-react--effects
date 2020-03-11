import React from 'react';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import cookieSrc from '../cookie.svg';
import Item from './Item';
import useInterval from '../hooks/use-interval.hook';

const items = [
  { id: 'cursor', name: 'Cursor', cost: 10, value: 1 },
  { id: 'grandma', name: 'Grandma', cost: 100, value: 10 },
  { id: 'farm', name: 'Farm', cost: 1000, value: 80 },
];

const purchase=(item, cookies,purchased)=>{
  cookies.setNumCookies(cookies.numCookies-item.cost);
  const newPurchased = purchased.purchasedItems;
  newPurchased[item.id]++;
  purchased.setPurchasedItems(newPurchased);
}

const handleClick = (item, cookies, purchased) => {
  cookies.numCookies>=item.cost?purchase(item, cookies, purchased):console.log('not enough!')
}

const calculateCookiesPerTick=(purchasedItems)=>{
  return purchasedItems.cursor + purchasedItems.grandma*10 + purchasedItems.farm*80;
}



const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(100)
  const [purchasedItems, setPurchasedItems] = useState({cursor: 0,grandma: 0,farm: 0})

  const handleKeyDown = (event) => {
    if(event.code==='Space')setNumCookies(numCookies+1);
  }


  
  useEffect(() => {
    document.title=`${numCookies} cookies - Cookie Clicker`
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.title = `Cookie Clicker Workshop`;
    }
    }, [numCookies])

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies+numOfGeneratedCookies)
  }, 1000);
  const cookies={numCookies, setNumCookies}
  const purchased={purchasedItems,setPurchasedItems}
  return (
    <Wrapper>
    <Link to="/">Home</Link>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second
        </Indicator>
        <Button>
          <Cookie src={cookieSrc} onClick={()=>setNumCookies(numCookies+1)}/>
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        <ul>
          {items.map((item,index) => {
            // console.log(purchasedItems[item.id])
            return (
              <Item 
                index={index}
                key={`item-${item.id}`}
                item={item} 
                itemAmount={purchasedItems[item.id]}
                handleClick={handleClick}
                cookies={cookies}
                purchased={purchased}
                />
            )
            })
          }
        </ul>
      </ItemArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

export default Game;
