import { Button, CloseButton, createStyles, Dialog, Group, Modal, Popover, Text, Tooltip, UnstyledButton, useMantineTheme } from "@mantine/core"
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
	category: string
}

const AddWebButton = (props: Props) => {
	const [opened, setOpened] = useState(false)
	const { classes } = useStyles()
	const theme = useMantineTheme()

	// const openModal = (mode: WebFormMode, category: string) => {
	// 	// #1 forma
	// 	openContextModal({
	// 		title: mode == WebFormMode.add ? "New web" : "Edit web",
	// 		modal: "webForm",
	// 		centered:true,
	// 		trapFocus: false,
	// 		innerProps: {
	// 			props: {
	// 				mode: mode,
	// 				category: category
	// 			}
	// 		}
	// 	})
	// }

	return (
		<>
			{/* # parte 2 #1 forma */}
			{/* <UnstyledButton onClick={() => openModal(WebFormMode.add, props.category)} className={classes.button}>
				<Text color={theme.colors.gray[7]}>
					Add a web
				</Text>
			</UnstyledButton>

			{/* #2 forma  */}
			{/* <Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="New Web"
				centered
			>
				<WebForm mode={WebFormMode.add} category={props.category} setOpened={setOpened} />
			</Modal> */}

			{/* #3 forma */}
			<Popover width={300} trapFocus position="top" withArrow shadow="xl" opened={opened} onChange={setOpened}>
				<Popover.Target>

					<Button variant="subtle" color={opened! ? "red": "gray"} onClick={() => setOpened(!opened)} className={classes.button}>
							{opened ? "Cancel" : "Add a web"}
					</Button>

				</Popover.Target>
				<Popover.Dropdown>

					<Group position="apart">
						<Text>
							New Web
						</Text>
						<CloseButton onClick={() => setOpened(false)} />
					</Group>

					<WebForm mode={WebFormMode.add} category={props.category} setOpened={setOpened} />

				</Popover.Dropdown>
			</Popover>

		</>
	)
}

export default AddWebButton
