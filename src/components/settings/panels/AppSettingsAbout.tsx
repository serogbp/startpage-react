import { Text } from "@mantine/core";
import { Space, Title } from "@mantine/core";

import { VERSION } from "../../../utils/utils";



export default function AppSettingsAbout() {
	// TODO cambiar la url
	return (
		<>
			<Title>
				StartPage React {VERSION}
			</Title>
			<Space h="xl" />
			<Text color="blue" underline component="a" href="https://mantine.dev/core/">
				More info on Github
			</Text>
		</>
	)
}
