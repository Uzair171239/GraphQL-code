import athenaExpress from "./athenaExpress";

async function exchange_info() {
    try {
        const results = await athenaExpress.query({
          sql: "SELECT * FROM volstox_db.exchange_info",
        });
        return(results.Items);
      } catch (err) {
        console.log(err);
      }
}
export default exchange_info;