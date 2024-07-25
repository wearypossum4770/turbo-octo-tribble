const MainNavigation = (routes: string[]) => (
    <nav>
        <ul>
        {routes.map(route=><li>{route}</li>)}
        </ul>
    </nav>
)

export default MainNavigation 