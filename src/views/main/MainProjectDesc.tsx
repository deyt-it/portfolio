import '../../assets/styles/main.scss';

interface Props {
	period: {
		start: number, 
		end: number, 
	}, 
	technologies: Array<string>, 
	details: Array<Detail>, 
	link: string, 
}
interface Detail {
	title: string, 
	content: string, 
}


export default function MainProjectDesc(props: Props){
	// 수정필요
	const startDate = new Date(props.period.start)
	const startYear = startDate.getFullYear()
	const startMonthTmp = "00"+startDate.getMonth()+1
	const startMonth = startMonthTmp.slice(-2, startMonthTmp.length)

	const endDate = new Date(props.period.end)
	const endYear = endDate.getFullYear()
	const endMonthTmp = "00"+endDate.getMonth()+1
	const endMonth = endMonthTmp.slice(-2, endMonthTmp.length)

	return (
		<div className="project-desc">
			<p className="period">
				<span className="year">{startYear}</span>
				<span className="month">/{startMonth}</span>
				<span className="dashed">―</span>
				<span className="year">{endYear}</span>
				<span className="month">/{endMonth}</span>
			</p>
			<p className="technologies">
				{
					props.technologies.map(technology => 
						<span>{technology}</span>
					)
				}
			</p>
			<ul className="detail">
				{
					props.details.map(detail => 
						<li>
							<p className="title">{detail.title}</p>
							<p className="content">{detail.content}</p>
						</li>
					)
				}
			</ul>
			<a href={props.link} target="_blank" className="link">
				{props.link}
			</a>
		</div>
	)
}