import { getAssociatedTokenAddress } from "@solana/spl-token";
import { PublicKey, Transaction } from "@solana/web3.js";
import { NextApiResponse } from "next/types";
import { NextApiRequest } from "next/types";
import { PAYMENT_URI, SERVER_NAME } from "src/utils/constants";

// const splToken = new PublicKey(process.env.USDC_MINT);
// const MERCHANT_WALLET = new PublicKey(process.env.MERCHANT_WALLET);

const get = async (request: NextApiRequest, response: NextApiResponse) => {
    const label = 'Exiled Apes Academy';
    const icon = 'https://exiledapes.academy/wp-content/uploads/2021/09/X_share.png';

    response.status(200).send({
        label,
        icon,
    });
};

// async function createSplTransferIx(sender: any, connection: any) {
//     const senderInfo = await connection.getAccountInfo(sender);
//     if (!senderInfo) throw new Error('sender not found');

//     // Get the sender's ATA and check that the account exists and can send tokens
//     const senderATA = await getAssociatedTokenAddress(splToken, sender);
//     const senderAccount = await getAccount(connection, senderATA);
//     if (!senderAccount.isInitialized) throw new Error('sender not initialized');
//     if (senderAccount.isFrozen) throw new Error('sender frozen');

//     // Get the merchant's ATA and check that the account exists and can receive tokens
//     const merchantATA = await getAssociatedTokenAddress(splToken, MERCHANT_WALLET);
//     const merchantAccount = await getAccount(connection, merchantATA);
//     if (!merchantAccount.isInitialized) throw new Error('merchant not initialized');
//     if (merchantAccount.isFrozen) throw new Error('merchant frozen');

//     // Check that the token provided is an initialized mint
//     const mint = await getMint(connection, splToken);
//     if (!mint.isInitialized) throw new Error('mint not initialized');

//     // You should always calculate the order total on the server to prevent
//     // people from directly manipulating the amount on the client
//     let amount = calculateCheckoutAmount();
//     amount = amount.times(TEN.pow(mint.decimals)).integerValue(BigNumber.ROUND_FLOOR);

//     // Check that the sender has enough tokens
//     const tokens = BigInt(String(amount));
//     if (tokens > senderAccount.amount) throw new Error('insufficient funds');

//     // Create an instruction to transfer SPL tokens, asserting the mint and decimals match
//     const splTransferIx = createTransferCheckedInstruction(
//         senderATA,
//         splToken,
//         merchantATA,
//         sender,
//         tokens,
//         mint.decimals
//     );

//     // Create a reference that is unique to each checkout session
//     const references = [new Keypair().publicKey];

//     // add references to the instruction
//     for (const pubkey of references) {
//         splTransferIx.keys.push({ pubkey, isWritable: false, isSigner: false });
//     }

//     return splTransferIx;
// }

const post = async (request: NextApiRequest, response: NextApiResponse) => {
    // Account provided in the transaction request body by the wallet.
    const accountField = request.body?.account;
    if (!accountField) throw new Error('missing account');

    const sender = new PublicKey(accountField);

    // create spl transfer instruction
    // const splTransferIx = await createSplTransferIx(sender, connection);

    // create the transaction
    const transaction = new Transaction();

    // add the instruction to the transaction
    // transaction.add(splTransferIx);

    // Serialize and return the unsigned transaction.
    const serializedTransaction = transaction.serialize({
        verifySignatures: false,
        requireAllSignatures: false,
    });

    const base64Transaction = serializedTransaction.toString('base64');
    const message = 'Thank you for your purchase of ExiledApe #518';

    response.status(200).send({ transaction: base64Transaction, message });
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const m = req.method;
    switch (m) {
        case 'GET':
            return get(req, res);
        case 'POST':
            try {

            } catch (err) {
                return res.status(400).send({
                    "status": "BAD_REQUEST"
                });
            }
    }


}
export default handler;