import { FiLink2 } from 'react-icons/fi';
import { RiBuildingLine } from 'react-icons/ri';
// import { dateUtils } from "../../utils/dateUtils";

interface IProps {
	containerClass?: string, 
	period: {
		start: Date, 
		end: Date, 
	}, 
	technologies: Array<string>, 
	details: Array<IDetail>, 
	corp: string, 
	link: string, 
}
interface IDetail {
	title: string, 
	content: string, 
}


export default function MainProjectDesc(props: IProps){
	const startStr = props.period.start.toISOString()
	const startYear = startStr.split('-')[0]
	const startMonth = startStr.split('-')[1]
	const endStr = props.period.end.toISOString()
	const endYear = endStr.split('-')[0]
	const endMonth = endStr.split('-')[1]

	return (
		<div className={`project-desc ${props.containerClass}`}>
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
			<ul className="refs">
				<li>
					<RiBuildingLine className="ico" />
					{props.corp}
				</li>
				<li>
					<FiLink2 className="ico link" />
					<a href={props.link} target="_blank">
						{props.link}
					</a>
				</li>
			</ul>
		</div>
	)
}