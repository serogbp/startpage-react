import { ScrollArea, Stack } from "@mantine/core"
import { useState, memo } from "react"
import { Web } from "../../Types"
import { Draggable, Droppable } from "react-beautiful-dnd"
import ColumnItem from "./columnItem"
import DraggableElement from "../dnd/Draggable"
import { Virtuoso } from "react-virtuoso"

interface Props {
	name: string,
	webs: Web[],
	index: number
}


const Column = memo((props: Props) => {
	return (
		<Draggable draggableId={props.name} index={props.index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}>
					<p {...provided.dragHandleProps}>{props.name}</p>
					<ItemList name={props.name} webs={props.webs} />
				</div>
			)}
		</Draggable>
	)
})



interface ItemListProps {
	name: string,
	webs: Web[]
}
const ItemList = memo((props: ItemListProps) => {
	return (
		<Droppable droppableId={props.name} direction="vertical" type="columnItem" mode="virtual"
			renderClone={(provided, snapshot, rubric) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<ColumnItem web={props.webs[rubric.source.index]} />
				</div>
			)}>
			{(provided) => (

				<div ref={provided.innerRef}
					{...provided.droppableProps}>
					<Virtuoso
						useWindowScroll
						style={{ width: 200, overflow: 'visible' }}
						totalCount={props.webs.length}
						data={props.webs}
						itemContent={index => {
							return (
								<Draggable draggableId={props.webs[index].id} index={index} key={props.webs[index].id}>
									{(provided) => (
										<div
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}>
											<ColumnItem web={props.webs[index]} />
										</div>
									)}
								</Draggable>
							)
						}}
					/>
				</div>



			)}
		</Droppable>
	)
})



interface ColumnContentProps {
	webs: Web[]
}
const ColumnContent = memo((props: ColumnContentProps) => {
	return (
		<>
			{
				props.webs.map((web, index) => {
					return (
						<DraggableElement key={web.id} draggableId={web.id} index={index}>
							<ColumnItem web={web} />
						</DraggableElement>
					)
				})
			}
		</>
	)
})

export default Column
