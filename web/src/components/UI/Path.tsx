import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import "../../styles/components/UI/Path.scss";

type Segment = {
    name: string;
    location: string;
};

type PathProps = {
    segments: Segment[];
};

const Path = ({ segments }: PathProps) => {
    return (
        <p className="upper small path-text">
            {segments.map((segment, index) => (
                <Fragment key={`${segment}[${index}]`}>
                    <Link
                        to={segment.location}
                        className={index === segments.length - 1 ? "black" : ""}
                    >
                        {segment.name}
                    </Link>
                    {index !== segments.length - 1 && <span>/</span>}
                </Fragment>
            ))}
        </p>
    );
};

export default Path;
