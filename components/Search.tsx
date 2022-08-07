import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";

const Input = styled.input`
  width: 100%;
  height: 40px;
`;

const Search = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default Search;
