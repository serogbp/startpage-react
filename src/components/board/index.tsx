import { createStyles, Group } from "@mantine/core"
import { useEffect } from "react"
import { Droppable, DragDropContext } from "react-beautiful-dnd"
import signalJs from 'signal-js'
import UseBoard from "../../hooks/UseBoard"
import Signals from "../../Signals"
import AddWebButton from "./AddWebButton"
import Column from "./Column"
import ColumnItemList from "./ColumnItemList"


const useStyles = createStyles((theme) => ({
	board: {
		flexWrap: "nowrap",
		height: "100%",
		background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.blue[3],
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
	const board = UseBoard()
	const { classes } = useStyles()

	// Hack para que funcionen los signals con los renders
	signalJs.clear(Signals.addWeb)
	signalJs.clear(Signals.updateWeb)
	signalJs.clear(Signals.deleteWeb)
	signalJs.on(Signals.addWeb, (newWeb, category) => board.handleAddWeb(newWeb, category))
	signalJs.on(Signals.updateWeb, (newWeb, destinationCategory, sourceCategory) => board.handleUpdateWeb(newWeb, destinationCategory, sourceCategory))
	signalJs.on(Signals.deleteWeb, (web, category) => board.handleDeleteWeb(web, category))


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
					<Group className={classes.board} grow spacing="xs" align="top" {...provided.droppableProps} ref={provided.innerRef}>
						{
							// Dibujar columnas
							board.state.categoryOrder.map((categoryId, index) => {
								const category = board.state.categories[categoryId]
								const webs = category.webIds.map(webId => board.state.webs[webId])
								return (

									<Column key={categoryId} name={categoryId} index={index}>
										<ColumnItemList droppableId={categoryId} webs={webs} />
										<AddWebButton category={categoryId} />
										{/* TODO usar component composition  para pasar el form a addwebutton
											usar signal-js para cerrar el popover cuando emita el form
										*/}
									</Column>
								)
							})
						}
						{provided.placeholder}
					</Group>
				)}
			</Droppable>
		</DragDropContext>
	)
})
