import { forwardRef } from 'react';
import { Group, Text, ColorSwatch } from '@mantine/core';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
	label: string
	value: string
	colorSwatch: string
}

const SelectItemComponent_Color = forwardRef<HTMLDivElement, ItemProps>(
	({ label, value, colorSwatch, ...others }: ItemProps, ref) => (
		<div ref={ref} {...others}>
			<Group noWrap>
				<ColorSwatch key={label} color={colorSwatch} />
				<div>
					<Text size="sm">{label}</Text>
				</div>
			</Group>
		</div>
	)
);

SelectItemComponent_Color.displayName = "SelectItemComponent_Color"
export default SelectItemComponent_Color
