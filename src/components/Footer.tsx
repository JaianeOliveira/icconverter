import { Typography } from '@material-tailwind/react';

const Footer = () => {
	return (
		<footer className="w-full px-[4vw] py-4 self-end flex items-center justify-end">
			<Typography as="span" className="text-gray-800 text-xs">
				&copy; <a>Jaiane Oliveira</a>, 2022
			</Typography>
		</footer>
	);
};

export default Footer;
