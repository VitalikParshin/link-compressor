export const LinkCard = ({ link }) => {

    return (
        <>
            <h2>Link</h2>
            <p>
                Your link: {" "}
                <a href={link.to} target="_blank" rel="noreferrer noopener" >
                    {link.to}
                </a>
            </p>
            <p>
                From: {" "}
                <a href={link.from} target="_blank" rel="noreferrer noopener" >
                    {link.from}
                </a>
            </p>
            <p>
                Link clicks amount: {" "}
                <strong>{link.clicks}</strong>
            </p>
            <p>
                Date created: {" "}
                <strong>{new Date(link.date).toLocaleDateString()}</strong>
            </p>
        </>
    )

}