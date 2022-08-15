import { Button, CloseButton, createStyles, Dialog, Group, Modal, Popover, Space, Text, Tooltip, UnstyledButton, useMantineTheme } from "@mantine/core"
import { useState } from "react";
import { WebFormMode } from "../../Types";
import WebForm from "../form/WebForm";

const useStyles = createStyles((theme) => ({
	button: {
		marginTop: theme.spacing.sm,
		paddingTop: theme.spacing.lg,
		paddingBottom: theme.spacing.lg,
		height: "auto",
		border: 0
	},
}))

interface Props {
	category: string,
}

const AddWebButton = (props: Props) => {
	const [opened, setOpened] = useState(false)
	const { classes } = useStyles()

	const closeModal = () => {
		setOpened(false)
	}

	return (
		<Popover width={300} trapFocus position="top" withArrow shadow="xl" opened={opened} onChange={setOpened}>
			<Popover.Target>

				<Button variant="subtle" color={opened! ? "red" : "gray"} onClick={() => setOpened(!opened)} className={classes.button}>
					<Text color="dimmed">{opened ? "Cancel" : "Add a web"}</Text>
				</Button>

			</Popover.Target>
			<Popover.Dropdown>

				<Group position="apart">
					<Text>
						New Web
					</Text>
					<CloseButton onClick={() => setOpened(false)} />
				</Group>

				<Space h="md"/>

				<WebForm closeModal={closeModal} mode={WebFormMode.add} category={props.category} />

			</Popover.Dropdown>
		</Popover>
	)
}

export default AddWebButton
