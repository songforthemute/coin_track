import styled from "styled-components";

const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 50px;
    font-weight: 500;
`;

const Coins = () => {
    return <Title>Lorem Ipsum!</Title>;
};

export default Coins;
