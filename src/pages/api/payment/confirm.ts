import { NextApiResponse } from "next/types";
import { NextApiRequest } from "next/types";
import { PAYMENT_URI, SERVER_NAME } from "src/utils/constants";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const m = req.method;
    switch (m) {
        case 'GET':
            try {
                const label = 'Exiled Apes Academy';
                const icon = 'https://exiledapes.academy/wp-content/uploads/2021/09/X_share.png';
                return res.status(200).send({
                    label,
                    icon,
                });
            } catch (err) {
                return res.status(400).send({
                    "status": "BAD_REQUEST"
                });
            }
        case 'POST':
            try {
                const label = 'Exiled Apes Academy in the POST API';
                const icon = 'https://exiledapes.academy/wp-content/uploads/2021/09/X_share.png';
                return res.status(200).send({
                    label,
                    icon,
                });
            } catch (err) {
                return res.status(400).send({
                    "status": "BAD_REQUEST"
                });
            }
    }


}
export default handler;