import { IconButton, Tooltip, Typography } from '@material-tailwind/react';
import { FaGithub } from 'react-icons/fa';

const Header = () => {
	return (
		<header
			className="w-full flex items-center justify-between px-[6vw] py-4
"
		>
			<Typography
				className="text-indigo-50 font-light uppercase text-xs tracking-widest"
				as="h5"
			>
				ICConverter
			</Typography>
			<div>
				<Typography
					as="a"
					href="https://github.com/JaianeOliveira/icconverter"
					target="_blank"
				>
					<Tooltip
						translate="yes"
						content="Github do projeto"
						placement="bottom"
					>
						<IconButton color="indigo" ripple>
							<FaGithub />
						</IconButton>
					</Tooltip>
				</Typography>
			</div>
		</header>
	);
};

export default Header;
