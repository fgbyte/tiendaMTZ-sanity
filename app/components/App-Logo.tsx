type Props = {
	className: string;
};

const AppLogo = (props: Props) => {
	return <img className={props.className} src="/logo.svg" alt="logo" />;
};

export default AppLogo;
