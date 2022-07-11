import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinEvents } from "../api";

interface EventProps {
    coinId: string;
}

interface InterfaceEvents {
    id: string;
    date: Date;
    date_to: Date | null;
    name: string;
    description: string;
    is_conference: boolean;
    link: string;
    proof_image_link: null | string;
}

type EventsArray = InterfaceEvents[];

const Article = styled.div`
    margin-bottom: 20px;
    padding: 20px 15px;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 20px;
    img {
        margin-top: 10px;
        width: 150px;
        border-radius: 10px;
        transition: width 0.35s ease-in-out;
        &:hover {
            width: 100%;
        }
    }
`;

const Title = styled.h3`
    font-weight: 500;
    font-size: 18px;
    transition: color 0.35s ease-in-out;
    &:hover {
        color: ${(props) => props.theme.accentColor};
    }
`;

const Day = styled.h5`
    font-weight: 300;
    font-size: 12px;
    margin-bottom: 10px;
    opacity: 0.5;
`;

const Paragraph = styled.p`
    font-size: 14px;
    font-weight: 300;
    opacity: 0.5;
`;

const Events = ({ coinId }: EventProps) => {
    const { isLoading, data } = useQuery<EventsArray>(["events", coinId], () =>
        fetchCoinEvents(coinId)
    );

    return (
        <>
            {isLoading ? (
                "Now Loading.."
            ) : !data?.length ? (
                <Title>
                    <div>No events.</div>
                </Title>
            ) : (
                data.map((e) => (
                    <Article key={e.id}>
                        <Title>
                            <a href={e.link}>{e.name}</a>
                        </Title>
                        <Day>{new Date(e.date).toLocaleString("ko-kr")}</Day>
                        <Paragraph>
                            {e.description.length < 250
                                ? e.description
                                : e.description.slice(0, 250) + " ..."}
                        </Paragraph>
                        {e.proof_image_link && (
                            <img src={e.proof_image_link} alt="conf_img" />
                        )}
                    </Article>
                ))
            )}
        </>
    );
};

export default Events;