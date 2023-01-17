import { Text } from "@mantine/core";
import {Card, Group, Space } from "@mantine/core";

import Favicon from "../../board/columnItem/Favicon";
import Changelog from "./Changelog";



export default function AppSettingsAbout() {
	return (
		<>
			<Card withBorder>
				<Group>
					<Favicon url="www.github.com"/>
					<Text color="blue" component="a" href="https://github.com/serogbp/startpage-react">
						See the code on Github
					</Text>
				</Group>
			</Card>

			<Space h="xl" />

			<Changelog />
		</>
	)
}
