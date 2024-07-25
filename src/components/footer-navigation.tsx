const FooterNavigation = (links: string[]) => (
    <nav>
        <ul>
            {links.map(link=> <li>{link}</li>)}
        </ul>
    </nav>
)

export default FooterNavigation 