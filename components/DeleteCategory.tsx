import { Dispatch, SetStateAction, useState } from "react";
import styled from "@emotion/styled";
import ToggleButton from "./ToggleButton";
import categoryType from "../constants/categoryType";
import ICategoryType from "../typescript/ICategoryType";
import INews from "../typescript/INews";

const Select = styled.div`
  background: white;
  color: black;
`;

interface IProps {
  categories: ICategoryType[];
  deleteCategoryNews: (category: ICategoryType) => void;
}

const DeleteCategory = ({ categories, deleteCategoryNews }: IProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  console.log(showMenu, showDropdown);

  const toggleShowDropdown = () => {
    if (showDropdown) {
      toggleShowMenu();
    }
    setShowDropdown((showDropdown) => !showDropdown);
  };

  const toggleShowMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  return (
    <>
      <ToggleButton handleClick={toggleShowDropdown} />
      {showDropdown && (
        <Select role="button" onClick={toggleShowMenu}>
          <div>Delete category</div>
          {showMenu &&
            categories.map((category) => (
              <div key={category}>
                <span>{categoryType[category]}</span>
                <button onClick={() => deleteCategoryNews(category)}>
                  Delete
                </button>
              </div>
            ))}
        </Select>
      )}
    </>
  );
};

export default DeleteCategory;
