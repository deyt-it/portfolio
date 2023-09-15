import { useRef, useState } from 'react'
import * as d3 from 'd3'

function Topology() {
	const data = {
		name: 'system', 
		children: [
			{
				name: 'application1', 
				children: [
					{
						name: 'host1', 
						value: 3416
					}, 
					{
						name: 'host2', 
						value: 3417
					}, 
				]
			}, 
			{
				name: 'application2', 
				children: [
					{
						name: 'host3', 
						value: 4416
					}, 
					{
						name: 'host4', 
						value: 4417
					}, 
					{
						name: 'host1', 
						value: 3418
					}, 
				]
			}, 
		]
	}
	const width = 928;
	const height = 600;
	const refLinks = useRef(null)
	const refNodes = useRef(null)

	const root = d3.hierarchy(data)
	const links: any = root.links()
	const nodes: any = root.descendants()
	const simulation: any = d3.forceSimulation(nodes)
		.force('link', d3.forceLink(links).id((d:any)=>d.id).distance(0).strength(1))
		.force('charge', d3.forceManyBody().strength(-50))
		.force('x', d3.forceX())
		.force('y', d3.forceY())
	const link = d3
		.select(refLinks.current)
		.selectAll('line')
		.data(links)
		.join('line')
	const node = d3
		.select(refNodes.current)
		.selectAll('div')
		.data(nodes)
		.join('div')
			.attr('padding', 10)
			.attr('background', 'pink')
			// ing
			// .call(d3.drag<any, any>())
	

	return (
		<>
			<svg
				width={width} height={height}
				viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
			>
				<g ref={refLinks} stroke='#999'>
					{/* <line x1="29" y1="-65" x2="7" y2="-7"></line>
					<line x1="29" y1="-65" x2="133" y2="-65"></line>
					<line x1="29" y1="-65" x2="92" y2="-131"></line> */}
				</g>
			</svg>
			<div ref={refNodes}>
				{/*  */}
			</div>
		</>
	)
}

export default Topology