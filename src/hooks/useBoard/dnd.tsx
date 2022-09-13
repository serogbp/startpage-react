import { DragStart, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { JsonContent } from "../../Types";


export interface BoardDnd {
	dragStart: (initial: DragStart, provided: ResponderProvided) => void
	dragEnd: (result: DropResult) => void

}


export function boardDnd(state: JsonContent, setState: (val: JsonContent | ((prevState: JsonContent) => JsonContent)) => void): BoardDnd {
	const dragStart = (initial: DragStart, provided: ResponderProvided) => {
		console.log("DRAG START");
		console.log(initial);
		console.log(provided);
	};


	const dragEnd = (result: DropResult) => {
		switch (result.type) {
			case "columnItem":
				columnItemDragEnd(result);
				break;
			case "column":
				columnDragEnd(result);
				break;
			default:
				break;
		}
	};


	const columnItemDragEnd = (result: DropResult) => {
		const { source, destination, draggableId } = result;
		// Si hace drop en una zona no permitida
		if (!destination) {
			return;
		}
		else {
			// Si hace drop en la posición original
			if (destination.droppableId === source.droppableId && destination.index === source.index)
				return;

			// La web ha sido droppeada en la misma categoría
			// Solo cambiar index de la web
			if (destination.droppableId === source.droppableId) {
				const newColumn = state.categories[source.droppableId];
				newColumn.webIds.splice(source.index, 1); // Eliminar antiguo index
				newColumn.webIds.splice(destination.index, 0, parseInt(draggableId)); // Mover web modificada a nuevo index

				const newState = {
					...state,
					categories: {
						...state.categories,
						[source.droppableId]: newColumn
					}
				};
				setState(newState);
			}

			// La web ha sido droppeada en otra categoría
			// Mover web a otra categoría
			if (destination.droppableId !== source.droppableId) {
				const oldColumn = state.categories[source.droppableId];
				oldColumn.webIds.splice(source.index, 1);

				const newColumn = state.categories[destination.droppableId];
				newColumn.webIds.splice(destination.index, 0, parseInt(draggableId));

				const newState = {
					...state,
					categories: {
						...state.categories,
						[source.droppableId]: oldColumn,
						[destination.droppableId]: newColumn
					}
				};
				setState(newState);
			}
		}
	};


	const columnDragEnd = (result: DropResult) => {
		const { source, destination, draggableId } = result;
		// Si hace drop en una zona no permitida
		if (!destination) {
			return;
		}
		else {
			// Si hace drop en la posición original
			if (destination.index === source.index)
				return;

			const newCategoryOrder = state.categoryOrder;
			newCategoryOrder.splice(source.index, 1);
			newCategoryOrder.splice(destination.index, 0, draggableId);

			const newState = {
				...state,
				columnOrder: newCategoryOrder
			};
			setState(newState);
		}
	};


	return {
		dragStart, dragEnd
	};
};
