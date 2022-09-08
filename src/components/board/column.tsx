import { memo } from "react"
import { Draggable } from "react-beautiful-dnd"
import { useMantineTheme } from "@mantine/core"
import { ColumnTitle } from "./ColumnTitle"
import { useStyles } from "../../hooks/UseStyles"


interface Props {
	name: string,
	index: number,
	children?: JSX.Element | JSX.Element[]
}


const Column = memo((props: Props) => {
	const theme = useMantineTheme()
	const { classes } = useStyles()

	const handleClick = () => {
		// TODO popover
	}

	return (
		<Draggable draggableId={props.name} index={props.index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}>

					<div className={classes.column}>
						<ColumnTitle name={props.name} dragHandleProps={provided.dragHandleProps} />
						{props.children}
					</div>
				</div>

			)}
		</Draggable>
	)
})


export default Column
