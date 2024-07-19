import { useNavigate } from "react-router-dom";
import ProductStaticImage from "../../assets/staticProductImage.webp";
import { paths } from "../../router/paths";
import "../../styles/components/UI/DoorCard.scss";
import { ProductType } from "../../types/productsRelatedTypes";
import Button from "./Button";

type DoorCardProps = {
    product: ProductType;
};

const DoorCard = ({ product }: DoorCardProps) => {
    const navigate = useNavigate();

    const stopPropagation = (e: any) => e.stopPropagation();

    return (
        <div
            className="door-card"
            onClick={() => navigate(paths.buy + `/${product.id}`)}
        >
            <img
                src={ProductStaticImage}
                alt={`door-${product.price}-${product.id}`}
            />
            <div className="door-card-inner" onClick={stopPropagation}></div>
            {/* <p className="pre-small upper model" onClick={stopPropagation}>
        {product.model}
      </p> */}
            <p className="mid black bold" onClick={stopPropagation}>
                {product.price} ₴
            </p>
            {/* {product.tags && (
        <div className="tags" onClick={stopPropagation}>
          {product.tags.map((tag, index) => (
            <p key={`tag[${index}]`} className="pre-small gray">
              {tag}
            </p>
          ))}
        </div>
      )} */}
            <Button
                inversed={true}
                borderless={false}
                additionalClasses={["upper"]}
                onClickCallback={stopPropagation}
            >
                <svg
                    width="19"
                    height="20"
                    viewBox="0 0 28 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <path
                            d="M12.833 24.5542C12.833 25.5207 12.0495 26.3042 11.083 26.3042C10.1165 26.3042 9.33301 25.5207 9.33301 24.5542C9.33301 23.5877 10.1165 22.8042 11.083 22.8042C12.0495 22.8042 12.833 23.5877 12.833 24.5542Z"
                            stroke="currentColor"
                        />
                        <path
                            d="M23.333 24.5542C23.333 25.5207 22.5495 26.3042 21.583 26.3042C20.6165 26.3042 19.833 25.5207 19.833 24.5542C19.833 23.5877 20.6165 22.8042 21.583 22.8042C22.5495 22.8042 23.333 23.5877 23.333 24.5542Z"
                            stroke="currentColor"
                        />
                        <path
                            d="M6.99967 5.30416H20.9997C23.577 5.30416 25.6663 7.3935 25.6663 9.97082V15.8042C25.6663 18.3815 23.577 20.4708 20.9997 20.4708H11.6663C9.08901 20.4708 6.99967 18.3815 6.99967 15.8042V5.30416ZM6.99967 5.30416C6.99967 4.01549 5.95501 2.97083 4.66634 2.97083H2.33301M6.99967 9.97082H25.083"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </svg>
                додати до кошику
            </Button>
        </div>
    );
};

export default DoorCard;
