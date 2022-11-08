import {
  ReactNode,
  BaseSyntheticEvent,
  FocusEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import "./Multiselect.scss";
import FilteredChoices from "./FilteredChoices";
import Selecteds from "./Selecteds";

export interface ChoiceItem {
  [value: string]: any;
}
const MenuUp = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"></path>
  </svg>
);

const MenuDown = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
  </svg>
);

const MenuTimes = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 352 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
  </svg>
);
const Loading = () => {
  return <div className="react-multiselect-loading"></div>;
};
interface MultiselectProps {
  open?: boolean;
  optionId?: string;
  optionText?: string;
  disabledItem?: string;
  suffix?: string;
  disabled?: boolean;
  loading?: boolean;
  loadingIcon?: ReactNode;
  inputProps?: {
    [key: string]: string;
  };
  inputContainerClassName?: string;
  choices?: ChoiceItem[];
  defaultSelected?: string;
  showStyle?: "items" | "numbers";
  selectedItemDeleteIcon?: ReactNode;
  clearAllIcon?: ReactNode;
  menuUpIcon?: ReactNode;
  menuDownIcon?: ReactNode;
  noContentMessage?: string | ReactNode;
  itemCountToScrollFunction?: number;
  showSelectedMessage?: (items: ChoiceItem[]) => string | ReactNode;
  onSelectedsChange?: (items: ChoiceItem[]) => void;
  onInputValChange?: (val: string) => void | string;
  onScrollBottom?: (items: ChoiceItem[]) => void;
}
const Multiselect = ({
  open = false,
  inputProps = {},
  inputContainerClassName = "",
  suffix = "",
  disabled = false,
  loading = false,
  loadingIcon = <Loading />,
  optionId = "id",
  optionText = "value",
  disabledItem = "disabled",
  choices = [],
  defaultSelected = "default",
  showStyle = "items",
  selectedItemDeleteIcon = <MenuTimes />,
  clearAllIcon = <MenuTimes />,
  menuUpIcon = <MenuUp />,
  menuDownIcon = <MenuDown />,
  noContentMessage = "No Content",
  itemCountToScrollFunction = 3,
  showSelectedMessage = (items: ChoiceItem[]) =>
    items.length + " items selected",
  onSelectedsChange,
  onInputValChange,
  onScrollBottom,
}: MultiselectProps) => {
  const [inputVal, setInputVal] = useState("");
  const [isOpen, setIsOpen] = useState(disabled ? false : open);
  const [selecteds, setSelecteds] = useState<ChoiceItem[]>(
    choices.filter((choiceItem) => choiceItem[defaultSelected])
  );
  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleInputChange = useCallback(
    (e: BaseSyntheticEvent) => {
      if (disabled) return;
      setInputVal(e.target.value);
    },
    [inputVal, setInputVal]
  );

  const handleSelect = useCallback(
    (id: number, text: string) => {
      if (disabled) return;
      setSelecteds((prev) => [...prev, { [optionId]: id, [optionText]: text }]);
    },
    [inputVal, setInputVal]
  );

  const handleContainerFocused = (e: FocusEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsOpen(true);
  };

  const handleContainerBlurred = (e: FocusEvent<HTMLDivElement>) => {
    if (e.relatedTarget) return;
    if (disabled) return;
    if (inputVal) {
      setInputVal("");
    }
    setIsOpen(false);
  };

  const handleDeleteFromSelecteds = (id: number) => {
    if (disabled) return;
    setSelecteds((prev) =>
      prev.filter((selectedItem) => selectedItem[optionId] !== id)
    );
  };

  const handleDeleteFromSelectedAll = () => {
    if (disabled) return;
    setSelecteds([]);
    setInputVal("");
  };

  const setInputFocused = (e: FocusEvent<HTMLDivElement>) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputFocused = (e: FocusEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (disabled || isOpen) return;
    setIsOpen(true);
  };
  useEffect(() => {
    if (inputVal) {
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  }, [inputVal]);

  useEffect(() => {
    if (isOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    getSelectedsChange(selecteds);
  }, [selecteds]);

  useEffect(() => {
    getInputValChange(inputVal);
  }, [inputVal]);

  const selectedItemIds = useMemo(() => {
    return selecteds.map((selectedItem) => selectedItem[optionId]);
  }, [selecteds]);

  const filteredChoices = useMemo(() => {
    return inputVal
      ? choices
          .filter((choiceItem) => choiceItem[optionText].includes(inputVal))
          .filter(
            (choiceItem) => !selectedItemIds.includes(choiceItem[optionId])
          )
      : choices.filter(
          (choiceItem) => !selectedItemIds.includes(choiceItem[optionId])
        );
  }, [choices, inputVal, selectedItemIds]);

  const showClass = (v: string) => (suffix ? v + "-" + suffix : v);

  const getSelectedsChange = useCallback(
    (newSelecteds: ChoiceItem[]) => {
      if (typeof onSelectedsChange === "function") {
        onSelectedsChange(newSelecteds);
      }
    },
    [selectedItemIds]
  );

  const getInputValChange = useCallback(
    (newInputVal: string) => {
      if (typeof onInputValChange === "function") {
        onInputValChange(newInputVal);
      }
    },
    [inputVal]
  );

  return (
    <div
      className={showClass("react-multiselect-container")}
      onBlur={handleContainerBlurred}
      onFocus={handleContainerFocused}
      tabIndex={0}
    >
      <div
        className={`${showClass(
          "react-multiselect-input-container"
        )} ${inputContainerClassName}`}
        tabIndex={0}
        onFocus={setInputFocused}
      >
        <div
          className={showClass("react-multiselect-input-content")}
          tabIndex={0}
        >
          <Selecteds
            items={selecteds}
            className={`${showClass("react-multiselect-input-selected-item")} ${
              disabled ? "disabled" : ""
            }`}
            handleDeleteFromSelecteds={(id) => handleDeleteFromSelecteds(id)}
            deleteIcon={selectedItemDeleteIcon}
            showStyle={showStyle}
            showSelectedMessage={showSelectedMessage}
            optionId={optionId}
            optionText={optionText}
          />
          <div className={showClass("react-multiselect-input-textbox")}>
            <input
              type="text"
              onChange={handleInputChange}
              onFocus={handleInputFocused}
              ref={inputRef}
              value={inputVal}
              disabled={disabled}
              {...inputProps}
            />
          </div>
          <FilteredChoices
            isOpen={isOpen}
            filteredChoices={filteredChoices}
            choices={choices}
            selectedItemIds={selectedItemIds}
            containerClassName={showClass("react-multiselect-result-container")}
            itemClassName={showClass("react-multiselect-result-item")}
            handleSelect={handleSelect}
            handleDeleteFromSelecteds={handleDeleteFromSelecteds}
            showStyle={showStyle}
            noContentMessage={noContentMessage}
            optionId={optionId}
            optionText={optionText}
            disabledItem={disabledItem}
            itemCountToScrollFunction={itemCountToScrollFunction}
            onScrollBottom={onScrollBottom}
          />
        </div>

        <div
          className={`${showClass("react-multiselect-input-indicators")} ${
            disabled ? "disabled" : ""
          }`}
          tabIndex={0}
          onFocus={(e) => {
            e.stopPropagation();
          }}
        >
          {loading ? (
            loadingIcon
          ) : (
            <>
              <button
                className="times"
                onClick={() => handleDeleteFromSelectedAll()}
              >
                {clearAllIcon}
              </button>
              <div className="stick">&nbsp;</div>
              <button
                className="dropdown"
                onClick={() => !disabled && setIsOpen(!isOpen)}
              >
                {isOpen ? menuUpIcon : menuDownIcon}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Multiselect;
