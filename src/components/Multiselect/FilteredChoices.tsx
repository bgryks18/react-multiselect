import { ReactNode, BaseSyntheticEvent, SyntheticEvent, useState } from "react";
import { ChoiceItem } from "./Multiselect";

const FilteredChoices = ({
  isOpen,
  filteredChoices,
  choices,
  selectedItemIds,
  containerClassName,
  itemClassName,
  showStyle,
  noContentMessage,
  handleSelect,
  handleDeleteFromSelecteds,
  optionId,
  optionText,
  disabledItem,
  scrollRequestItemCount,
  onScrollBottom,
}: {
  isOpen: boolean;
  filteredChoices: ChoiceItem[];
  choices: ChoiceItem[];
  selectedItemIds: number[];
  containerClassName: string;
  itemClassName: string;
  showStyle: "numbers" | "items";
  noContentMessage: string | ReactNode;
  handleSelect: (id: number, text: string) => void;
  handleDeleteFromSelecteds: (id: number) => void;
  optionId: string;
  optionText: string;
  disabledItem: string;
  scrollRequestItemCount: number;
  onScrollBottom?: (items: ChoiceItem[]) => void;
}) => {
  const [scrolled, setScrolled] = useState(false);
  return (
    <>
      {isOpen && (
        <div
          className={containerClassName}
          tabIndex={0}
          onScroll={(e: BaseSyntheticEvent) => {
            if (typeof onScrollBottom === "function") {
              const childElementHeight = Math.floor(
                e.target.childNodes[0].getBoundingClientRect().height
              );

              const requestPoint = scrollRequestItemCount * childElementHeight;

              const isScrollBottom =
                Math.floor(
                  e.target.scrollHeight -
                    e.target.scrollTop -
                    e.target.clientHeight
                ) <= requestPoint;

              if (isScrollBottom) {
                if (!scrolled) {
                  onScrollBottom(choices);
                  setScrolled(true);
                }
              } else if (scrolled) {
                setScrolled(false);
              }
            }
          }}
        >
          {showStyle === "items" ? (
            filteredChoices.length > 0 ? (
              filteredChoices.map((choicesItem) => {
                if (choicesItem[disabledItem]) {
                  return (
                    <div
                      className={`${itemClassName} disabled`}
                      key={choicesItem[optionId]}
                    >
                      <span>{choicesItem[optionText]}</span>
                    </div>
                  );
                }
                return (
                  <div className={itemClassName} key={choicesItem[optionId]}>
                    <span
                      onClick={(e: SyntheticEvent) =>
                        handleSelect(
                          choicesItem[optionId],
                          choicesItem[optionText]
                        )
                      }
                    >
                      {choicesItem[optionText]}
                    </span>
                  </div>
                );
              })
            ) : (
              <div
                className="no-content"
                tabIndex={0}
                onFocus={(e) => {
                  e.stopPropagation();
                }}
              >
                {noContentMessage}
              </div>
            )
          ) : (
            choices.map((choicesItem) => {
              if (choicesItem[disabledItem]) {
                return (
                  <div
                    className={`${itemClassName} disabled`}
                    key={choicesItem[optionId]}
                  >
                    <span>{choicesItem[optionText]}</span>
                  </div>
                );
              }
              if (selectedItemIds.includes(choicesItem[optionId])) {
                return (
                  <div
                    className={`${itemClassName} selected`}
                    key={choicesItem[optionId]}
                  >
                    <span
                      onClick={(e: SyntheticEvent) =>
                        handleDeleteFromSelecteds(choicesItem[optionId])
                      }
                    >
                      {choicesItem[optionText]}
                    </span>
                  </div>
                );
              } else {
                return (
                  <div className={itemClassName} key={choicesItem[optionId]}>
                    <span
                      onClick={(e: SyntheticEvent) =>
                        handleSelect(
                          choicesItem[optionId],
                          choicesItem[optionText]
                        )
                      }
                    >
                      {choicesItem[optionText]}
                    </span>
                  </div>
                );
              }
            })
          )}
        </div>
      )}
    </>
  );
};

export default FilteredChoices;
