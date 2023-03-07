const handler = (req: any, res: any) => {
    const srv_health = {
        "status": "OK",
    }
    res.status(200).json(srv_health);
}
export default handler;