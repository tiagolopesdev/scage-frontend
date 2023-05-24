import styled from "styled-components";

export const ScroolCustom = styled.div`
  margin-top: 5%;
  scroll-behavior: smooth;
  overflow-y: scroll;
  height: 58%;
  padding-right: 2%;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(159 159 159);
    border-radius : 10px;
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
`;

export const SidebarContainer = styled.div`
  background-color: #d1d1d1;
  height: 100%;
  position: fixed;
  width: 25%;
  margin-top: 4rem;
  padding: 30px;
`;
