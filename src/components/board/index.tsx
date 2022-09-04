import { createStyles, Group, useMantineTheme } from "@mantine/core"
import { useEffect } from "react"
import { Droppable, DragDropContext } from "react-beautiful-dnd"
import signalJs from 'signal-js'
import Signals from "../../Signals"
import ColumnFooter from "./ColumnFooter"
import Column from "./Column"
import ColumnItemList from "./ColumnItemList"
import { JsonContent } from "../../Types"
import { useBoard } from "../../hooks/UseBoard"
import { useSettings } from "../../hooks/UseSettings"



const useStyles = createStyles((theme) => ({
	board: {
		flexWrap: "nowrap",
		height: "100%",
		minWidth: "100vw",
		padding: theme.spacing.md,

	}
}))

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

	// Hack para que funcionen los signals con los renders
	signalJs.clear(Signals.addWeb)
	signalJs.clear(Signals.updateWeb)
	signalJs.clear(Signals.deleteWeb)
	signalJs.on(Signals.addWeb, (newWeb, category) => board.handleAddWeb(newWeb, category))
	signalJs.on(Signals.updateWeb, (newWeb, destinationCategory, sourceCategory) => board.handleUpdateWeb(newWeb, destinationCategory, sourceCategory))
	signalJs.on(Signals.deleteWeb, (web, category) => board.handleDeleteWeb(web, category))
	signalJs.clear(Signals.updateBoardState)
	signalJs.on(Signals.updateBoardState, (newState: JsonContent) => board.setState(newState))

	useEffect(() => {
		// INFO no funciona correctamente aquí
		// Por ejemplo con la signal de addWeb, la primera vez añade la nueva web. Pero el resto de veces solo modifica la primera web creada. (Al coger el length de state.webs sale siempre el valor de antes de hacer un handleAddWeb)
		// signalJs.on(Signals.addWeb, (webFormEmitSignal) => handleAddWeb(webFormEmitSignal))
		// signalJs.on(Signals.updateWeb, (newWeb, oldWeb, destinationCategory, sourceCategory) => handleUpdateWeb(newWeb, oldWeb, destinationCategory, sourceCategory))
		// signalJs.on(Signals.deleteWeb, (web, category) => handleDeleteWeb(web, category))
	}, [])


	return (
		<DragDropContext onDragEnd={board.handlerDragEnd} onDragStart={board.handlerDragStart}>
			<Droppable droppableId="board" direction="horizontal" type="column">
				{(provided) => (
					<Group
						className={classes.board}
						grow
						spacing="xs"
						align="top" {...provided.droppableProps}
						ref={provided.innerRef}
						style={{ backgroundColor: theme.colorScheme === 'dark' ? settings.backgroundColorDark : settings.backgroundColorLight }}>
						{
							// Dibujar columnas
							board.state.categoryOrder.map((categoryId, index) => {
								const category = board.state.categories[categoryId]
								const webs = category.webIds.map(webId => board.state.webs[webId])
								return (

									<Column key={categoryId} name={categoryId} index={index}>
										<ColumnItemList droppableId={categoryId} webs={webs} />
										<ColumnFooter category={categoryId} />
									</Column>
								)
							})
						}
						{provided.placeholder}
					</Group>
				)}
			</Droppable>
		</DragDropContext >
	)
})
