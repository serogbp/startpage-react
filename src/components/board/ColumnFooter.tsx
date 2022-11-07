import { Button, CloseButton, Group, Popover, Space, Text, createStyles } from "@mantine/core"
import { memo, useState } from "react";
import { WebFormMode } from "../../Types";
import WebForm from "../form/WebForm";
import { Plus, X } from "tabler-icons-react";

interface Props {
	category: string,
}


const useStyles = createStyles((theme) => ({
	columnFooter_Button: {
		paddingTop: theme.spacing.lg,
		paddingBottom: theme.spacing.lg,
		height: "auto",
		border: 0,
	},
}))


const ColumnFooter = memo((props: Props) => {
	const [opened, setOpened] = useState(false)
	const { classes } = useStyles()

	const close = () => {
		setOpened(false)
	}

	return (
		<Popover width={300} trapFocus position="top" withArrow shadow="xl" opened={opened} onChange={setOpened}>
			<Popover.Target>

				<Button variant="subtle" color={opened ? "red" : ""} onClick={() => setOpened(!opened)} className={classes.columnFooter_Button}>
					{
						opened ? <X /> : <Plus strokeWidth={1.5} />
					}
				</Button>

			</Popover.Target>
			<Popover.Dropdown>

				<Group position="apart">
					<Text>
						New Web
					</Text>
					<CloseButton onClick={() => setOpened(false)} />
				</Group>

				<Space h="md" />


				<WebForm handleClose={close} mode={WebFormMode.add} category={props.category} isModal={false} />

			</Popover.Dropdown>
		</Popover>
	)
})

ColumnFooter.displayName = "ColumnFooter"
export default ColumnFooter
