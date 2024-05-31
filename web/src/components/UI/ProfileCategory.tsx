type ProfileCategoryProps = {
    category: string;
    currentCategory: string;
    set: any;
};

const ProfileCategory = ({
    category,
    currentCategory,
    set,
}: ProfileCategoryProps) => {
    return (
        <p
            onClick={set}
            className={`upper pre-small${
                currentCategory === category ? " black bold" : ""
            }`}
        >
            {category}
        </p>
    );
};

export default ProfileCategory;
