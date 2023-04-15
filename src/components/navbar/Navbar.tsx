import { useState } from 'react'
import { Navbar, Text, Stack, useMantineTheme, Center, Tooltip } from '@mantine/core'
import { NavbarLink } from './NavbarLink'
import { useModal } from '../../hooks/UseModal'
import { useSettings } from '../../hooks/UseSettings'
import { backgroundColorColumn } from '../../Constants'
import { IconSettings } from '@tabler/icons'

const icons = [
	{ icon: IconSettings, label: 'Settings' },
]

export function NavbarMinimal() {
	const [active, setActive] = useState(2)
	const theme = useMantineTheme()
	const settings = useSettings()

	const links = icons.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={index === active}
			onClick={() => setActive(index)}
		/>
	))

	return (
		<Navbar
			height={"100%"}
			width={{ base: 48 }}
			p="xs"
			sx={(theme) => ({
				backgroundColor: backgroundColorColumn()
			})}
		>
			<Navbar.Section>
				<Center>
					<Tooltip label="Startpage" position="right" transitionDuration={0}>
						<img alt='Startpage Logo' width={32} height={32} src={"/startpage-react/apple-touch-icon.png"} />
					</Tooltip>
				</Center>
			</Navbar.Section>

			<Navbar.Section grow mt={50}>
				<Center>
					<Stack justify="center" spacing={0}>
						{/* {links} */}
					</Stack>
				</Center>
			</Navbar.Section>

			<Navbar.Section>
				<Center>
					<Stack justify="center" spacing={0}>
						<NavbarLink icon={IconSettings} label="Settings" onClick={useModal.settings} />
					</Stack>
				</Center>
			</Navbar.Section>
		</Navbar>
	)
}
