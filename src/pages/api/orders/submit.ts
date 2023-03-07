import { encodeURL, TransactionRequestURLFields } from "@solana/pay";
import { NextApiResponse } from "next/types";
import { NextApiRequest } from "next/types";
import { PAYMENT_URI, SERVER_NAME } from "src/utils/constants";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const inputs = req.query;
        if (inputs) {
            const submission_id = inputs["submission_id"];
            const user_email = inputs["email"];
            const user_name = inputs["name"];
            const payment_value = inputs["value"];
            console.log("Got a submission: ", submission_id, user_email, user_name, payment_value);

            var uri = `submission_id=${submission_id}&name=${user_name}&email=${user_email}&value=${payment_value}`;
            var paylink = `solana:https://${SERVER_NAME}/api/${PAYMENT_URI}?${uri}`;

            const mintUrlFields: TransactionRequestURLFields = {
                'link': new URL(paylink),
            }
            const mintUrl = encodeURL(mintUrlFields)

            console.log("====== mintUrl is: ", mintUrl)

            const resp = {
                "status": "OK",
                "payment_link": paylink
            }
            return res.status(200).json(resp);
        }
        const resp = {
            "status": "BAD_REQUEST",
            "payment_link": "",
            "message": "No Input Specified"
        }
        return res.status(200).json(resp);
    } catch (err) {
        console.error("Exception in Submit webhook", err);
        return res.status(200).json({ "status": "INTERNAL_SERVER_ERROR", "payment_link": "" });
    }

}
export default handler;