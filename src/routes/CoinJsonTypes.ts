// CoinData
export interface InterfaceCoinData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    tags: Tag[];
    team: Team[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: Date;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: Links;
    links_extended: LinksExtended[];
    whitepaper: Whitepaper;
    first_data_at: Date;
    last_data_at: Date;
}

interface Links {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
    youtube: string[];
}

interface LinksExtended {
    url: string;
    type: string;
    stats?: Stats;
}

interface Stats {
    subscribers?: number;
    contributors?: number;
    stars?: number;
    followers?: number;
}

interface Tag {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
}

interface Team {
    id: string;
    name: string;
    position: string;
}

interface Whitepaper {
    link: string;
    thumbnail: string;
}

// PriceData
export interface InterfacePriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: Date;
    last_updated: Date;
    quotes: Quotes;
}

interface Quotes {
    USD: Quote;
    // KRW: Quote;
}

interface Quote {
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_15m: number;
    percent_change_30m: number;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_1y: number;
    ath_price: number;
    ath_date: Date;
    percent_from_price_ath: number;
}
