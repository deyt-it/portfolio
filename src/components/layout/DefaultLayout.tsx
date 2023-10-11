import styled from 'styled-components';

export default DefaultLayout


function DefaultLayout({children}: any){

	return (
		<StyledWrap>
			{children}
		</StyledWrap>
	)
}
const StyledWrap = styled.div`
	display: flex;
	justify-content: center;
	min-width: 800px;
	padding-top: var(--header-h);
`
