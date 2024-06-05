import styled, { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
    ::-webkit-scrollbar {
        width: 0;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Architects Daughter', cursive;
        user-select: none;
    }

    body {
        width: 100vw;
        height: 100dvh;
        background: url('/background.png') no-repeat bottom/cover;
        background-color: #f6efdf;
    }

    a {
        color: unset;
        text-decoration: none;
    }

    li {
        list-style: none;
    }

    
`

export const Content = styled.div`
	height: 100%;
	padding: 50px;
	@media (max-width: 490px) {
		padding: 50px 25px 25px;
	}
`

export const Input = styled.input`
	color: var(--bg);
	border-radius: 5px;
	border: var(--bg) 2px solid;
	background-color: var(--bg-light);
	padding: 5px 15px;
	font-size: 20px;

	&:focus {
		outline: none;
	}
`
