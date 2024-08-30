import styled from 'styled-components';
import Contact from './Contact';

const ContactsSec = ({ inbox=[] }) => {
  return (
    <StyledComponent>
    {inbox.length > 0 ? (
        inbox.map((obj, index) => (
          <Contact key={index} obj={obj} />
        ))
      ) : (
        <p>No chts in the inbox to show.</p>
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
