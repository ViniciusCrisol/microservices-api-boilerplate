import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  h1 {
    margin-bottom: 20px;
    font-size: 40px;
    color: ${({ theme }) => theme.colors.primary};
  }

  button {
    height: 50px;
    width: 200px;

    border: none;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`
