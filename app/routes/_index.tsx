type Props = {};

const IndexPage = (props: Props) => {
	return (
		<>
			<section className="flex justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row mt-12">
				<div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12">
					<p className="mb-4 font-semibold text-indigo-600 md:mb-6 md:text-lg xl:text-xl">
						Welcome to my shop
					</p>
					<h1 className="text-black mb-8 text-4xl font-bold sm:text-5xl md:mb-12 md:text-6xl">
						Focus on tech matters
					</h1>
				</div>
			</section>
		</>
	);
};

export default IndexPage;
