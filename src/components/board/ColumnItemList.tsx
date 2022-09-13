import { useState, memo, useCallback, useEffect } from "react"
import { Web } from "../../Types"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { Virtuoso } from "react-virtuoso"
import { useSettings } from "../../hooks/UseSettings"
import ColumnItem from "./ColumnItem"
import { useStyles } from "../../hooks/UseStyles"


interface Props {
	droppableId: string,
	webs: Web[]
}



const ColumnItemList = memo((props: Props) => {
	const settings = useSettings()
	const { classes } = useStyles()

	// @ts-ignore https://virtuoso.dev/react-beautiful-dnd/
	const HeightPreservingItem = useCallback(({ children, ...props }) => {
		const [size, setSize] = useState(0);
		// eslint-disable-next-line react/prop-types
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
		<Droppable droppableId={props.droppableId} direction="vertical" type="columnItem" mode="virtual"
			renderClone={(provided, snapshot, rubric) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<ColumnItem web={props.webs[rubric.source.index]} category={props.droppableId} />
				</div>

			)}>
			{(provided) => (

				<Virtuoso
					components={
						// @ts-ignore
						{ Item: HeightPreservingItem }
					}
					//@ts-ignore
					scrollerRef={provided.innerRef}
					style={{
						width: settings.columnWidth,
						overflowY:"auto",
						scrollbarWidth: "thin"
					}}
					totalCount={props.webs.length}
					data={props.webs}
					itemContent={index => {
						return (
							<Draggable draggableId={props.webs[index].id.toString()} index={index} key={props.webs[index].id}>
								{(provided) => (
									<div
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										ref={provided.innerRef}>
										<div className={classes.columnItemList}>
											<ColumnItem web={props.webs[index]} category={props.droppableId} />
										</div>
									</div>
								)}
							</Draggable>
						)
					}}
				/>

			)}
		</Droppable>
	)
})

ColumnItemList.displayName = "ColumnItemList"
export default ColumnItemList
