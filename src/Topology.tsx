import { useEffect, useRef, useState } from 'react'
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
	const viewBoxW = 928;
	const viewBoxH = 600;
	const nodeW = 145;
	const nodeH = 34;
	const refLinks = useRef(null)
	const refNodes = useRef(null)

	const root = d3.hierarchy(data)
	const links: any = root.links()
	const nodes: any = root.descendants()
	const simulation: any = d3.forceSimulation(nodes)
		.force('link', d3.forceLink(links).id((d:any)=>d.id).distance(0).strength(1))
		.force('charge', d3.forceManyBody().strength(-50))
		.force('collide', d3.forceCollide(nodeW*.7))
		// .force('center', d3.forceCenter())
		.force('x', d3.forceX())
		.force('y', d3.forceY())


	useEffect(()=>{
		const link = d3
			.select(refLinks.current)
			.selectAll('line')
			.data(links)
			.join('line')
		const node = d3
			.select(refNodes.current)
			// .selectAll('div')
			// .data(nodes)
			// .join('div')
			// 	.style('position', 'absolute')
			// 	.style('padding', 10)
			// 	.style('background', 'pink')

			// .call(d3.drag<any, any>())
			
			.selectAll('rect')
			.data(nodes)
			.join('rect')
				.attr('width', nodeW)
				.attr('height', nodeH)

		simulation.on('tick', ()=>{
			link
				.attr('x1', (d:any)=>d.source.x)
				.attr('y1', (d:any)=>d.source.y)
				.attr('x2', (d:any)=>d.target.x)
				.attr('y2', (d:any)=>{console.log(1, d); return d.target.y})
			node
				// .style('left', (d:any)=>{console.log(2, d);
				//  return d.x})
				// .style('top', (d:any)=>d.y)
				
				.attr('x', (d:any)=>{console.log(2, d); return d.x})
				.attr('y', (d:any)=>d.y)
		})
	}, [])
	

	return (
		<>
			<svg
				width={viewBoxW} height={viewBoxH}
				viewBox={`${-viewBoxW / 2} ${-viewBoxH / 2} ${viewBoxW} ${viewBoxH}`}
			>
				<g ref={refLinks} stroke='#666'>
					{/* <line x1="29" y1="-65" x2="7" y2="-7"></line>
					<line x1="29" y1="-65" x2="133" y2="-65"></line>
					<line x1="29" y1="-65" x2="92" y2="-131"></line> */}
				</g>
				<g ref={refNodes} stroke='#666' fill='pink'></g>
			</svg>
			{/* <div ref={refNodes}></div> */}
		</>
	)
}

export default Topology