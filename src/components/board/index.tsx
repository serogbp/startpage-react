import { Group, useMantineTheme } from "@mantine/core"
import { Droppable, DragDropContext } from "react-beautiful-dnd"
import ColumnFooter from "./ColumnFooter"
import ColumnItemList from "./ColumnItemList"
import { useBoard } from "../../hooks/useBoard/UseBoard"
import { useSettings } from "../../hooks/UseSettings"
import { useStyles } from "../../hooks/UseStyles"
import { ColumnAddButton } from "./ColumnAddButton"
import Column from "./column"


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


export const Board = (() => {
	const settings = useSettings()
	const theme = useMantineTheme()
	const board = useBoard()
	const { classes } = useStyles()


	return (
		<Group
			spacing="xs"
			className={[classes.boardContainer, classes.boardPadding].join(" ")}
			style={{ backgroundColor: theme.colorScheme === 'dark' ? settings.backgroundColorDark.value : settings.backgroundColorLight.value }}
		>
			<DragDropContext onDragEnd={board.dnd.dragEnd} onDragStart={board.dnd.dragStart}>
				<Droppable droppableId="board" direction="horizontal" type="column">
					{(provided) => (
						<Group
							className={classes.board}
							grow
							spacing="xs"
							align="top"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{
								// Dibujar columnas
								board.state.categoryOrder.map((categoryId, index) => {
									const category = board.state.categories[categoryId]
									const webs = category.webIds.map(webId => board.state.webs[webId])

									if (settings.hideEmptyColumns && webs.length === 0) {
										//
									} else {
										return (

											<Column key={categoryId} name={categoryId} index={index}>
												<ColumnItemList droppableId={categoryId} webs={webs} />
												<ColumnFooter category={categoryId} />
											</Column>
										)
									}


								})
							}
							{provided.placeholder}
						</Group>
					)}
				</Droppable>
			</DragDropContext >
			{
				!settings.hideCreateColumnButton && <ColumnAddButton />
			}
		</Group>
	)
})
