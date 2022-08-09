import { useState } from "react";
import styled from "@emotion/styled";
import ToggleButton from "./ToggleButton";
import categoryType from "../constants/categoryType";
import ICategoryType from "../typescript/ICategoryType";

const Flex = styled.div`
  display: flex;
`;

const Center = styled.div`
  padding: 5px;
  cursor: pointer;
`;

const Option = styled(Flex)`
  padding: 5px;
`;

const Select = styled.div`
  min-width: 250px;
  margin-left: 20px;
  background: field;
  color: white;
`;

const Button = styled.button`
  margin-left: auto;
  padding: 4px 12px;
  background: black;
  cursor: pointer;
`;

interface IProps {
  categories: ICategoryType[];
  deleteCategoryNews: (category: ICategoryType) => void;
}

const DeleteCategory = ({ categories, deleteCategoryNews }: IProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleShowDropdown = () => {
    if (showDropdown) {
      setShowMenu(false);
    }
    setShowDropdown((showDropdown) => !showDropdown);
  };

  const toggleShowMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  return (
    <Flex>
      <ToggleButton handleClick={toggleShowDropdown} />

      {/* usually react-select */}
      {showDropdown && (
        <Select role="button" onClick={toggleShowMenu}>
          <Center>Delete category</Center>
          {showMenu &&
            categories.map((category) => (
              <Option key={category}>
                <span>{categoryType[category]}</span>
                <Button onClick={() => deleteCategoryNews(category)}>
                  Delete
                </Button>
              </Option>
            ))}
        </Select>
      )}
    </Flex>
  );
};

export default DeleteCategory;
