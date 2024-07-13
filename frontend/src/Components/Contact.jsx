import React from 'react'
import styled from "styled-components"
import ProfilePic from "../assets/profile.png"

const Contact = () => {
  return (
    <StyledContainer>
        <img src={ProfilePic} alt="" />
        <div className="info">
            <h2 className="name">Paritosh Singh</h2>
            <p className='last--message'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque esse nostrum veritatis?</p>
            <p className="timestamp">12:00</p>
        </div>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
    margin-top: 15pxpx;
    display: flex;
    padding: 10px;
    border-radius: 8px;
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 8px;
        
    }
    div.info{
        display: grid;
        grid-template-columns: 75% 25%;
        grid-template-rows: repeat(2, 1fr);
        column-gap: 5px;
        h2.name{
            grid-area: 1/1/2/2;
            font-size: 16px;
            font-weight: 400;
        }
        p.timestamp{
            grid-area: 1/2/2/3;
            font-size: 12px;
            font-weight: 200;
            align-self: flex-start;
            text-align: right;
        }
        p.last--message{
            grid-area: 2/1/3/3;
            font-size: 12px;
            font-weight: 200;
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
            width: 80%;
        }
    }
    &:hover{
        background-color: #7d92e8;
        cursor: default;
    }
    &.active{
        background-color: #7d92e8;
    }
`

export default Contact