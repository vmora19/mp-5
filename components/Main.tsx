"use client"
import Link from "next/link";
import styled from "styled-components";
import React, { useState, ChangeEvent } from 'react';
import createNewShortUrl from "@/lib/createNewShortUrl";



const StyledMain = styled.main`
    height: 100vh;
    background-color: #f7e1d7;
`;

const SpaceDiv = styled.div`
    background-color: #f7e1d7;
    padding-bottom: 3%;
`

const StyledDiv = styled.div`
    width: 60%;
    margin: auto;
    background-color: #edafb8;
    border-radius: 4%;
    height: 70%;
`;

const StyledH1 = styled.h1`
    color: #4a5759;
    font-size: calc(3vw + 0.4vw);
    font-family: Garamond, serif;
    text-align: center;
    font-variant: small-caps;
`;

const StyledH4 = styled.h4`
    color: white;
    font-weight: bold;
    font-size: calc(2vw + 0.4vw);
    font-family: Garamond, serif;
    text-align: left;
    padding-left: 8%;
    padding-top: 4%;
    text-decoration: underline;
    font-variant: small-caps;
`;

const StyledP = styled.p`
    color: white;
    font-size: calc(1vw + 0.4vw);
    font-family: Garamond, serif;
    text-align: left;
    padding-left: 8%;
`;

const StyledP2 = styled.p`
    color: white;
    font-weight: bold;
    font-size: calc(1vw + 0.4vw);
    font-family: Garamond, serif;
    text-align: left;
    padding-left: 8%;
    padding-top: 4%;
    text-decoration: underline;
    font-variant: small-caps;
`;

const StyledP3 = styled.p`
    color: white;
    font-weight: bold;
    font-size: calc(1vw + 0.4vw);
    font-family: Garamond, serif;
    text-align: center;
    padding-top: 4%;
    text-decoration: underline;
`;

const StyledInput = styled.input`
    margin-left: 8%;
    width: 85%;
    background-color: white;
    color: black;
    height: 8%;
    font-size: calc(1vw + 0.4vw);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

const StyledInput2 = styled.input`
    width: 25%;
    background-color: white;
    color: black;
    height: 25%;
    margin-left: 1%;
    font-size: calc(1vw + 0.4vw);
    font-family: Garamond, serif;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

const StyledDiv3 = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledButton = styled.button`
    margin: 5% auto auto 8%;
    width: 85%;
    height: 12%;
    background-color: #b0c4b1;
    color: white;
    font-size: calc(2vw + 0.4vw);
    font-family: Garamond, serif;
    font-weight: bold;

    &:hover {
        background-color: #4a5759;
    }

`;


export default function Main() {

    const [inputValue, setInputValue] = useState("");
    const [inputAlias, setInputAlias] = useState("");
    const [shortUrl, setShortUrl] = useState<string | null>(null);


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
        setInputAlias(event.target.value);
    };

    const handleShorten = async () => {
        try {
            if (!inputValue) return alert("Enter a URL");
            if (!inputAlias) return alert("Enter an alias");
        
            if (
              !inputValue.startsWith("http://") &&
              !inputValue.startsWith("https://")
            ) {
              alert("URL must start with http:// or https://");
              return;
            }
        
            const result = await createNewShortUrl(inputValue, inputAlias);
        
            setShortUrl(`https://mp-5-lake-beta.vercel.app/${result.alias}`);
        
          } catch (err: any) {
            if (err.message === "alias is taken") {
              alert("Alias already exists, please choose another alias.");
            } else {
              alert("Something went wrong.");
            }
          }
    };
    

    return (
        <StyledMain>
            <SpaceDiv />
            <StyledH1>URL Shortener</StyledH1>

            <StyledDiv>
                <StyledH4>Shorten a URL</StyledH4>
                <StyledP>
                    Enter a long URL to shorten it, then share the link as your heart desires!
                </StyledP>

                <StyledP2>URL</StyledP2>

                <StyledInput
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter long url here..."
                />

                <StyledP2>Custom Alias</StyledP2>

                <StyledDiv3>
                    <StyledP>
                    https://mp-5-lake-beta.vercel.app/
                    </StyledP>
                    <StyledInput2
                        type="text"
                        value={inputAlias}
                        onChange={handleChange2}
                        placeholder="Custom alias here..."
                    />
                </StyledDiv3>

                <StyledButton onClick={handleShorten}>Shorten</StyledButton>

                {shortUrl && (
                    <StyledP3>
                        <a href={shortUrl} style={{ color: "white" }} target="_blank">{shortUrl}</a>
                    </StyledP3>
                )}
            </StyledDiv>
        </StyledMain>
    );
}