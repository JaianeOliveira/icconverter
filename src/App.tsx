import {
	Button,
	Card,
	Input,
	Option,
	Select,
	Typography,
} from '@material-tailwind/react';
import { ChangeEvent, ReactNode, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import Footer from './components/Footer';
import Header from './components/Header';
import Notification, { NotificationTypes } from './components/Notification';
import { bases } from './shared/constants';
import { Bases } from './shared/types';
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

			if (isNaN(parsedNumber))
				showNotification(
					'O valor inserido para conversão não é um decimal',
					'error'
				);
			else if (form.to === 'binary') result = decimalToBinary(parsedNumber);
			else if (form.to === 'char') result = decimalToChar(parsedNumber);
			else if (form.to === 'hexadecimal')
				result = decimalToHexadecimal(parsedNumber);
			else if (form.to === 'octal') result = decimalToOctal(parsedNumber);
		}

		if (form.from === 'binary') {
			const decimal = binaryToDecimal(form.data);
			if (form.to === 'decimal') result = decimal;
			else if (form.to === 'char') result = decimalToChar(decimal);
			else if (form.to === 'hexadecimal')
				result = decimalToHexadecimal(decimal);
			else if (form.to === 'octal') result = decimalToOctal(decimal);
		}

		if (form.from === 'char') {
			const decimal = charToDecimal(form.data);

			if (form.to === 'decimal') result = decimal;
			else if (form.to === 'binary') result = decimalToBinary(decimal);
			else if (form.to === 'hexadecimal')
				result = decimalToHexadecimal(decimal);
			else if (form.to === 'octal') result = decimalToOctal(decimal);
		}

		if (form.from === 'hexadecimal') {
			const decimal = hexadecimalToDecimal(form.data);
			if (form.to === 'decimal') result = decimal;
			else if (form.to === 'binary') result = decimalToBinary(decimal);
			else if (form.to === 'octal') result = decimalToOctal(decimal);
			else if (form.to === 'char') result = decimalToChar(decimal);
		}

		if (form.from === 'octal') {
			const decimal = octalToDecimal(form.data);
			if (form.to === 'decimal') result = decimal;
			else if (form.to === 'binary') result = decimalToBinary(decimal);
			else if (form.to === 'hexadecimal')
				result = decimalToHexadecimal(decimal);
			else if (form.to === 'char') result = decimalToChar(decimal);
		}

		setFormHandler('result', result);
	};

	const copyHandler = () => {
		if (!form.result) return;
		navigator.clipboard.writeText(form.result);
		showNotification('Copiado', 'success');
	};

	return (
		<div className="screen-container">
			<Notification
				type={notification?.type}
				message={notification?.message}
				setShow={setNotification}
			/>
			<Header />

			<main className="main-container">
				<Card className="card">
					<Typography as="p">Preencha os campos:</Typography>

					<div className="form">
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
					</div>

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

			<Footer />
		</div>
	);
};

export default App;
