import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

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
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    router.replace({
      query: { ...router.query, search: e.target.value },
    });
  };

  return (
    <Input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={handleChange}
    />
  );
};

export default Search;
