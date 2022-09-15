import { memo, useState } from "react"
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd"
import { ActionIcon, Box, Popover, Group, Text, CloseButton, Space } from "@mantine/core"
import { Pencil } from "tabler-icons-react"
import { useStyles } from "../../hooks/UseStyles"
import CategoryFormUpdate from "../form/CategoryFormUpdate"

interface TitleProps {
	name: string
	dragHandleProps: DraggableProvidedDragHandleProps | undefined
}
export const ColumnTitle = memo((props: TitleProps) => {
	const [hover, setHover] = useState(false)
	const [opened, setOpened] = useState(false) // Para el popover

	const { classes } = useStyles()

	const handleOpen = () => setOpened(true)

	const handleClose = () => setOpened(false)

	return (
		<Popover trapFocus offset={-10} width={400} position="bottom" withArrow shadow="xl" opened={opened} onChange={setOpened}>
			<Popover.Target>
				<div className={classes.columnTitle_Container}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					<Box hidden={!hover || opened} className={classes.columnTitle_Settings}>
						<ActionIcon onClick={handleOpen} variant="light">
							<Pencil size={16} />
						</ActionIcon>
					</Box>
					<p {...props.dragHandleProps} className={classes.columnTitle}> {props.name} </p>
				</div >
			</Popover.Target>
			<Popover.Dropdown>

				<Group position="apart">
					<Text> Edit category </Text>
					<CloseButton onClick={() => setOpened(false)} />
				</Group>

				<Space h="md" />

				<CategoryFormUpdate name={props.name} handleClose={handleClose} />
			</Popover.Dropdown>
		</Popover>
	)
})

ColumnTitle.displayName = "ColumnTitle"
