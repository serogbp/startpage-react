import { memo } from "react"
import { Draggable } from "react-beautiful-dnd"
import { ColumnTitle } from "./ColumnTitle"
import { useSettings } from "../../hooks/UseSettings"
import { useMantineTheme, createStyles } from "@mantine/core"
import { backgroundColorColumn, columnLightBackground, StyleConstants } from "../../Constants"


interface Props {
	name: string,
	index: number,
	children?: JSX.Element | JSX.Element[]
}

interface PropsStyle {
	backgroundColor: string
}

const useStyles = createStyles((theme, { backgroundColor }: PropsStyle, getRef) => ({
	column: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		backgroundColor: backgroundColor,
		height: "100%",
		borderRadius: theme.radius.sm,
	},
}))


const Column = memo((props: Props) => {
	const settings = useSettings()
	const backgroundColor = backgroundColorColumn()
	const { classes } = useStyles({ backgroundColor })

	return (
		<Draggable draggableId={props.name} index={props.index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}
				>

					<div
						className={classes.column}
						style={{ width: settings.columnWidth }}
					>
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
