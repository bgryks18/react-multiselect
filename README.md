# react-multiselect

Multiselect component for reactjs.

## Download

    npm install @bgryks/react-multiselect

    or

    yarn add @bgryks/react-multiselect

    import { Multiselect } from "@bgryks/react-multiselect"

## Type

#### `ChoiceItem`

    interface ChoiceItem {
     [value: string]: any;
    }

#### `MultiselectProps`

    interface MultiselectProps {
    defaultOpen?: boolean;
    optionId?: string;
    optionText?: string;
    disabledItem?: string;
    suffix?: string;
    disabled?: boolean;
    loading?: boolean;
    loadingIcon?: ReactElement;
    inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>;
    inputContainerClassName?: string;
    choices?: ChoiceItem[];
    defaultSelected?: string;
    showStyle?: "items" | "numbers";
    deleteIcon?: ReactElement;
    clearIcon?: ReactElement;
    menuUpIcon?: ReactElement;
    menuDownIcon?: ReactElement;
    noContentMessage?: string | ReactElement;
    countForScrollFunction?: number;
    showSelectedMessage?: (items: ChoiceItem[]) => string | ReactElement;
    onSelectedsChange?: (items: ChoiceItem[]) => void;
    onInputValChange?: (val: string) => void | string;
    onScrollBottom?: (items: ChoiceItem[]) => void;
    }

## Props

| Name                     | Type                                                          | Description                                                                                                                                                  | Default                                                     |
| :----------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| choices?                 | `ChoiceItem[]`                                                | List of choices.                                                                                                                                             | `[]`                                                        |
| clearIcon?               | `ReactNode`                                                   | Button to clear all items to the right of the input.                                                                                                         | `<MenuTimes/>`                                              |
| defaultSelected?         | `string`                                                      | The property name of initial chocies. If the value of the specified property is true, the item will be selected initially.                                   | `default`                                                   |
| disabled?                | `boolean`                                                     | If true, component is disabled.                                                                                                                              | `false`                                                     |
| disabledItem?            | `string`                                                      | Property name of the choices which will be disabled.                                                                                                         | `"disabled"`                                                |
| countForScrollFunction?  | `number`                                                      | A number that specifies how many item must be left in the result container after scrolling to work the process defined in the onScrollBottom method.         | `3`                                                         |
| inputContainerClassName? | `string`                                                      | Classname of the div containing the input.                                                                                                                   | `""`                                                        |
| inputProps?              | `object`                                                      | React input props .                                                                                                                                          | `{}`                                                        |
| loading?                 | `boolean`                                                     | If true, a loading icon will be displayed at the end of the input.                                                                                           | `false`                                                     |
| loadingIcon?             | `ReactElement`                                                | An React component for the loading state.                                                                                                                    | `<Loading/>`                                                |
| menuDownIcon?            | `ReactElement`                                                | An React component for the menu down click button.                                                                                                           | `<MenuDown/>`                                               |
| menuUpIcon?              | `ReactNode`                                                   | An React component for the menu up click button.                                                                                                             | `<MenuUp/>`                                                 |
| noContentMessage?        | <code>ReactElement &#124; string</code>                       | Content message telling users that the choices not found.                                                                                                    | `"No content"`                                              |
| onInputValChange?        | <code>(val: string) => void &#124; string</code>              | Callback function that runs when input value has been changed.                                                                                               | `undefined`                                                 |
| onScrollBottom?          | `(items: ChoiceItem[]) => void`                               | Callback function that runs when scrolled to bottom.                                                                                                         | `undefined`                                                 |
| onSelectedsChange?       | `(items: ChoiceItem[]) => void`                               | Callback function that runs when state of selected items has changed.                                                                                        | `undefined`                                                 |
| open?                    | `boolean`                                                     | If true, the menu list container will initially be displayed.                                                                                                | `false`                                                     |
| optionId?                | `string`                                                      | Property name that specifies the unique value of the choices.                                                                                                | `"id"`                                                      |
| optionText?              | `string`                                                      | Property name that specifies the text value of the choices.                                                                                                  | `"value"`                                                   |
| deleteIcon?              | `ReactElement`                                                | Delete icon for each selected items.                                                                                                                         | `<MenuTimes/>`                                              |
| showSelectedMessage?     | <code>(items: ChoiceItem[]) => string &#124; ReactNode</code> | Message showing users selected items. It works if the `showStyle` property is "numbers".                                                                     | `(items: ChoiceItem[]) => items.length + " items selected"` |
| showStyle?               | <code>"items" &#124; "numbers"</code>                         | If "items", each item in the list will be displayed as a box in the container. If "numbers", only one box which containing message to show will be displayed | `"items"`                                                   |
| suffix?                  | `string`                                                      | Class suffix to separate elements used in the component. Example: `react-multiselect-container-myclassname`                                                  | `""`                                                        |

## Custom Styling

| Classname                                | Description                                                                   |
| :--------------------------------------- | :---------------------------------------------------------------------------- |
| `.react-multiselect-input-container`     | The wrapper element containing input content and indicators in the component. |
| `.react-multiselect-input-content`       | The element containing the selected items and input element.                  |
| `.react-multiselect-input-selected-item` | Selected item boxes in the `.react-multiselect-input-content`.                |
| `.react-multiselect-input-textbox`       | The html input element in the `.react-multiselect-input-content`              |
| `.react-multiselect-result-container`    | The container element of the result of choices.                               |
| `.react-multiselect-result-item`         | Result items of the result container.                                         |
| `.react-multiselect-input-indicators`    | The container of the indicators containing times icon and menu icons.         |
