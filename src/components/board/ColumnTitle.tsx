import { memo, useState } from "react"
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd"
import { ActionIcon, Box, Button, Group, Popover, TextInput } from "@mantine/core"
import { Pencil } from "tabler-icons-react"
import { useBoard } from "../../hooks/useBoard/UseBoard"
import { useStyles } from "../../hooks/UseStyles"
import CategoryFormUpdate from "../form/CategoryFormUpdate"

interface TitleProps {
	name: string
	dragHandleProps: DraggableProvidedDragHandleProps | undefined
}
export const ColumnTitle = memo((props: TitleProps) => {
	const [hover, setHover] = useState(false)
	const [opened, setOpened] = useState(false) // Popover
	const [columnTitle, setColumnTitle] = useState<string>(props.name)
	const [columnTitleModified, setColumnTitleModified] = useState(columnTitle)

	const board = useBoard()
	const { classes } = useStyles()

	const handleOpen = () => setOpened(true)
	const handleSave = () => {
		setColumnTitle(columnTitleModified)
		setOpened(false)
		setHover(false)
		board.handleUpdateCategoryName(props.name, columnTitle)
	}

	const handleClose = () => setOpened(false)

	return (
		<Popover trapFocus offset={-10} width={400} position="bottom" withArrow shadow="xl" opened={opened} onChange={setOpened}>
			<Popover.Target>
				<div className={classes.columnTitle_Container}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					<Box hidden={!hover} className={classes.columnTitle_Settings}>
						<ActionIcon onClick={handleOpen} variant="light">
							<Pencil size={16} />
						</ActionIcon>
					</Box>
					<p {...props.dragHandleProps} className={classes.columnTitle}> {columnTitle} </p>
				</div >
			</Popover.Target>
			<Popover.Dropdown>
				{/* <Group align="center" spacing="xs">
					<TextInput data-autofocus value={columnTitleModified} onChange={(event) => setColumnTitleModified(event.currentTarget.value)} style={{ flex: 2, width: "100%" }} />
					<Button onClick={handleSave}>Save</Button>
				</Group> */}
				<CategoryFormUpdate name={props.name} handleClose={handleClose}/>
			</Popover.Dropdown>
		</Popover>
	)
})
