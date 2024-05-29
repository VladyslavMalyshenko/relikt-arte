import { doorsData } from "../../../data/doors";
import "../../../styles/components/pages/homepage/Doors.scss";

const Doors = () => {
    return (
        <div className="doors-categories">
            {doorsData.length > 0 ? (
                doorsData.map((door) => (
                    <div key={door.name} className="doors-category">
                        <div className="doors-category-image">
                            <img src={door.image} alt={door.name} />
                        </div>
                        <p className="upper pre-small thin black">
                            {door.name}
                        </p>
                    </div>
                ))
            ) : (
                <p className="big black mid">Doors are not in stock now ;(</p>
            )}
        </div>
    );
};

export default Doors;
