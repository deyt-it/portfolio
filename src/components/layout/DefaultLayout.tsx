import styled from 'styled-components';

const DefaultLayout = ({children}: any)=>{
	// 함수형 컴포넌트 작성에 선언식이던 표현식이던 쓰는건 취향이라고함
	// ㄴ this 찍히는거 보고 선택해서 쓰면 될듯
	function test1 (this: any){console.log(1, this);}
	const test2 = ()=>{console.log(2, this);}
	test1()
	test2()

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
	padding-top: $header-h;
`

export default DefaultLayout