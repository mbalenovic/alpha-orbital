import { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import ICategoryType from "../typescript/ICategoryType";
import categoryType from "../constants/categoryType";
import { useRouter } from "next/router";

const Flex = styled.div`
  display: flex;
  padding: 20px 0;
`;

interface INewsFilterItemProps {
  active?: boolean;
}

const NewsFilterItem = styled.div<INewsFilterItemProps>`
  padding: 5px 10px;
  white-space: nowrap;
  &:hover {
    color: white;
    cursor: pointer;
  }
  color: ${(props) => (props.active ? "white" : "grey")};
  font-weight: ${(props) => (props.active ? "500" : "400")};
  text-transform: ${(props) => (props.active ? "uppercase" : "none")}; ;
`;

interface IProps {
  filters: ICategoryType[];
  activeFilter?: ICategoryType;
  setActiveFilter: Dispatch<SetStateAction<ICategoryType>>;
}

const NewsFilter = ({ filters, activeFilter, setActiveFilter }: IProps) => {
  const router = useRouter();

  const handleClick = (filter: ICategoryType) => {
    setActiveFilter(filter);
    router.replace({
      query: { ...router.query, category: filter },
    });
  };

  return (
    <Flex>
      {filters.map((filter) => (
        <NewsFilterItem
          onClick={() => handleClick(filter)}
          active={activeFilter === filter}
          key={filter}
        >
          {categoryType[filter]}
        </NewsFilterItem>
      ))}
      <NewsFilterItem
        onClick={() => handleClick("0")}
        active={activeFilter === "0"}
      >
        {categoryType["0"]}
      </NewsFilterItem>
    </Flex>
  );
};

export default NewsFilter;
