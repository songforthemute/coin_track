import styled from "styled-components";
import { InterfacePriceData } from "./CoinJsonTypes";
// import { Tabs, Tab } from "./Coin";
// import { useState } from "react";

interface PriceProps {
    priceData: InterfacePriceData;
}

const Rows = styled.ul`
    padding: 15px 10px;
    background-color: ${(props) => props.theme.cardBgColor};
    -webkit-box-shadow: ${(props) => props.theme.boxShadow};
    box-shadow: ${(props) => props.theme.boxShadow};
    border-radius: 20px;
    h5 {
        padding: 5px 10px;
        opacity: 0.7;
        font-weight: 300;
        font-size: 12px;
    }
`;

const Row = styled.li`
    padding: 5px 10px;
    font-weight: 300;
    span {
        font-weight: 500;
    }
`;

const Price = ({ priceData }: PriceProps) => {
    const { USD } = priceData.quotes;

    return (
        <>
            <Rows>
                <h5>
                    Last Updated{" "}
                    {new Date(priceData.last_updated).toLocaleString("ko-kr")}
                </h5>
                <Row>
                    <span>Today Price</span> ${USD.price.toFixed(3)}
                </Row>
                <Row>
                    <span>Highest Price</span> ${USD.ath_price.toFixed(3)} (
                    {USD.ath_date.toString().slice(0, 10)})
                </Row>
                <Row>
                    <span>Percent from Highest</span>
                    {" " + USD.percent_from_price_ath}%
                </Row>
                <Row>
                    <span>Percent Change in an hour</span>
                    {" " + USD.percent_change_1h}%
                </Row>
                <Row>
                    <span>Percent Change in 12 hours</span>
                    {" " + USD.percent_change_12h}%
                </Row>
                <Row>
                    <span>Percent Change in a day</span>
                    {" " + USD.percent_change_24h}%
                </Row>
                <Row>
                    <span>Percent Change in a month</span>
                    {" " + USD.percent_change_30d}%
                </Row>
                <Row>
                    <span>Market Cap Change in a Day</span>
                    {" " + USD.market_cap_change_24h}%
                </Row>
                <Row>
                    <span>Volume in a Day</span>
                    {" " + USD.volume_24h}
                </Row>
            </Rows>
        </>
    );
};

export default Price;
