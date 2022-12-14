import {
	Button,
	Card,
	IconButton,
	Input,
	Option,
	Select,
	Tooltip,
	Typography,
} from '@material-tailwind/react';
import { ChangeEvent, ReactNode, useState } from 'react';
import { FaGithub, FaRegCopy } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import Notification, { NotificationTypes } from './components/Notification';
import {
	binaryToDecimal,
	charToDecimal,
	decimalToBinary,
	decimalToChar,
	decimalToHexadecimal,
	decimalToOctal,
	hexadecimalToDecimal,
	octalToDecimal,
} from './utils';

const bases = [
	{
		key: 'decimal',
		label: 'Decimal',
	},
	{
		key: 'binary',
		label: 'Binário',
	},
	{
		key: 'octal',
		label: 'Octal',
	},
	{
		key: 'hexadecimal',
		label: 'Hexadecimal',
	},
	{
		key: 'char',
		label: 'Caractere',
	},
];

type Bases = 'decimal' | 'binary' | 'octal' | 'hexadecimal' | 'char';

type FormProps = {
	from: Bases | undefined;
	to: Bases | undefined;
	result: string | undefined;
	data: string;
};

const App = () => {
	const [form, setForm] = useState<FormProps>({
		from: undefined,
		to: undefined,
		result: undefined,
		data: '',
	});
	const [notification, setNotification] = useState<{
		message: string;
		type: NotificationTypes;
	} | null>(null);
	const [copied, setCopied] = useState<string | null>(null);

	const setFormHandler = (
		key: string,
		value: ReactNode | ChangeEvent<HTMLInputElement>
	) => {
		setForm((prevValues) => ({ ...prevValues, [key]: value }));
	};

	const showNotification = (
		message: string,
		type: NotificationTypes = 'message',
		closeIn: number = 3000
	) => {
		setNotification({ message, type });
		setTimeout(() => setNotification(null), closeIn);
	};

	const converterHandler = (e: any) => {
		let result: string | number = '';

		if (form.from === 'decimal') {
			const parsedNumber = Number(form.data);
			if (isNaN(parsedNumber)) {
				showNotification(
					'O valor inserido para conversão não é um decimal',
					'error'
				);
			} else if (form.to === 'binary') {
				result = decimalToBinary(parsedNumber);
			} else if (form.to === 'char') {
				result = decimalToChar(parsedNumber);
			} else if (form.to === 'hexadecimal') {
				result = decimalToHexadecimal(parsedNumber);
			} else if (form.to === 'octal') {
				result = decimalToOctal(parsedNumber);
			}
		}

		if (form.from === 'binary') {
			const decimal = binaryToDecimal(form.data);
			if (form.to === 'decimal') {
				result = decimal;
			} else if (form.to === 'char') {
				result = decimalToChar(decimal);
			} else if (form.to === 'hexadecimal') {
				result = decimalToHexadecimal(decimal);
			} else if (form.to === 'octal') {
				result = decimalToOctal(decimal);
			}
		}

		if (form.from === 'char') {
			const decimal = charToDecimal(form.data);

			if (form.to === 'decimal') {
				result = decimal;
			} else if (form.to === 'binary') {
				result = decimalToBinary(decimal);
			} else if (form.to === 'hexadecimal') {
				result = decimalToHexadecimal(decimal);
			} else if (form.to === 'octal') {
				result = decimalToOctal(decimal);
			}
		}

		if (form.from === 'hexadecimal') {
			const decimal = hexadecimalToDecimal(form.data);
			if (form.to === 'decimal') {
				result = decimal;
			} else if (form.to === 'binary') {
				result = decimalToBinary(decimal);
			} else if (form.to === 'octal') {
				result = decimalToOctal(decimal);
			} else if (form.to === 'char') {
				result = decimalToChar(decimal);
			}
		}

		if (form.from === 'octal') {
			const decimal = octalToDecimal(form.data);
			if (form.to === 'decimal') {
				result = decimal;
			} else if (form.to === 'binary') {
				result = decimalToBinary(decimal);
			} else if (form.to === 'hexadecimal') {
				result = decimalToHexadecimal(decimal);
			} else if (form.to === 'char') {
				result = decimalToChar(decimal);
			}
		}
		setFormHandler('result', result);
	};

	const copyHandler = () => {
		if (!form.result) return;
		navigator.clipboard.writeText(form.result);
		showNotification('Copiado', 'success');
	};
	return (
		<div className="w-full h-[100vh] gap-4 bg-gray-900 flex flex-col">
			<Notification
				type={notification?.type}
				message={notification?.message}
				setShow={setNotification}
			/>

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
					<Tooltip content="Github do projeto" placement="bottom">
						<IconButton color="indigo">
							<FaGithub />
						</IconButton>
					</Tooltip>
				</div>
			</header>

			<main className="w-full h-full px-[8vw] py-10 flex justify-center items-start">
				<ToastContainer />
				<Card className="flex flex-col gap-4 p-8 lg:w-auto w-full h-auto">
					<Typography as="p">Preencha os campos:</Typography>
					<form className="flex flex-col lg:flex-row gap-4">
						<Input
							color="indigo"
							label="Converter"
							onChange={(e) => setFormHandler('data', e.target.value)}
						/>
						<Select
							label="De "
							color="indigo"
							onChange={(e) => setFormHandler('from', e)}
						>
							{bases.map((base) => (
								<Option key={base.key} value={base.key}>
									{base.label}
								</Option>
							))}
						</Select>
						<Select
							label="Para "
							color="indigo"
							onChange={(e) => setFormHandler('to', e)}
						>
							{bases.map((base) => (
								<Option key={base.key} value={base.key}>
									{base.label}
								</Option>
							))}
						</Select>
					</form>
					<Button color="indigo" variant="gradient" onClick={converterHandler}>
						Converter
					</Button>
					<Input
						label="Resultado"
						contentEditable={false}
						disabled
						value={form.result}
						icon={
							<FaRegCopy
								className="cursor-pointer hover:text-indigo-700 transition-all"
								onClick={copyHandler}
							/>
						}
					/>
				</Card>
			</main>
			<footer className="w-full px-[4vw] py-4 self-end flex items-center justify-end">
				<Typography as="span" className="text-gray-800 text-xs">
					&copy; <a>Jaiane Oliveira</a>, 2022
				</Typography>
			</footer>
		</div>
	);
};

export default App;
