import athenaExpress from "./athenaExpress";

function input_params() {
    return athenaExpress
       .query({
           sql: "SELECT * FROM volstox_db.input_params;",
       })
       .then((results) => {
           return results.Items;
       })
       .catch((err) => {
           console.log(err);
       });
}

export default input_params;