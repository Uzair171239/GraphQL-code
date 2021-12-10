import athenaExpress from "./athenaExpress";

async function exchange_names(){
    try {
        const results = await athenaExpress.query({
          sql: "SELECT distinct exchange_symbol from volstox_db.exchange_info",
        });
        return(results.Items);
      } catch (err) {
        console.log(err);
      }
}

export default exchange_names;