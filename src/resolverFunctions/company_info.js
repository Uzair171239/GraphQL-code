import athenaExpress from "./athenaExpress"


export default async function company_info() {
    try {
        const results = await athenaExpress.query({
          sql: "SELECT * FROM volstox_db.company_info;",
        });
        console.log(results.Items)
        return(results.Items);
      } catch (err) {
        console.log(err);
      }
}
