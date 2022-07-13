import styled from "styled-components";

const LoadingContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 110%;
    width: 100%;
    flex-direction: column;
    z-index: 1;
`;

const LoadingCounter = styled.div`
    color: ${(props) => props.theme.accentColor};
    font-size: 32px;
    font-weight: 500;
    top: 35%;
    position: fixed;
`;

const LoadingCircle = styled.div`
    @keyframes spinner {
        from {
            transform: translate(-50%, -50%) rotate(0);
        }
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }

    position: fixed;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border: 15px solid rgba(0, 0, 0, 0.1);
    border-top: 15px solid ${(props) => props.theme.accentColor};
    border-radius: 50em;
    animation-name: spinner;
    animation-duration: 0.75s;
    animation-iteration-count: infinite;
`;

const Loading = () => {
    return (
        <LoadingContainer>
            <LoadingCounter>Loading...</LoadingCounter>
            <LoadingCircle />
        </LoadingContainer>
    );
};

export default Loading;
