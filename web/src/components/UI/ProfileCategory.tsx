type ProfileCategoryProps = {
    category: string;
    currentCategory: string;
    set: any;
    onClick?: any;
};

const ProfileCategory = ({
    category,
    currentCategory,
    set,
    onClick,
}: ProfileCategoryProps) => {
    const onClickCallback = () => {
        set();
        onClick();
    };
    
    return (
        <p
            className={`upper pre-small${
                currentCategory === category ? " black bold" : ""
            }`}
            onClick={onClickCallback}
        >
            {category}
        </p>
    );
};

export default ProfileCategory;
