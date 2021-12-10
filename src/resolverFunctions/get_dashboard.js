import athenaExpress from "./athenaExpress";


const getDates = async () => {
  var current_files_date = [];
  try {
    const results = await athenaExpress.query({
      sql: "SELECT distinct extraction_date from stock_price",
    });

    if (results.Items.length === 1) {
      current_files_date = `'${results.Items[0].extraction_date}'`;
    } else {
      current_files_date = `'${results.Items[0].extraction_date}'`;
      for (var i = 1; i < results.Items.length; i++) {
        current_files_date += ` OR stock_price.extraction_date='${results.Items[i].extraction_date}'`;
      }
    }
    return current_files_date
  } catch (err) {
    console.log(err);
  }
};

async function get_dashboard(parent, args, ctx, info) {
  const current_files_date = await getDates();
  const string = args.exchanges;
  const sub = string.split(",");
  var q = "";
  if (sub.length === 1) {
      q = `(company_info.exchange_symbol = '${sub[0]}')`;
    }
    if (sub.length > 1) {
        q = `(company_info.exchange_symbol = '${sub[0]}')`;
        for (var i = 1; i < sub.length; i++) {
            q += ` OR (company_info.exchange_symbol = '${sub[i]}')`;
        }
    }
    // console.log(q)
    let query = {
      sql: `SELECT company_info.company_name,
      company_info.ticker_symbol,
      company_info.information_string,
      company_info.industry,
      company_info.extraction_date AS company_extraction_date,
      stock_price.stock_price,
      round(stock_price.market_cap / 1000000,
      2) AS market_cap,
      stock_price.extraction_date AS daily_extraction_date,
      monthly.e1,
      monthly.e2,
      monthly.e3,
      monthly.e4,
      monthly.e5,
      monthly.p1,
      monthly.p2,
      monthly.p3,
      monthly.p4,
      monthly.p5,
      monthly.extraction_date AS monthly_extraction_date,
      stock_price.exchange_symbol,
      exchange_info.currency AS currency
  FROM stock_price
  INNER JOIN exchange_info
  ON stock_price.exchange_symbol=exchange_info.exchange_symbol
  INNER JOIN company_info
  ON stock_price.ticker_symbol=company_info.ticker_symbol
  INNER JOIN monthly
  ON company_info.ticker_symbol=monthly.ticker_symbol
     AND stock_price.exchange_symbol = monthly.exchange_symbol
  WHERE (stock_price.extraction_date=${current_files_date})
     AND ${q}`,
      };
    //   console.log(query.sql)
      try {
        const results = await athenaExpress.query(query);
        return (results.Items);
      } catch (error) {
        console.log(error);
      }
}

export default get_dashboard;