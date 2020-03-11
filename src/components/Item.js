import React from 'react';
import styled from 'styled-components';

const StyledDetails = styled.li`
  position: relative;
  display:flex;
  flex-direction: row;
  margin-right: 70px;
  button {
    background: none;
    border: none;
    margin:0;
    padding:0;
    text-align:start;
    color: white;
  }
`;

const StyledAmount = styled.span`
  color:red;
  font-size:3rem;
  margin: 0 10px;
  right: -50px;
  position: absolute;
  top:-5px;
`;

const Item = ({item, itemAmount, handleClick, cookies, purchased, index}) => {
  const itemRef = React.useRef(null)

  React.useEffect(() => {
    if(index===0)itemRef.current.focus();
  },[])

    return (
      <StyledDetails >
        <button ref={index === 0 ? itemRef : null} onClick={()=>{
        handleClick(item, cookies, purchased)
        }}>
        <div>
          <h2>{item.name}</h2>
          <p>cost: {item.cost} , cookie(s). Produces {item.value} cookies/second.</p>
        </div>
        <StyledAmount>
          {itemAmount}
        </StyledAmount>
        </button>
      </StyledDetails>
    )
}

export default Item;