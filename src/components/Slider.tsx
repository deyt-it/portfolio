import '../assets/styles/components/slider.scss';

interface Props {
	items: Array<React.ReactNode>, 
	width?: string, 
	pagination?: boolean, 
	thumbnails?: boolean, 
	infinite?: boolean, 
	// speed?: number, 
}

export default function Slider({
	items, 
	width = '90vw', 
	pagination = true, 
	thumbnails = false, 
	infinite = true, 
	// speed = 1000, 
}: Props){
	const widthValue: number = parseInt(width.replace(/[^0-9]/g, ''))
	const widthUnit: string = width.replace(/\d/g, '')
	
	return (
		<div className="slider-container">
			<div className="viewport" style={{width: width}}>
				<ul style={{width: widthValue*items.length + widthUnit}}>
					{
						items.map((item, i) => 
							<li key={i} style={{width: width}}>{item}</li>
						)
					}
				</ul>
			</div>
			<div className="nav-buttons">
				<button className='prev'>prev</button>
				<button className='next'>next</button>
			</div>
			{
				pagination &&
				<ul className="pagination">
					{
						Array.from({length: items.length}, (_, i)=>
							<li key={i}>{i+1}</li>
						)
					}
				</ul>
			}
			{
				thumbnails && 
				<ul className="thumbnails"></ul>
			}
		</div>
	)
}