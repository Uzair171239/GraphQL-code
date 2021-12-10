import input_params from "./resolverFunctions/input_params";
import get_dashboard from "./resolverFunctions/get_dashboard";
import row_data from "./resolverFunctions/row_data";
import exchange_names from "./resolverFunctions/exchangesNames";
import exchange_info from "./resolverFunctions/exchange_info";
import company_info from "./resolverFunctions/company_info";

const resolvers = {
    // greeting(parent, args, ctx, info) {
    Query: {
        get_dashboard,
        input_params,
        row_data,
        exchange_names,
        exchange_info,
        company_info,
    }
}

export default resolvers;