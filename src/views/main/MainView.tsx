import { careerItems } from './MainCareerItems';
import Slider from '../../components/slider/Slider';
import MainProjectDesc from './MainProjectDesc';
import MainTimeline from './MainTimeline';
import '../../assets/styles/main.scss';


export default function MainView(){
	return (
		<div className="main-container">
			<article className='personal-info'>
				<h2>
					타이틀입니다.<br />
					두 줄이에요
				</h2>
				<div style={{height: '275px', backgroundColor: 'pink'}}>tmp</div>
			</article>

			<article className="career">
				<h2>Career</h2>
				{
					careerItems.map((item, i) => 
						<section key={i}>
							<Slider {...item.sliderProps} containerClass="slider-area" />
							<MainProjectDesc {...item.projectDescProps} containerClass='project-desc-area' />
						</section>
					)
				}

				<div className="timeline-rail">
				<div className="timeline-box">
					<MainTimeline />
				</div>
				</div>
			</article>
		</div>
	)
}
