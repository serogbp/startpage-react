import { memo } from "react"
import { Draggable } from "react-beautiful-dnd"
import { ColumnTitle } from "./ColumnTitle"
import { useStyles } from "../../hooks/UseStyles"
import { useSettings } from "../../hooks/UseSettings"


interface Props {
	name: string,
	index: number,
	children?: JSX.Element | JSX.Element[]
}


const Column = memo((props: Props) => {
	const { classes } = useStyles()
	const settings = useSettings()

	return (
		<Draggable draggableId={props.name} index={props.index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}
					style={{width:settings.columnWidth}}
					>

					<div className={classes.column}>
						<ColumnTitle name={props.name} dragHandleProps={provided.dragHandleProps} />
						{props.children}
					</div>
				</div>

			)}
		</Draggable>
	)
})


Column.displayName = "Column"
export default Column
