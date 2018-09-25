import { injectGlobal } from 'styled-components';
import {createStatic} from 'styled-components-breakpoint';
import { transitions, transparentize } from "polished";


import theme from './theme';

const breakpoint = createStatic(theme.breakpoints);

injectGlobal`
  html {
		font-size: 16pt;
		
		${breakpoint.zero`
      font-size: 10pt;
    `}
    
    ${breakpoint.xs`
      font-size: 11pt;
    `}
    
    ${breakpoint.sm`
      font-size: 12pt;
    `}
    
    ${breakpoint.lg`
      font-size: 14pt;
    `}
	}

	body {
		color: ${theme.palette.textColor};
	}

	body, input, select, textarea {
		font-family: ${theme.font.family};
		font-weight: ${theme.font.weight};
		font-size: 1rem;
		line-height: 2.375;
	}
	
	button {
		font-family: ${theme.font.family};
		font-weight: ${theme.font.weight};
		outline:none;
	}

	a {
		// ${transitions(['color', 'background-color', 'border-color', 'border-shadow'], 'ease-in-out ' + theme.transition.duration)};
		
		text-decoration: none;

		&:hover {
			border-bottom-color: transparent;
		}
	}

	strong, b {
		font-weight: ${theme.font.weightBold};
	}

	em, i {
		font-style: italic;
	}

	p {
		text-align: justify;
		margin: 0 0 ${theme.size.elementMargin}rem 0;
		line-height: 1.6;
	}

	h1, h2, h3, h4, h5, h6 {
		font-family: ${theme.font.familyHeading};
		font-weight: ${theme.font.weightHeading};
		line-height: 1.5;
		letter-spacing: 0.075em;
		margin: 0 0 ${theme.size.elementMargin * 0.5}rem 0;

		a {
			border-bottom: 0;
			color: inherit;
			text-decoration: none;
		}
	}

	h1 {
		font-size: 4rem;
		line-height: 1.1;
		margin: 0 0 ${theme.size.elementMargin * 0.75}rem 0;
	}

	h2 {
		font-size: 1.75rem;
		line-height: 1.3;
		margin: 0 0 ${theme.size.elementMargin * 0.75}rem 0;
	}

	h3 {
		font-size: 1.25rem;
		margin: 0 0 ${theme.size.elementMargin * 0.75}rem 0;
	}

	h4 {
		font-size: 1rem;
	}

	h5 {
		font-size: 0.9rem;
	}

	h6 {
		font-size: 0.8rem;
	}

	sub {
		font-size: 0.8rem;
		position: relative;
		top: 0.5rem;
	}

	sup {
		font-size: 0.8rem;
		position: relative;
		top: -0.5rem;
	}

	blockquote {
		border-left: solid 4px;
		font-style: italic;
		margin: 0 0 ${theme.size.elementMargin}rem 0;
		padding: ${theme.size.elementMargin / 4}rem 0 ${theme.size.elementMargin / 4}rem ${theme.size.elementMargin}rem;
	}

	code {
		border-radius: _size(border-radius);
		border: solid 2px;
		font-family: ${theme.font.familyFixed};
		font-size: 0.9rem;
		margin: 0 0.25rem;
		padding: 0.25rem 0.65rem;
	}

	pre {
		-webkit-overflow-scrolling: touch;
		font-family: ${theme.font.familyFixed};
		font-size: 0.9rem;
		margin: 0 0 ${theme.size.elementMargin}rem 0;

		code {
			display: block;
			line-height: 1.75;
			padding: 1rem 1.5rem;
			overflow-x: auto;
		}
	}

	hr {
		border: 0;
		border-bottom: solid 2px;
		margin: ${theme.size.elementMargin  * 1.5}rem 0;

		&.major {
			margin: ${theme.size.elementMargin * 2.5}rem 0;
		}
	}

	.align-left {
		text-align: left;
	}

	.align-center {
		text-align: center;
	}

	.align-right {
		text-align: right;
	}


	// Color Typography

	input, select, textarea {
		color: ${theme.palette.textColor}
	}
	
	button {
		color: ${theme.palette.textColor}
	}

	a {
		color: ${theme.palette.primary}
		cursor: pointer;

		&:hover {
			color: ${theme.palette.primaryDark} !important;
		}
	}

	strong, b {
		color: _palette($p, fg-bold);
	}

	h1, h2, h3, h4, h5, h6 {
		color: ${theme.palette.headingColor}
	}

	blockquote {
		border-left-color: _palette($p, border);
	}

	code {
		background: _palette($p, border-bg);
		border-color: _palette($p, border);
	}

	hr {
		border-bottom-color: _palette($p, border);
	}

`
