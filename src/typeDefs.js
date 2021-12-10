const typeDefs = `
    type Query {
        get_dashboard(exchanges: String!): [Data!]
        input_params: [Param!]!
        row_data(ticker_symbol: String!): Row!
        exchange_names: [ExNames!]!
        exchange_info: [ExInfo!]!
        company_info: [ComInfo!]!
    }

    type ExInfo {
        exchange_symbol: String!
        full_exchange_name: String!
        city: String!
        country: String!
        currency: String!
        extraction_date: String!
    }

    type ComInfo {
        ticker_symbol: String!
        exchange_symbol: String!
        company_name: String!
        information_string: String!
        industry: String!
        extraction_date: String!
    }

    type ExNames {
        exchange_symbol: String!
    }

    type Param {
        exchange_symbol: String!
        growth_damper: Float!
        pe_damper: Float!
        pe_threshold: Float!
        max_annual_growth: Float!
        discount_rate: Float!
        present_value: Int!
    }

    type Data {
        ticker_symbol: String!
        information_string: String!
        industry: String!
        company_extraction_date: String!
        stock_price: Float!
        market_cap: Float!
        daily_extraction_date: String!
        e1: Float
        e2: Float
        e3: Float
        e4: Float
        e5: Float
        p1: Float
        p2: Float
        p3: Float
        p4: Float
        p5: Float
        monthly_extraction_date: String!
        exchange_symbol: String!
        currency: String!
    }

    type Row {
        value: [String!]!
        date: [String!]!
        d1: String!
        d2: String!
        d3: String!
        d4: String!
        d5: String!
    }
`

export default typeDefs;