import athenaExpress from "./athenaExpress";

function row_data(parent, args, ctx, info) {
    return athenaExpress
    .query({
      sql: `SELECT stock_price_array, date_array,d1,d2,d3,d4,d5 FROM monthly WHERE ticker_symbol='${args.ticker_symbol}'`,
    })
    .then((results) => {
      const priceArray = results.Items[0].stock_price_array;
      const dateArray = results.Items[0].date_array;
      const stock_price_array = priceArray
        .replace("[", "")
        .replace("]", "")
        .split(" ")
        .join("")
        .split("|")
        .map(Number);

      let date_array_converted = dateArray
        .replace("[", "")
        .replace("]", "")
        .split(" ")
        .join("")
        .replace(/'/g, "")
        .split("|");

      // console.log(date_array_converted)

      // fullObj.push()
      const obj = {
        "01": "Jan",
        "02": "Feb",
        "03": "March",
        "04": "Apr",
        "05": "May",
        "06": "June",
        "07": "Jul",
        "08": "Aug",
        "09": "Aep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
      };
      const d1 = results.Items[0].d1.split("/");
      const d2 = results.Items[0].d2.split("/");
      const d3 = results.Items[0].d3.split("/");
      const d4 = results.Items[0].d4.split("/");
      const d5 = results.Items[0].d5.split("/");

      return ({
        value: stock_price_array,
        date: date_array_converted,
        d1: obj[d1[1]] + `-${d1[2]}`,
        d2: obj[d2[1]] + `-${d2[2]}`,
        d3: obj[d3[1]] + `-${d3[2]}`,
        d4: obj[d4[1]] + `-${d4[2]}`,
        d5: obj[d5[1]] + `-${d5[2]}`,
      });
      // console.log(fullObj);
      // current_files_date = ;
      // console.log(current_files_date);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default row_data;