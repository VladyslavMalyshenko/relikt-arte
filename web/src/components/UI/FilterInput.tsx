import "../../styles/components/UI/BuySectionFilters.scss";

type FilterInputProps = {
    label: string;
    type?: string;
    groupName?: string;
    isChecked?: boolean;
    onChange?: () => void;
    wrapperStyles?: any;
};

const FilterInput = ({
    label,
    type = "checkbox",
    groupName,
    isChecked,
    onChange,
    wrapperStyles,
}: FilterInputProps) => {
    return (
        <div
            style={wrapperStyles || {}}
            className="filters-filter-option"
            onClick={onChange}
        >
            <input
                type={type}
                name={groupName || label}
                checked={isChecked}
                onChange={onChange}
            />
            <div
                className={`filters-filter-option-checkbox${
                    isChecked ? " checked" : ""
                }`}
            >
                <span></span>
            </div>
            <p className="small black">{label}</p>
        </div>
    );
};

export default FilterInput;
