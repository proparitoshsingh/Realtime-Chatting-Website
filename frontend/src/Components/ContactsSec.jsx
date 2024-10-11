import styled from 'styled-components';
import Contact from './Contact';

const ContactsSec = ({ chats = [], setChatId, setIsChat }) => {
  return (
    <StyledComponent>
      {chats.length > 0 ? (
        chats.map((obj, index) => (
          <Contact key={index} obj={obj} setChatId={setChatId} setIsChat={setIsChat} />
        ))
      ) : (
        <p>No chats to show.</p>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled.div`
  overflow-y: auto;
  max-height: 100%;
  flex-grow: 1;
`
export default ContactsSec;
