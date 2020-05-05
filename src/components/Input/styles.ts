import styled from 'styled-components';

export const Container = styled.div`
  background: #232119;
  border-radius: 10px;
  border: 2px solid #232119;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #666360;

  & + div {
    margin-top: 8px;
  }
  input {
    background: transparent;
    border: 0;
    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
