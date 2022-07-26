import { useState, memo, useCallback, useEffect } from "react"
import { Web } from "../../Types"
import { Draggable, Droppable } from "react-beautiful-dnd"
import ColumnItem from "./columnItem"
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
	// @ts-ignore
	const HeightPreservingItem = useCallback(({ children, ...props }) => {
		const [size, setSize] = useState(0);
		const knownSize = props["data-known-size"];
		useEffect(() => {
			setSize((prevSize) => {
				return knownSize == 0 ? prevSize : knownSize;
			});
		}, [knownSize]);
		// check style.css for the height-preserving-container rule
		return (
			<div
				{...props}
				className="height-preserving-container"
				style={{
					// @ts-ignore
					"--child-height": `${size}px`
				}}
			>
				{children}
			</div>
		);
	}, []);

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


				// TODO: BUG ZERO-SIZE



				<div ref={provided.innerRef}
					{...provided.droppableProps}>
					<Virtuoso
						components={
							// @ts-ignore
							{Item: HeightPreservingItem}
						}
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



export default Column
