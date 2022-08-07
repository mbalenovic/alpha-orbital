import { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import ICategoryType from "../typescript/ICategoryType";
import categoryType from "../constants/categoryType";
import ToggleButton from "./ToggleButton";

const Flex = styled.div`
  display: flex;
`;

interface INewsFilterItemProps {
  active: boolean;
}

const NewsFilterItem = styled.div<INewsFilterItemProps>`
  padding: 5px 10px;
  white-space: nowrap;
  &:hover {
    color: grey;
    cursor: pointer;
  }
  color: ${(props) => (props.active ? "blue" : "unset")};
  text-decoration: ${(props) => (props.active ? "underline" : "none")}; ;
`;

interface IProps {
  filters: ICategoryType[];
  activeFilter?: ICategoryType;
  setActiveFilter: Dispatch<SetStateAction<ICategoryType>>;
}

const NewsFilter = ({ filters, activeFilter, setActiveFilter }: IProps) => (
  <Flex>
    {filters.map((filter) => (
      <NewsFilterItem
        onClick={() => setActiveFilter(filter)}
        active={activeFilter === filter}
        key={filter}
      >
        {categoryType[filter]}
      </NewsFilterItem>
    ))}
    <NewsFilterItem
      onClick={() => setActiveFilter("0")}
      active={activeFilter === "0"}
    >
      {categoryType["0"]}
    </NewsFilterItem>
    <ToggleButton />
  </Flex>
);

export default NewsFilter;
