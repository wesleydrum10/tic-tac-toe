import {styled } from 'styled-components'

export const HomeContainer = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
`

export const BoxContainer = styled.div`
    background-color: var(--bg-gray-box);
    height: 5rem;
    width: 5rem;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: 0px 5px var(--color-default-shawdon);
    border: 1px solid transparent;
    font-size: 3rem;
    color: var(--color-player-x);
    font-weight: 700;
    cursor: pointer;

    &:checked {
    border: 1px solid transparent;
    color: var(--bg-gray-box);
    background-color: var(--bg-gray-box);
    }

    &:hover {
    box-shadow: 0px 5px var(--bg-gray-default);
    }
`
  