import { ReactNode, SyntheticEvent } from "react";
import { ChoiceItem } from "./Multiselect";
const Selecteds = ({
  items,
  className,
  showStyle,
  handleDeleteFromSelecteds,
  showSelectedMessage,
  deleteIcon,
  optionId,
  optionText,
}: {
  items: ChoiceItem[];
  className: string;
  showStyle: "numbers" | "items";
  handleDeleteFromSelecteds: (id: number) => void;
  showSelectedMessage: (items: ChoiceItem[]) => string | ReactNode;
  deleteIcon: ReactNode;
  optionId: string;
  optionText: string;
}) => {
  return (
    <>
      {showStyle === "items"
        ? items.map((selectedItem) => (
            <div
              className={className}
              key={selectedItem[optionId]}
              tabIndex={0}
              onFocus={(e) => {
                e.stopPropagation();
              }}
            >
              <span className="value">{selectedItem[optionText]}</span>
              <span
                className="times"
                onClick={(e: SyntheticEvent) =>
                  handleDeleteFromSelecteds(selectedItem[optionId])
                }
              >
                {deleteIcon}
              </span>
            </div>
          ))
        : items.length > 0 && (
            <div
              className={className}
              tabIndex={0}
              onFocus={(e) => {
                e.stopPropagation();
              }}
            >
              <span className="value">{showSelectedMessage(items)}</span>
            </div>
          )}
    </>
  );
};

export default Selecteds;
