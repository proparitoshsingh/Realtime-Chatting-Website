import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Contact = ({ obj, setChatId, setIsChat }) => {
    const handleClick = () => {
        console.log(`Chat id - ${obj._id}`);
        setChatId(obj._id);
        setIsChat(true);
    };

    return (
        <StyledContainer onClick={handleClick}>
            <img src={obj.profile_picture_link} alt="Profile" />
            <div className="info">
                <h2 className="name">{obj.isGroup ? obj.groupName : obj.otherParticipants[0]}</h2>
                <p className='last--message'>{obj.lastMessage?.content || 'No messages yet'}</p>
                <p className="timestamp">{new Date(obj.lastMessage?.time).toLocaleString()}</p>
            </div>
        </StyledContainer>
    );
};

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


