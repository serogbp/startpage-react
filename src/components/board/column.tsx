import { useState, memo, useCallback, useEffect } from "react"
import { Web } from "../../Types"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { Virtuoso } from "react-virtuoso"
import { createStyles, useMantineTheme } from "@mantine/core"
import ColumnItem from "./ColumnItem"
import signalJs from "signal-js"


interface Props {
	name: string,
	index: number,
	children?: JSX.Element | JSX.Element[]
}

// Virtuoso's resize observer can this error,
// which is caught by DnD and aborts dragging.
window.addEventListener("error", (e) => {
	if (
		e.message ===
		"ResizeObserver loop completed with undelivered notifications." ||
		e.message === "ResizeObserver loop limit exceeded"
	) {
		e.stopImmediatePropagation();
	}
});

const useStyles = createStyles((theme) => ({
	column: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
		padding: "8px",
		height: "100%",
		borderRadius: theme.radius.sm
	}
}))

const Column = memo((props: Props) => {
	const theme = useMantineTheme()
	const { classes } = useStyles()
	
	return (
		<Draggable draggableId={props.name} index={props.index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}>

					<div className={classes.column}>
						<p {...provided.dragHandleProps} >{props.name}</p>
						{props.children}
					</div>
				</div>

			)}
		</Draggable>
	)
})


export default Column
