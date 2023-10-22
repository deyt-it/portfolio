import '../../assets/styles/main.scss';
import { FiLink2 } from 'react-icons/fi';
// import { dateUtils } from "../../utils/dateUtils";

interface Props {
	period: {
		start: Date, 
		end: Date, 
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
	const startStr = props.period.start.toISOString()
	const startYear = startStr.split('-')[0]
	const startMonth = startStr.split('-')[1]
	const endStr = props.period.end.toISOString()
	const endYear = endStr.split('-')[0]
	const endMonth = endStr.split('-')[1]

	return (
		<div className="project-desc">
			<p className="period">
				<span className="year">{startYear}</span>
				<span className="month">/{startMonth}</span>
				<span className="dashed">―</span>
				<span className="year">{endYear}</span>
				<span className="month">/{endMonth}</span>
			</p>
			<ul className="technologies">
				{
					props.technologies.map(technology => 
						<li key={technology}>{technology}</li>
					)
				}
			</ul>
			<ul className="details">
				{
					props.details.map(detail => 
						<li key={detail.title}>
							<p className="title">{detail.title}</p>
							<p className="content">{detail.content}</p>
						</li>
					)
				}
			</ul>
			<p className="link">
				<FiLink2 className="ico" />
				<a href={props.link} target="_blank">
					{props.link}
				</a>
			</p>
		</div>
	)
}