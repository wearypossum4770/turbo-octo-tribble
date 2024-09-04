import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "The Luky Web Dev" }];

const RootIndexPage = () => (
	<main>
		<h1>Under Construction</h1>
		<h2>Come back soon</h2>
	</main>
);

export default RootIndexPage;
