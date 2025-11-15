"use client"
import Link from "next/link";
import styled from "styled-components";

const StyledH1 = styled.h1`
    font-size: calc(4px + 2vw);
    font-family: Garamond, serif;
    padding: 1% 0 1% 2%;
    font-variant: small-caps;
`;

const StyledHeader = styled.header`
    background-color: #4a5759;
    color: white;
    text-align: left;
`;


export default function Header() {
    return (
        <StyledHeader>
            <StyledH1>CS391 URL Shortener</StyledH1>
        </StyledHeader>
    )
}