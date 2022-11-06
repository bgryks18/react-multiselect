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
import { FaTimes } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./Multiselect.scss";
import FilteredChoices from "./FilteredChoices";
import Selecteds from "./Selecteds";

export interface ChoiceItem {
  [id: number]: any;
  [value: string]: any;
}

const Loading = () => {
  return <div className={"react-multiselect-loading-icon"}></div>;
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
  defaultSelecteds?: ChoiceItem[];
  showStyle?: "items" | "numbers";
  selectedItemDeleteIcon?: ReactNode;
  clearAllIcon?: ReactNode;
  menuUpIcon?: ReactNode;
  menuDownIcon?: ReactNode;
  noContentMessage?: string | ReactNode;
  scrollRequestItemCount?: number;
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
  defaultSelecteds = [],
  showStyle = "items",
  selectedItemDeleteIcon = <FaTimes />,
  clearAllIcon = <FaTimes />,
  menuUpIcon = <IoIosArrowUp />,
  menuDownIcon = <IoIosArrowDown />,
  noContentMessage = "No Content",
  scrollRequestItemCount = 3,
  showSelectedMessage = (items: ChoiceItem[]) =>
    items.length + " items selected",
  onSelectedsChange,
  onInputValChange,
  onScrollBottom,
}: MultiselectProps) => {
  const [inputVal, setInputVal] = useState("");
  const [isOpen, setIsOpen] = useState(disabled ? false : open);
  const [selecteds, setSelecteds] = useState<ChoiceItem[]>(defaultSelecteds);
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
          className={showClass("react-multiselect-input-values")}
          tabIndex={0}
        >
          <Selecteds
            items={selecteds}
            className={`${showClass("react-multiselect-button")} ${
              disabled ? "disabled" : ""
            }`}
            handleDeleteFromSelecteds={(id) => handleDeleteFromSelecteds(id)}
            deleteIcon={selectedItemDeleteIcon}
            showStyle={showStyle}
            showSelectedMessage={showSelectedMessage}
            optionId={optionId}
            optionText={optionText}
          />
          <div className={showClass("react-multiselect-input")}>
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
            scrollRequestItemCount={scrollRequestItemCount}
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
              <div className="stick"></div>
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
